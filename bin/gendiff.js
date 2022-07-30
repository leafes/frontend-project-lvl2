import { program } from 'commander';
import * as fs from 'node:fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
    const file1Obj = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
    const file2Obj = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));
    const file1Array = Object.entries(file1Obj).map((item) => [item[0], item[1], '-']);
    const file2Array = Object.entries(file2Obj).map((item) => [item[0], item[1], '+']);

    const intersec = _.intersectionWith(file1Array, file2Array,
        ([name1, value1], [name2, value2]) => name1 === name2 && value1 === value2)
        .map((item) => _.initial(item));

    const changed = _.union(file1Array, file2Array)
        .filter(([name]) => !intersec.flat().includes(name));
    const result = _.sortBy(_.union(changed, intersec), ([name]) => name);
    console.log('{');
    _.forEach(result, 
        ([name, value, state]) => console.log(state ?? ' ', name, value));
    console.log('}');
};

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-v, --vers', 'output the current version')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action(genDiff)

program
    .option('-f, --format <type>', 'output format');

program.parse();
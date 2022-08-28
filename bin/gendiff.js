#! node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.2', '-v, --vers', 'output the current version')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format tree|plain|json', 'stylish')
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2, options.format);
    console.log(diff);
  });

program.parse();

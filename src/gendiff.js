import _ from 'lodash';
import parser from './parser.js';

const genDiff = (filepath1, filepath2) => {
  const file1Obj = parser(filepath1);
  const file2Obj = parser(filepath2);
  const file1Array = Object.entries(file1Obj).map((item) => [item[0], item[1], '-']);
  const file2Array = Object.entries(file2Obj).map((item) => [item[0], item[1], '+']);

  const intersec = _.intersectionWith(
    file1Array,
    file2Array,
    ([name1, value1], [name2, value2]) => name1 === name2 && value1 === value2,
  )
    .map((item) => _.initial(item));

  const changed = _.union(file1Array, file2Array)
    .filter(([name]) => !intersec.flat().includes(name));
  const result = _.sortBy(_.union(changed, intersec), ([name]) => name)
    .map(([name, value, state]) => `${state ?? ' '} ${name} ${value}`)
    .join('\n');

  return result;
};

export default genDiff;

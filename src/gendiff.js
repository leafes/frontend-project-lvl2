import _ from 'lodash';
import parser from './parser.js';

const formatter = (data, type = 'stylish') => {
  return _.sortBy(data, ([name]) => name)
    .map(([name, value, state]) => `${state ?? ' '} ${name} ${value}`)
    .join('\n');
}

const genDiff = (filepath1, filepath2) => {
  const file1Obj = parser(filepath1);
  const file2Obj = parser(filepath2);
  
  const getUniqKeys = (obj) => {
    const entries = Object.entries(obj);
    return entries.map()
  }

  console.log(getUniqKeys(file1Obj));
};



export default genDiff;

  // const treeBuilder = (obj, status = null) => {
  //   const entries = Object.entries(obj);
  //     return entries.map(([key, value]) => {
  //       let newValue = value;
  //       if (_.isObject(value)) {
  //         newValue = treeBuilder(value, status);
  //       }
  //       return  { key, value: newValue, status};
  //       }
  //     );
  // }

  // const file1Data = treeBuilder(file1Obj, 'deleted');
  // const file2Data = treeBuilder(file2Obj, 'added');

  // const getIntersection = (dataArray, comparingNode) => {
  //   return dataArray.reduce((acc, { key, value, status }) => {
  //     let newAcc;
  //     if (Object.hasOwn(comparingNode, key)) {
  //       newAcc = (Array.isArray(value))
  //       ? { key, value:getIntersection(dataArray, comparingNode[key]), status: 'intersectioned' }
  //       : { key, value, status: 'intersectioned'};
  //     }
  //     return [...acc, newAcc];
  //   }, []);
  // }
  //   // Возможный алгоритм решения: 
  //   // Найти пересечение ключей, сравнить пересечение с объектом 2,
  //   // после – наложить на объект 1 полученное сравнение;
    
  // // const diff = (file1, currentNode = file2Obj) => {
  // //   return file1.reduce((acc, {key, value}) => {
  // //     let newAcc = {key, value};
  // //     if (Object.hasOwn(currentNode, key)) {
  // //       newAcc = !Array.isArray(value) ? {key, value, status: 'no-arr'} 
  // //       : {key, value: diff(value, currentNode[key]), status: 'arr'};
  // //     } else {
  // //       newAcc = {key, value, status: 'deleted'};
  // //     }
  // //     return [...acc, newAcc];
  // //   }, []);
  // // }

  //   console.log(getIntersection(file1Data, file2Obj));


  // // const intersec = _.intersectionWith(
  // //   file1Array,
  // //   file2Array,
  // //   ([name1, value1], [name2, value2]) => name1 === name2 && value1 === value2,
  // // )
  // //   .map((item) => _.initial(item));
  // // const changed = _.union(file1Array, file2Array)
  // //   .filter(([name]) => !intersec.flat().includes(name));
  // // const result = formatter(_.union(changed, intersec));

  // // return result;
import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import genDiff from './differ.js';
import formatter from './formatters/index.js';

const readFile = (pathFile) => {
  const fullPathFile = path.resolve(process.cwd(), pathFile);
  return fs.readFileSync(fullPathFile, 'utf-8');
};

const getExtName = (pathFile) => {
  const fullPathFile = path.resolve(process.cwd(), pathFile);
  return path.extname(fullPathFile).slice(1);
};

export default (pathFile1, pathFile2, type) => {
  const content1 = readFile(pathFile1);
  const content2 = readFile(pathFile2);
  const extname1 = getExtName(pathFile1);
  const extname2 = getExtName(pathFile2);

  const data1 = parse(content1, extname1);
  const data2 = parse(content2, extname2);
  const result = genDiff(data1, data2);

  return formatter(result, type);
};

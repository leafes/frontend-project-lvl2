import fs from 'fs';
import gendiff from '../src/index.js';

const testFilesPath = '__fixtures__/';
const expans = ['json', 'yml'];

describe.each(expans)('gendiff %s', (exp) => {
  const before = `${testFilesPath}file1.${exp}`;
  const after = `${testFilesPath}file2.${exp}`;
  const resultStylish = fs.readFileSync(`${testFilesPath}result_tree.txt`, 'utf-8');
  const resultPlain = fs.readFileSync(`${testFilesPath}result_plain.txt`, 'utf-8');
  const resultJson = fs.readFileSync(`${testFilesPath}result_json.txt`, 'utf-8');
  test('gendiff', () => {
    expect(gendiff(before, after, 'stylish')).toEqual(resultStylish.trim());
    expect(gendiff(before, after, 'plain')).toEqual(resultPlain.trim());
    expect(gendiff(before, after, 'json')).toEqual(resultJson.trim());
  });
});

import genDiff from '../src/gendiff.js';

let expectedResult;

beforeAll(() => {
  expectedResult = `- follow false
  host hexlet.io
- proxy 123.234.53.22
- timeout 50
+ timeout 20
+ verbose true`;
});

test('genDiff', () => {
  const data1 = '__fixtures__/file1.json';
  const data2 = '__fixtures__/file2.yaml';
  expect(genDiff(data1, data2)).toEqual(expectedResult);
});

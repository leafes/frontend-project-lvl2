import genDiff from '../bin/gendiff'

let expectedResult;

beforeAll(() => {
expectedResult = 
`- follow false
  host hexlet.io
- proxy 123.234.53.22
- timeout 50
+ timeout 20
+ verbose true`;
});



test('genDiff', () => {
    const data1 = '__fixtures__/file1.json';
    const data2 = '__fixtures__/file2.json';
    expect(genDiff(data1, data2)).toEqual(expectedResult);
})
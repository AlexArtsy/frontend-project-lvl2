import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getPath(fileName), 'utf-8');

test('test genDiff json', () => {
  const path1 = getPath('1.json');
  const path2 = getPath('2.json');
  //  console.log(path1);
  //  console.log(path2);
  const result = readFile('result1_2_json');
  //  console.log(result);

  expect(result).toEqual(genDiff(path1, path2));
});

test('test genDiff faulty', () => {
  const path1 = getPath('1.json');
  const path2 = getPath('2.json');
  const result = readFile('fault1_2_json');

  expect(result).toEqual(genDiff(path1, path2));
});

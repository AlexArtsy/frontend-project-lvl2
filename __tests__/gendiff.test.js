import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getPath(fileName), 'utf-8');

test('test genDiff flat .json in stylish formatt', () => {
  const path1 = getPath('1.json');
  const path2 = getPath('2.json');
  const result = readFile('result_flat_stylish');
  expect(result).toEqual(genDiff(path1, path2));
});

test('test genDiff flat .yml in stylish formatt', () => {
  const path1 = getPath('file1.yml');
  const path2 = getPath('file2.yml');
  const result = readFile('result_flat_stylish');
  expect(result).toEqual(genDiff(path1, path2));
});

test('test genDiff flat .yaml in stylish formatt', () => {
  const path1 = getPath('file1.yaml');
  const path2 = getPath('file2.yaml');
  const result = readFile('result_flat_stylish');
  expect(result).toEqual(genDiff(path1, path2));
});

test('test genDiff nested .json in stylish formatt', () => {
  const path1 = getPath('file1.json');
  const path2 = getPath('file2.json');
  const result = readFile('result_nested_stylish');
  expect(result).toEqual(genDiff(path1, path2));
});

test('test genDiff nested .yml in stylish formatt', () => {
  const path1 = getPath('nested1.yml');
  const path2 = getPath('nested2.yml');
  const result = readFile('result_nested_stylish');
  expect(result).toEqual(genDiff(path1, path2));
});

test('test genDiff nested .yml struct in plain formatt', () => {
  const path1 = getPath('nested1.yml');
  const path2 = getPath('nested2.yml');
  const result = readFile('result_nested_plain');
  expect(result).toEqual(genDiff(path1, path2, 'plain'));
});

test('test genDiff flat .yml struct in plain formatt', () => {
  const path1 = getPath('file1.yaml');
  const path2 = getPath('file2.yaml');
  const result = readFile('result_flat_plain');
  expect(result).toEqual(genDiff(path1, path2, 'plain'));
});

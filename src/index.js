import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const sortEntries = (arr) => {
  const ordered = arr.sort((item1, item2) => {
    const [a1, b1, c1] = item1;
    const [a2, b2, c2] = item2;
    if (b1 < b2) {
      return -1;
    }
    if (b1 > b2) {
      return 1;
    }
    return 0;
  });
  return ordered;
};

const transformToString = (arr) => {
  const lb = '\n';
  const sp = '  ';
  const result = arr.map(([sym, key, value]) => `${lb}${sp}${sym} ${key}: ${value}`);
  return `{${result.join('')}${lb}}`;
};

const isYaml = (filePath) => {
  const ext = path.extname(filePath);
  if (ext === '.yml' || ext === '.yaml') {
    return true;
  }
  return false;
};

const isJSON = (filePath) => path.extname(filePath) === '.json';

const checkDiffInEntries = (entries1, entries2) => {
  const file1CommonEntries = entries1.reduce((acc, entry) => {
    const [key1, value1] = entry;
    let stat = false;
    for (let i = 0; i < entries2.length; i += 1) {
      const [key2, value2] = entries2[i];
      if (key1 === key2 && value1 === value2) {
        stat = true;
        entries2.splice(i, 1);
        acc.push([' ', key1, value1]);
      }
      if (key1 === key2 && value1 !== value2) {
        stat = true;
        acc.push(['-', key1, value1]);
        acc.push(['+', key2, value2]);
        entries2.splice(i, 1);
      }
    }
    if (!stat) {
      acc.push(['-', key1, value1]);
    }
    return acc;
  }, []);
  const file2CommonEntries = entries2.map((entry) => {
    const [key, value] = entry;
    return ['+', key, value];
  });
  return file1CommonEntries.concat(file2CommonEntries);
};

const getObjectFromPath = (filePath) => {
  const file = fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf-8');
  let result;
  if (isYaml(filePath)) {
    result = parse(file, 'yaml');
  }
  if (isJSON(filePath)) {
    result = parse(file, 'json');
  }
  return result;
};

const genDiff = (filePath1, filePath2) => {
  const obj1entryes = Object.entries(getObjectFromPath(filePath1));
  const obj2entryes = Object.entries(getObjectFromPath(filePath2));

  const result = sortEntries(checkDiffInEntries(obj1entryes, obj2entryes));
  return transformToString(result);
};

export default genDiff;

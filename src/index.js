import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';
import stylish from './stylish.js';

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

const isYaml = (filePath) => {
  const ext = path.extname(filePath);
  if (ext === '.yml' || ext === '.yaml') {
    return true;
  }
  return false;
};

const isJSON = (filePath) => path.extname(filePath) === '.json';

const getElemWhenExist = (elem, source) => source.reduce((acc, item) => {
  if (acc !== false) {
    return acc;
  }
  return item.includes(elem) ? item[2] : false;
}, false);

const checkDiffInEntries = (entries1, entries2) => {
  const file1CommonEntries = entries1.reduce((acc, [status, key, value1]) => {
    const value2 = getElemWhenExist(key, entries2);
    //  проверяем, существует ли элемент в второй коллекции
    if (value2) {
      //  проверяем, объекты ли элемента из обеих коллекций
      if (_.isObject(value1) && _.isObject(value2)) {
        const newValue = checkDiffInEntries(value1, value2);
        return [...acc, [' ', key, newValue]];
      }
      //  наконец-то производим сравнение
      if (value1 === value2) {
        return [...acc, [' ', key, value1]];
      }
      return [...acc, ['-', key, value1], ['+', key, [value2]]];
    }
    return [...acc, ['-', key, value1]];
  }, []);

  const file2CommonEntries = entries2.reduce((acc, [status, key, value2]) => {
    if (!getElemWhenExist(key, entries1)) {
      return [...acc, ['+', key, value2]];
    }
    return acc;
  }, file1CommonEntries);
  return file2CommonEntries;
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
const transformObjToArray = (tree) => {
  const result = Object.entries(tree).map(([key, value]) => {
    if (_.isObject(value)) {
      return [null, key, transformObjToArray(value)];
    }
    return [null, key, value];
  });

  return result;
};

const genDiff = (filePath1, filePath2) => {
  const obj1 = getObjectFromPath(filePath1);
  const obj2 = getObjectFromPath(filePath2);
  const objEntries1 = transformObjToArray(obj1);
  const objEntries2 = transformObjToArray(obj2);
  const result = checkDiffInEntries(objEntries1, objEntries2);

  return stylish(sortEntries(result));
};

export default genDiff;

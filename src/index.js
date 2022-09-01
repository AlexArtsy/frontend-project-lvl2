import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';
import formatData from '../formatters/index.js';

const sortEntries = (arr) => {
  const ordered = arr.sort((item1, item2) => {
    const [, b1] = item1;
    const [, b2] = item2;
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

const getElemWhenExist = (elem, source) => {
  const result = source.reduce((acc, [, key, value, ,]) => {
    if (acc !== false) {
      return acc;
    }
    return elem === key ? value : false;
  }, false);
  return result;
};

const checkDiffInEntries = (entries1, entries2) => {
  const file1CommonEntries = entries1.reduce((acc, [key, value1, pathName1]) => {
    const pathNameWithQuotes = `'${pathName1}'`;
    const value2 = getElemWhenExist(key, entries2);
    //  проверяем, существует ли элемент в второй коллекции
    if (value2 || value2 === null) { // null преобразовывался в false
      //  проверяем, объекты ли элемента из обеих коллекций
      if (_.isObject(value1) && _.isObject(value2)) {
        const newValue = checkDiffInEntries(value1, value2);
        return [...acc, [key, newValue, pathNameWithQuotes, ['complex modified', value1, value2]]];
      }
      //  наконец-то производим сравнение
      if (value1 === value2) {
        return [...acc, [key, value1, pathNameWithQuotes, ['no modified', '', '']]];
      }
      return [...acc, [key, value1, pathNameWithQuotes, ['modified', value1, value2]]];
    }
    return [...acc, [key, value1, pathNameWithQuotes, ['removed', '', '']]];
  }, []);

  const file2CommonEntries = entries2.reduce((acc, [key2, value2, pathName2]) => {
    const pathNameWithQuotes = `'${pathName2}'`;
    //  !('') приводится к true поэтому добавлена вторая проверка на равенство к ''
    if (!getElemWhenExist(key2, entries1) && getElemWhenExist(key2, entries1) !== '') {
      return [...acc, [key2, value2, pathNameWithQuotes, ['added', '', '']]];
    }
    return acc;
  }, file1CommonEntries);
  return sortEntries(file2CommonEntries);
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
const transformObjToArray = (tree, prop = '') => {
  const result = Object.entries(tree).map(([key, value]) => {
    const pathName = (prop === '') ? `${key}` : `${prop}.${key}`;
    if (_.isObject(value)) {
      return [key, transformObjToArray(value, pathName), pathName];
    }
    return [key, value, pathName];
  });

  return result;
};

const genDiff = (filePath1, filePath2, formatterStyle) => {
  const obj1 = getObjectFromPath(filePath1);
  const obj2 = getObjectFromPath(filePath2);
  const objEntries1 = transformObjToArray(obj1);
  const objEntries2 = transformObjToArray(obj2);
  const result = checkDiffInEntries(objEntries1, objEntries2);

  return formatData(result, formatterStyle);
};

export default genDiff;

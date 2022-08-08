import fs from 'fs';
import path from 'path';

const genDiff = (filePath1, filePath2) => {
  const getObjectfromPath = (value) => {
    const content = fs.readFileSync(path.resolve(process.cwd(), value), 'utf-8');
    return JSON.parse(content);
  };

  const sortObjectKyes = (obj) => {
    const ordered = {};
    Object.keys(obj).sort().forEach((key) => {
      ordered[key] = obj[key];
    });
    return ordered;
  };

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

  const checkDiff = (item1, item2) => {
    const file1CommonEntries = item1.reduce((acc, entry) => {
      const [key1, value1] = entry;
      let stat = false;
      for (let i = 0; i < item2.length; i += 1) {
        const [key2, value2] = item2[i];
        if (key1 === key2 && value1 === value2) {
          stat = true;
          item2.splice(i, 1);
          acc.push([' ', key1, value1]);
        }
        if (key1 === key2 && value1 !== value2) {
          stat = true;
          acc.push(['-', key1, value1]);
          acc.push(['+', key2, value2]);
          item2.splice(i, 1);
        }
      }
      if (!stat) {
        acc.push(['-', key1, value1]);
      }
      return acc;
    }, []);
    const file2CommonEntries = item2.map((entry) => {
      const [key, value] = entry;
      return ['+', key, value];
    });
    return file1CommonEntries.concat(file2CommonEntries);
  };

  const transformToString = (arr) => {
    const lb = '\n';
    const sp = '  ';
    const result = arr.map(([sym, key, value]) => `${lb}${sp}${sym} ${key}: ${value}`);
    return `{${result.join('')}${lb}}`;
  };

  const obj1entryes = Object.entries(getObjectfromPath(filePath1));
  const obj2entryes = Object.entries(getObjectfromPath(filePath2));

  const result = sortEntries(checkDiff(obj1entryes, obj2entryes));
  return transformToString(result);
};

export default genDiff;

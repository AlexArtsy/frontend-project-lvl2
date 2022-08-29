const filter = (data) => {
  const result = data.filter(([symb, , , , status]) => {
    if (status === undefined || status[0] === 'no modified' || status[0] === '') {
      return false;
    }
    if (status[0] === 'modified' && symb === ' ') {
      return false;
    }
    return true;
  });
  return result;
};
const makeFlat = (data) => {
  const result = data.reduce((acc, [symb, key, value, path, status]) => {
    if (Array.isArray(value)) {
      return [...acc, [symb, key, value, path, status], ...makeFlat(value)];
    }
    return [...acc, [symb, key, value, path, status]];
  }, []);
  return [...result];
};
const convertToStringWhenString = (value) => (typeof value === 'string' ? `'${value}'` : value);

const plain = (data) => {
  const lb = '\n';
  const result = filter(makeFlat(data));
  return result.reduce((acc, [, , value, path, [stat, from, to]]) => {
    const chekedValue = convertToStringWhenString(value);
    const finalValue = Array.isArray(value) ? '[complex value]' : chekedValue;
    if (stat === 'added') {
      return `${acc}Property ${path} was added with value: ${finalValue}${lb}`;
    }
    if (stat === 'removed') {
      return `${acc}Property ${path} was removed${lb}`;
    }
    if (stat === 'modified') {
      const finalFrom = Array.isArray(from) ? '[complex value]' : convertToStringWhenString(from);
      const finalTo = Array.isArray(to) ? '[complex value]' : convertToStringWhenString(to);
      return `${acc}Property ${path} was updated. From ${finalFrom} to ${finalTo}${lb}`;
    }
    return `${acc}error! path: ${path}${lb}`;
  }, '').slice(0, -1);
};
export default plain;

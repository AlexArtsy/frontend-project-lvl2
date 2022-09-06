const lb = '\n'; // linebreak symbol

const filter = (data) => {
  const result = data.filter(([, , , [stat]]) => {
    if (stat === 'modified' || stat === 'removed' || stat === 'added') {
      return true;
    }
    return false;
  });
  return result;
};
const makeFlat = (data) => {
  const result = data.reduce((acc, [key, value, path, status]) => {
    if (Array.isArray(value)) {
      return [...acc, [key, value, path, status], ...makeFlat(value)];
    }
    return [...acc, [key, value, path, status]];
  }, []);
  return [...result];
};
const convertToStringWhenString = (value) => (typeof value === 'string' ? `'${value}'` : value);

const getResultString = (value, path, [stat, from, to]) => {
  const finalFrom = Array.isArray(from) ? '[complex value]' : convertToStringWhenString(from);
  const finalTo = Array.isArray(to) ? '[complex value]' : convertToStringWhenString(to);

  switch (stat) {
    case 'modified':
      return `Property ${path} was updated. From ${finalFrom} to ${finalTo}${lb}`;

    case 'added':
      return `Property ${path} was added with value: ${value}${lb}`;

    case 'removed':
      return `Property ${path} was removed${lb}`;

    default:
      return '';
  }
};

const plain = (data) => {
  const result = filter(makeFlat(data));
  return result.reduce((acc, [, value, path, [stat, from, to]]) => {
    const chekedValue = convertToStringWhenString(value);
    const finalValue = Array.isArray(value) ? '[complex value]' : chekedValue;
    return [...acc, getResultString(finalValue, path, [stat, from, to])];
  }, []).join('').slice(0, -1);
};
export default plain;

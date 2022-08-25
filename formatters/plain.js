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
const plain = (data) => {
  return filter(makeFlat(data));
};
export default plain;

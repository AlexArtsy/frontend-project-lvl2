const stylish = (arr, spaceCount = 1) => {
  const lb = '\n';
  const sp = '  '.repeat(spaceCount);
  const result = arr.map(([sym, key, value]) => {
    let newValue = value;
    if (Array.isArray(value)) {
      newValue = stylish(value, spaceCount + 1);
    }
    return `${lb}${sp}${sym} ${key}: ${newValue}`;
  });
  return `{${result.join('')}${lb}${spaceCount === 1 ? '' : sp}}`;
};
export default stylish;

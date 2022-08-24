const stylish = (arr, spaceCount = 0) => {
  const lb = '\n';
  const oneTab = '  ';
  const doubleTab = '    '.repeat(spaceCount);
  const result = arr.map(([sym, key, value]) => {
    let newValue = value;
    if (Array.isArray(value)) {
      newValue = stylish(value, spaceCount + 1);
    }
    return `${lb}${spaceCount === 0 ? oneTab : oneTab + doubleTab}${sym} ${key}: ${newValue}`;
  });
  return `{${result.join('')}${lb}${spaceCount === 0 ? '' : doubleTab}}`;
};
export default stylish;

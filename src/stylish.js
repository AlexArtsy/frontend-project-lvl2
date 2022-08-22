const stylish = (arr) => {
  const lb = '\n';
  const sp = '  ';
  const result = arr.map(([sym, key, value]) => `${lb}${sp}${sym} ${key}: ${value}`);
  return `{${result.join('')}${lb}}`;
};
export default stylish;

const lb = '\n'; // linebreak symbol
const tb = '  '; // tab symbol

const getTab = (count) => tb.repeat(count);

const getResultString = (key, value, [stat, from, to], tabcount) => {
  const sp = getTab(tabcount);
  //const newFrom = Array.isArray(from) ? stylish(from, tabcount + 1) : from;
  //const newTo = Array.isArray(to) ? stylish(to, tabcount + 1) : to;

  switch (stat) {
    case 'modified':
      return `${sp}- ${key}: ${from}${lb}${sp}+ ${key}: ${to}${lb}`;

    case 'added':
      return `${sp}+ ${key}: ${value}${lb}`;

    case 'removed':
      return `${sp}- ${key}: ${value}${lb}`;

    case 'complex modified':
    case 'no modified':
    case 'no init':
      return `${sp}  ${key}: ${value}${lb}`;

    default:
      return 'error';
  }
};
const stylish = (arr, spaceCount = 0) => {
  const tab = getTab(spaceCount);
  const result = arr.map(([key, value, , [stat, from, to]]) => {
    const newFrom = Array.isArray(from) ? stylish(from, spaceCount + 2) : from;
    const newTo = Array.isArray(to) ? stylish(to, spaceCount + 2) : to;

    if (Array.isArray(value)) {
      const newValue = stylish(value, spaceCount + 2);
      return getResultString(key, newValue, [stat, newFrom, newTo], spaceCount + 1);
    }
    return getResultString(key, value, [stat, newFrom, newTo], spaceCount + 1);
  });
  return `{${lb}${result.join('')}${tab}}`;
};
export default stylish;

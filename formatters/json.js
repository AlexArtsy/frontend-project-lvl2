const lb = '\n'; // linebreak symbol
const tb = '  '; // tab symbol

const getTab = (count) => tb.repeat(count);

const convertToStringWhenString = (value) => (typeof value === 'string' ? `"${value}"` : value);

const convertToJson = (key, value, pathName, plainData, spaceCount) => {
  const tab = getTab(spaceCount);
  const [stat, from, to] = plainData;
  const finalFrom = Array.isArray(from) ? '"[complex value]"' : convertToStringWhenString(from);
  const finalTo = Array.isArray(to) ? '"[complex value]"' : convertToStringWhenString(to);
  const k = `${tab}"key": ${convertToStringWhenString(key)},${lb}`;
  const v = `${tab}"value": ${value},${lb}`;
  const pth = `${tab}"path": ${convertToStringWhenString(pathName)},${lb}`;
  const st = `${getTab(spaceCount + 1)}"status": ${convertToStringWhenString(stat)},${lb}`;
  const fr = `${getTab(spaceCount + 1)}"from": ${finalFrom},${lb}`;
  const t = `${getTab(spaceCount + 1)}"to": ${finalTo}${lb}`;
  const plD = `${tab}"plainData": {${lb}${st}${fr}${t}${tab}}${lb}`;
  return `${k}${v}${pth}${plD}`;
};

const json = (data, sp = 1) => {
  const tab = getTab(sp);
  const result = data.reduce((acc, [key, value, pathName, plainData]) => {
    const newValue = Array.isArray(value) ? json(value, sp + 2) : convertToStringWhenString(value);
    const node = `${lb}${tab}{${lb}${convertToJson(key, newValue, pathName, plainData, sp + 1)}${tab}},`;
    return [...acc, node];
  }, '').join('').slice(0, -1);

  return `[${result}${lb}${getTab(sp - 1)}]`;
};

export default json;

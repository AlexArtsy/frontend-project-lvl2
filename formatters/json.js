const lb = '\n'; // linebreak symbol
const tb = '  '; // tab symbol

const getTab = (count) => tb.repeat(count);

const convertToJson = (key, value, pathName, plainData, spaceCount) => {
  const tab = getTab(spaceCount);
  const [stat, from, to] = plainData;
  const finalFrom = Array.isArray(from) ? '[complex value]' : from;
  const finalTo = Array.isArray(to) ? '[complex value]' : to;
  const k = `${tab}"key": ${key},${lb}`;
  const v = `${tab}"value": ${value},${lb}`;
  const pth = `${tab}"path": ${pathName},${lb}`;
  const st = `${getTab(spaceCount + 1)}"status": ${stat},${lb}`;
  const fr = `${getTab(spaceCount + 1)}"from": ${finalFrom},${lb}`;
  const t = `${getTab(spaceCount + 1)}"to": ${finalTo}${lb}`;
  const plD = `${tab}"plainData": {${lb}${st}${fr}${t}${tab}}${lb}`;
  return `${k}${v}${pth}${plD}`;
};

const json = (data, spaceCount = 1) => {
  const tab = getTab(spaceCount);
  const result = data.reduce((acc, [key, value, pathName, plainData]) => {
    const newValue = Array.isArray(value) ? json(value, spaceCount + 2) : value;
    const node = `${lb}${tab}{${lb}${convertToJson(key, newValue, pathName, plainData, spaceCount + 1)}${tab}},`;
    return [...acc, node];
  }, '').join('').slice(0, -1);

  return `[${result}${lb}${getTab(spaceCount - 1)}]`;
};

export default json;

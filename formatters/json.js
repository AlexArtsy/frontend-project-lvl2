const json = (data, spaceCount = 0) => {
  const lb = '\n';
  const tab = '  '.repeat(spaceCount);
  const result = data.reduce((acc, [symb, key, value, pathName, plainData = ['', '', '']]) => {
    const [stat, from, to] = plainData;
    let newValue = value;
    if (Array.isArray(value)) {
      newValue = json(value, spaceCount + 1);
    }
    const mainData = `${tab}{${lb}"symbol": ${symb},${lb}${tab}"key": ${key},${lb}${tab}"value": ${newValue},${lb}${tab}"path": ${pathName},${lb}`;
    const plainDt = `${tab}"plainData": {${lb}${tab}  "status": ${stat},${lb}${tab}  "from": ${from},${lb}${tab}  "to": ${to}${lb}${tab}}${lb}`;
    return [...acc, `[${mainData}${plainDt}]`];
  }, '');
  return result;
};
export default json;

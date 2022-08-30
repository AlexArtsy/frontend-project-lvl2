import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatData = (data, style) => {
  if (style === 'plain') {
    return plain(data);
  }
  if (style === 'json') {
    return json(data);
  }
  return stylish(data);
};
export default formatData;

import yaml from 'js-yaml';

const parse = (file, extension) => {
  if (extension === 'yaml') {
    return yaml.load(file);
  }
  if (extension === 'json') {
    return JSON.parse(file);
  }
  return 'error';
};

export default parse;

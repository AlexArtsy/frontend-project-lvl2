import yaml from 'js-yaml';

const parse = (file, extension) => {
  let parsedFile;
  if (extension === 'yaml') {
    parsedFile = yaml.load(file);
  }
  if (extension === 'json') {
    parsedFile = JSON.parse(file);
  }
  return parsedFile;
};

export default parse;

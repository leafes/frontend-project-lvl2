import yaml from 'js-yaml';

const getFormat = (content, ext) => {
  const format = {
    json: JSON.parse,
    yml: yaml.load,
    yaml: yaml.load,
  };

  return format[ext](content);
};

export default (content, ext) => getFormat(content, ext);

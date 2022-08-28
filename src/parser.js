import ini from 'ini';
import yaml from 'js-yaml';

const parse = (content, ext) => {
  const format = {
    json: JSON.parse,
    yml: yaml.load,
    ini: ini.parse,
  };

  return format[ext](content);
  // format('yml') вернет yaml.parse
  // yaml.parse(content)
};

export default parse;

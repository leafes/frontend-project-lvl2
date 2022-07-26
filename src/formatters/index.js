import json from './json.js';
import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (data, type) => {
  const formatters = {
    json,
    stylish,
    plain,
  };
  if (!Object.hasOwn(formatters, type)) return formatters.stylish(data);
  return formatters[type](data);
};

export default (data, type) => getFormatter(data, type);

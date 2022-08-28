import json from './json.js';
import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (data, type) => {
  const formatters = {
    json,
    stylish,
    plain,
  };

  return formatters[type](data);
};

export default (data, type) => getFormatter(data, type);

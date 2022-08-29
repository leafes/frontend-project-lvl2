import _ from 'lodash';

const separator = '\n';
const spaces = 2;
const tabs = 4;
const countSpaces = (indent) => ((indent > 1) ? ' '.repeat(spaces ** 2 * indent - 2) : ' '.repeat(spaces));
const countTabs = (indent) => ' '.repeat(tabs * indent);

const stringify = (value, indent) => {
  if (!_.isObject(value)) {
    return _.identity(value);
  }

  const result = _.keys(value)
    .map((key) => `${countTabs(indent)}${' '.repeat(tabs)}${key}: ${
      (_.isObject(value[key]) && !_.isEmpty(value)) ? stringify(value[key], indent + 1) : value[key]
    }`);
  return `{${separator}${result.join(separator)}${separator}${countTabs(indent)}}`;
};

const getDiffToString = (sign, key, value, indent) => `${countSpaces(indent)}${sign} ${key}: ${stringify(value, indent)}`;

const getPropertyAction = ({ state }) => {
  const propertyAction = {
    unchanged: ({ key, value }, indent) => getDiffToString(' ', key, value, indent),
    changed: ({ key, value, valueOld }, indent) => [getDiffToString('-', key, valueOld, indent), getDiffToString('+', key, value, indent)].join(separator),
    deleted: ({ key, valueOld }, indent) => getDiffToString('-', key, valueOld, indent),
    added: ({ key, value }, indent) => getDiffToString('+', key, value, indent),
    children: ({ key, children }, indent, fn) => `${countSpaces(indent)}  ${key}: ${['{', fn(children, indent + 1), `${countSpaces(indent)}  }`].join(separator)}`,
  };

  return propertyAction[state];
};

export default (tree) => {
  const render = (data, indent) => data
    .flatMap((node) => {
      const state = getPropertyAction(node);
      return state(node, indent, render);
    })
    .join(separator);
  return `{${separator}${render(tree, 1)}${separator}}`;
};

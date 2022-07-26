import _ from 'lodash';

const separator = '\n';

const stringify = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'boolean':
      return value;
    default:
      return (_.isObject(value)) ? '[complex value]' : `${value}`;
  }
};

const getPropertyAction = ({ state }) => {
  const propertyAction = {
    changed: (keys, { value, valueOld }) => `Property '${keys.join('.')}' was updated. From ${stringify(valueOld)} to ${stringify(value)}`,
    deleted: (keys) => `Property '${keys.join('.')}' was removed`,
    added: (keys, { value }) => `Property '${keys.join('.')}' was added with value: ${stringify(value)}`,
    children: (keys, { children }, fn) => fn(children, keys),
  };
  return propertyAction[state];
};

export default (tree) => {
  const render = (data, acc) => data
    .filter(({ state }) => state !== 'unchanged')
    .map((node) => {
      const state = getPropertyAction(node);
      const keys = [...acc, node.key];
      return state(keys, node, render);
    })
    .flat()
    .join(separator);
  return render(tree, []);
};

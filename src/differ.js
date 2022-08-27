import _, { property } from 'lodash';

const getPropertyValues = (before, after, property) => {
    const getValue = (key) => ({ value: after[key], valueOld: before[key] });

    const actions = [
        {
            state: 'added',
            check: (key) => !_.has(before, key) && _.has(after, key),
            getValue,
        },
        {
            state: 'deleted',
            check: (key) => _.has(before, key) && !_.has(after, key),
            getValue,
        },
        {
            state: 'children',
            check: (key) => _.isObject(before[key]) && _.isObject(after[key]),
            getValue: (key, fn) => 
        },
        {
            state: 'unchanged',
            check: (key) => before[key] === after[key],
            getValue,
        },
        {
            state: 'changed', 
            check: (key) => before[key] !== after[key],
            getValue,
        },
    ];
    
    return actions.find(({ check }) => check(property));
}
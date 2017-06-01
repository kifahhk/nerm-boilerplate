import { PropTypes } from 'react';

const matchPropType = (matches, propTypeName) => {
  if (typeof matches === 'object') {
    return (matches.filter(match => {
      return match === propTypeName;
    })).length;
  }
  return matches === propTypeName;
};

const customPropHelper = (matches, propValue, key, componentName, location, propFullName) => {
  const propName = propValue[key] && propValue[key].type && propValue[key].type.name ?
    propValue[key].type.name : propFullName;
  if (!propValue[key].type || !propValue[key].type.name || !matchPropType(matches, propName)) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. Expected ${matches}.`
    );
  }
};

const arrayOf = (PropTypeNames) => {
  return PropTypes.arrayOf((...args) => customPropHelper(PropTypeNames, ...args));
};

const CustomPropType = {
  arrayOf,
};

export default CustomPropType;

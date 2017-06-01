const fs = require('fs');

const createChoices = [
  'component',
  'module',
  'store',
  'model',
];
const componentTypes = [
  'stateless-function',
  'class-component',
  'module-stateless-function',
  'module-class-component',
];

module.exports = (modules) => {
  return [
    {
      name: 'type',
      type: 'list',
      message: 'What would you like me to create?',
      default: createChoices[0],
      choices: createChoices,
    }, {
      name: 'componentType',
      type: 'list',
      message: 'Which kind of components?',
      when: (answers) => {
        return answers['type'] === 'component';
      },
      default: componentTypes[0],
      choices: componentTypes,
    }, {
      name: 'moduleName',
      type: 'list',
      message: 'In which Module should I add the component?',
      when: (answers) => {
        return componentTypes.indexOf(answers['componentType']) >= 2;
      },
      choices: () => {
        return modules;
      },
    }, {
      name: 'withTest',
      type: 'confirm',
      message: 'Would you like me to create tests?',
      default: 'y',
      when: (answers) => {
        return answers['type'] === 'component';
      },
    }, {
      name: 'name',
      type: 'input',
      message: 'Enter the name please!',
      validate: (value, answers) => {
        const { type, moduleName, componentType } = answers;
        const isModuleComponent = componentType && moduleName;
        const basePath = type === 'model' ? 'server' : 'client';
        const dirPath = isModuleComponent ? `modules/${moduleName}/components` : `${type}s`;
        return !(fs.existsSync(`${basePath}/${dirPath}/${value}`) ||
          fs.existsSync(`${basePath}/${dirPath}/${value}.js`)) ||
          `${value} exists already, please double check`;
      },
    },
  ];
};

const _ = require('lodash');
const { getCamelCase, getClassName, getFilesInPath } = require('./helper');

const getLibComponentConfig = (cName, cType, withTest) => {
  const cNameCamelCase = getCamelCase(cName);
  const cNameClassName = getClassName(cNameCamelCase);
  const templatePath = 'dev/templates/lib';
  const templateFile = `${cType}.handlebars`;
  const templateStyle = 'style.handlebars';
  const templateTest = 'test.handlebars';
  const templateKeep = 'keep.handlebars';
  const destPath = 'client/lib';
  const componentFiles = [{
    src: `${templatePath}/${templateFile}`,
    dest: `${destPath}/${cName}/${cName}.js`,
  }, {
    src: `${templatePath}/${templateStyle}`,
    dest: `${destPath}/${cName}/${cName}.scss`,
  }];
  const testFiles = withTest ?
    [{
      src: `${templatePath}/${templateTest}`,
      dest: `${destPath}/${cName}/tests/${cName}.spec.js`,
    },
    ] : [{
      src: `${templatePath}/${templateKeep}`,
      dest: `${destPath}/${cName}/tests/.gitkeep`,
    }];


  return {
    files: [...componentFiles, ...testFiles],
    templateData: {
      cName,
      cNameClassName,
    },
  };
};

module.exports = {
  getLibComponentConfig,
};

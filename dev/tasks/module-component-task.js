const { getCamelCase, getClassName } = require('./helper');

module.exports = (cName, cType, withTest, moduleName) => {
  const cNameCamelCase = getCamelCase(cName);
  const cNameClassName = getClassName(cNameCamelCase);
  const templatePath = 'dev/templates/modules/components';
  const templateFile = `${cType}.handlebars`;
  const templateTest = 'test.handlebars';
  const destPath = `client/modules/${moduleName}`;
  const componentFiles = [{
    src: `${templatePath}/${templateFile}`,
    dest: `${destPath}/components/${cName}.js`,
  }];
  const testFiles = withTest ?
    [{
      src: `${templatePath}/${templateTest}`,
      dest: `${destPath}/tests/${cName}.spec.js`,
    },
    ] : [];

  return {
    files: [...componentFiles, ...testFiles],
    templateData: {
      cName,
      cNameClassName,
    },
  };
};

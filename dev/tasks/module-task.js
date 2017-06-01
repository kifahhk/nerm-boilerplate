const _ = require('lodash');
const { getCamelCase, getFilesInPath, getClassName } = require('./helper');

const getModuleConfig = (cName) => {
  const cNameCamelCase = getCamelCase(cName);
  const cNameClassName = getClassName(cNameCamelCase);
  const templatePath = 'dev/templates/modules';
  const templateFile = `module.handlebars`;
  const templateStyle = 'style.handlebars';
  const templateKeep = 'keep.handlebars';
  const destPath = 'client/modules';
  const moduleFiles = [{
    src: `${templatePath}/${templateFile}`,
    dest: `${destPath}/${cName}/${cName}.js`,
  }, {
    src: `${templatePath}/${templateStyle}`,
    dest: `${destPath}/${cName}/${cName}.scss`,
  }, {
    src: `${templatePath}/${templateKeep}`,
    dest: `${destPath}/${cName}/tests/.gitkeep`,
  }, {
    src: `${templatePath}/${templateKeep}`,
    dest: `${destPath}/${cName}/components/.gitkeep`,
  }];

  return {
    files: moduleFiles,
    templateData: {
      cName,
      cNameClassName,
    },
  };
};

const getModuleFiles = (done) => {
  return new Promise((resolve, reject) => {
    getFilesInPath('./client/modules/')
      .then((files) => {
        resolve(files);
        done(files);
      })
      .catch(reject);
  });
};

module.exports = {
  getModuleConfig,
  getModuleFiles,
};

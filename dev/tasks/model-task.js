const _ = require('lodash');
const { getCamelCase, getFilesInPath, getClassName } = require('./helper');

module.exports = (modelName, done) => {
  const modelNameCamelCase = getCamelCase(modelName);
  const modelNameClassName = getClassName(modelNameCamelCase);
  const templatePath = 'dev/templates/models';
  const controllerTemplate = `controller.handlebars`;
  const modelTemplate = 'model.handlebars';
  const routeTemplate = 'route.handlebars';
  const testTemplate = 'test.handlebars';
  const indexTemplate = 'index.handlebars';
  const destPath = 'server/';
  const modelFiles = [{
    src: `${templatePath}/${controllerTemplate}`,
    dest: `${destPath}/controllers/${modelName}.controller.js`,
  }, {
    src: `${templatePath}/${modelTemplate}`,
    dest: `${destPath}/models/${modelName}.js`,
  }, {
    src: `${templatePath}/${routeTemplate}`,
    dest: `${destPath}/routes/${modelName}.route.js`,
  }, {
    src: `${templatePath}/${testTemplate}`,
    dest: `${destPath}/tests/${modelName}.spec.js`,
  },
  ];

  return new Promise((resolve, reject) => {
    getFilesInPath('./server/routes/')
      .then((files) => {
        const filteredFiles = files.map((routeName) => { // get just routes files
          const matchRoute = routeName.indexOf('.route');
          return matchRoute > -1 ? routeName.substring(0, matchRoute) : null;
        });

        const routes = modelName ?
          _.sortBy([
            modelName,
            ...filteredFiles,
          ]) : filteredFiles;

        const retConfig = {
          model: {
            files: modelFiles,
            templateData: {
              modelName,
              modelNameCamelCase,
              modelNameClassName,
              routes,
            },
          },
          refreshRoutes: {
            files: [{
              src: `${templatePath}/${indexTemplate}`,
              dest: `${destPath}/routes/index.js`,
            }],
            templateData: {
              routes,
            },
          },
        };

        resolve(retConfig);
        done(retConfig);
      })
      .catch(reject);
  });
};

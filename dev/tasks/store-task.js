const _ = require('lodash');
const { getCamelCase, getFilesInPath } = require('./helper');

module.exports = (storeName, done) => {
  const storeNameCamelCase = getCamelCase(storeName);
  const storeNameUpperCase = storeNameCamelCase.toUpperCase();
  const templatePath = 'dev/templates/stores';
  const reducerTemplate = `reducer.handlebars`;
  const typeTemplate = 'type.handlebars';
  const actionTemplate = 'action.handlebars';
  const keepTemplate = 'keep.handlebars';
  const reducersTemplate = 'reducers.handlebars';
  const destPath = 'client/stores';
  const moduleFiles = [{
    src: `${templatePath}/${reducerTemplate}`,
    dest: `${destPath}/${storeName}/${storeName}-reducer.js`,
  }, {
    src: `${templatePath}/${typeTemplate}`,
    dest: `${destPath}/${storeName}/${storeName}-type.js`,
  }, {
    src: `${templatePath}/${actionTemplate}`,
    dest: `${destPath}/${storeName}/${storeName}-action.js`,
  }, {
    src: `${templatePath}/${keepTemplate}`,
    dest: `${destPath}/${storeName}/tests/.gitkeep`,
  },
  ];

  return new Promise((resolve, reject) => {
    getFilesInPath('./client/stores/')
      .then((files) => {
        const filteredFiles = files.filter((file) => { // get just folder names
          return file.indexOf('.js') === -1;
        });
        const stores = storeName ?
          _.sortBy([
            storeName,
            ...filteredFiles,
          ]) : filteredFiles;

        const retConfig = {
          store: {
            files: moduleFiles,
            templateData: {
              storeName,
              storeNameUpperCase,
              stores,
            },
          },
          refreshReducers: {
            files: [{
              src: `${templatePath}/${reducersTemplate}`,
              dest: `${destPath}/reducers.js`,
            }],
            templateData: {
              stores,
            },
          },
        };

        resolve(retConfig);
        done(retConfig);
      })
      .catch(reject);
  });
};

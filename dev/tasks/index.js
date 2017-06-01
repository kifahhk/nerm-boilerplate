const getStoreConfig = require('./store-task');
const getModelConfig = require('./model-task');
const { getModuleConfig, getModuleFiles } = require('./module-task');
const getModuleComponentConfig = require('./module-component-task');
const { getLibComponentConfig } = require('./lib-component-task');
const getQuestions = require('./create-questions');

module.exports = {
  getStoreConfig,
  getModelConfig,
  getModuleConfig,
  getModuleFiles,
  getModuleComponentConfig,
  getLibComponentConfig,
  getQuestions,
};

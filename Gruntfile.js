(function () {
  "use strict";
  /*jslint node: true*/

  const fs = require('fs');
  const path = require("path");
  const createChoices = [
    'component',
    'module',
    'store',
    'model',
    'controller',
    'route'
  ];
  const componentTypes = [
    'stateless-function',
    'class-component',
    'module-stateless-function',
    'module-class-component'
  ];
  let modules = [];

  module.exports = function (grunt) {

    grunt.initConfig({
      'compile-handlebars': {
        component: {
          handlebars: 'node_modules/handlebars'
        },
        module: {
          handlebars: 'node_modules/handlebars'
        },
        store: {
          handlebars: 'node_modules/handlebars'
        }
      },
      prompt: {
        create: {
          options: {
            questions: [
              {
                name: 'type',
                type: 'list',
                message: 'What would you like me to create?',
                default: createChoices[0],
                choices: createChoices
              }, {
                name: 'componentType',
                type: 'list',
                message: 'Which kind of components?',
                when: function (answers) {
                  return answers['type'] === 'component';
                },
                default: componentTypes[0],
                choices: componentTypes
              }, {
                name: 'moduleName',
                type: 'list',
                message: 'In which Module should I add the component?',
                when: function (answers) {
                  return componentTypes.indexOf(answers['componentType']) >= 2;
                },
                choices: function () {
                  return modules;
                }
              }, {
                name: 'withTest',
                type: 'confirm',
                message: 'Would you like me to create tests?',
                default: 'y',
                when: function (answers) {
                  return answers['type'] !== 'module' && answers['type'] !== 'store';
                },
              }, {
                name: 'name',
                type: 'input',
                message: 'Enter the name please!',
                validate: function (value, answers) {
                  const {type, moduleName, componentType} = answers;
                  const isModuleComponent = componentType && moduleName;
                  const basePath = createChoices.indexOf(type) >= 3 ? 'server' : 'client';
                  const dirPath = isModuleComponent ? `modules/${moduleName}/components` : `${type}s`;
                  return !fs.existsSync(`${basePath}/${dirPath}/${value}`) || `${value} exists already, please double check`;
                }
              }
            ],
            then: create
          }
        }}
    });

    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-prompt');

    grunt.registerTask('create', function(args){
      getModules()
        .then((files) => modules = files);
      grunt.task.run('prompt:create');
    });

    function getModules() {
      return new Promise((resolve, reject) => {
        fs.readdir("./client/modules/", function (err, files) {
          if (err) {
            grunt.log.error(err);
            reject();
          }
          resolve(files);
        });
      });
    }

    function create(results, done) {
      const {type, withTest, name, componentType, moduleName} = results;
      switch (type) {
        case 'component':
          moduleName // module component
            ? createModuleComponent(name, componentType, withTest, moduleName)
            : createComponent(name, componentType, withTest);
          break;
        case 'module':
          createModule(name);
          break;
        case 'store':
          createStore(name);
          break;
        default:
          grunt.log.write('coming soon...');
      }
      done();
    }

    function getCamelCase(cName) {
      return cName.replace(new RegExp(/-(.)/, 'g'), function (a, b) {
        return b.toUpperCase();
      });
    }

    function getClassName(cName) {
      return cName.substring(0,1).toUpperCase() + cName.substring(1);
    }

    function createComponent(cName, cType, withTest) {
      const cNameCamelCase = getCamelCase(cName);
      const cNameClassName = getClassName(cNameCamelCase);
      const templatePath = 'dev/templates/components';
      const templateFile = `${cType}.handlebars`;
      const templateStyle = 'style.handlebars';
      const templateTest = 'test.handlebars';
      const destPath = 'client/components';
      const componentFiles = [{
        src: `${templatePath}/${templateFile}`,
        dest: `${destPath}/${cName}/${cName}.js`
      }, {
        src: `${templatePath}/${templateStyle}`,
        dest: `${destPath}/${cName}/${cName}.scss`
      }];
      const testFiles = withTest ? [{
          src: `${templatePath}/${templateTest}`,
          dest: `${destPath}/${cName}/tests/${cName}.spec.js`
        }
        ] : [];

      grunt.config('compile-handlebars.component', {
        files: [...componentFiles, ...testFiles],
        templateData: {
          cName,
          cNameClassName
        }
      });

      grunt.task.run('compile-handlebars:component');
    }

    function createModuleComponent(cName, cType, withTest, moduleName) {
      const cNameCamelCase = getCamelCase(cName);
      const cNameClassName = getClassName(cNameCamelCase);
      const templatePath = 'dev/templates/modules/components';
      const templateFile = `${cType}.handlebars`;
      const templateTest = 'test.handlebars';
      const destPath = `client/modules/${moduleName}`;
      const componentFiles = [{
        src: `${templatePath}/${templateFile}`,
        dest: `${destPath}/components/${cName}.js`
      }];
      const testFiles = withTest ? [{
          src: `${templatePath}/${templateTest}`,
          dest: `${destPath}/tests/${cName}.spec.js`
        }
        ] : [];

      grunt.config('compile-handlebars.component', {
        files: [...componentFiles, ...testFiles],
        templateData: {
          cName,
          cNameClassName
        }
      });

      grunt.task.run('compile-handlebars:component');
    }

    function createModule(cName) {
      const cNameCamelCase = getCamelCase(cName);
      const cNameClassName = getClassName(cNameCamelCase);
      const templatePath = 'dev/templates/modules';
      const templateFile = `module.handlebars`;
      const templateStyle = 'style.handlebars';
      const templateKeep = 'keep.handlebars';
      const destPath = 'client/modules';
      const moduleFiles = [{
        src: `${templatePath}/${templateFile}`,
        dest: `${destPath}/${cName}/${cName}.js`
      }, {
        src: `${templatePath}/${templateStyle}`,
        dest: `${destPath}/${cName}/${cName}.scss`
      }, {
        src: `${templatePath}/${templateKeep}`,
        dest: `${destPath}/${cName}/tests/.gitkeep`
      }, {
        src: `${templatePath}/${templateKeep}`,
        dest: `${destPath}/${cName}/components/.gitkeep`
      }];


      grunt.config('compile-handlebars.module', {
        files: moduleFiles,
        templateData: {
          cName,
          cNameClassName
        }
      });

      grunt.task.run('compile-handlebars:module');

    }

    function createStore(storeName) {
      const storeNameCamelCase = getCamelCase(storeName);
      const storeNameUpperCase = storeNameCamelCase.toUpperCase();
      const templatePath = 'dev/templates/stores';
      const reducerTemplate = `reducer.handlebars`;
      const typeTemplate = 'type.handlebars';
      const actionTemplate = 'action.handlebars';
      const keepTemplate = 'keep.handlebars';
      const destPath = 'client/stores';
      const moduleFiles = [{
        src: `${templatePath}/${reducerTemplate}`,
        dest: `${destPath}/${storeName}/${storeName}-reducer.js`
      }, {
        src: `${templatePath}/${typeTemplate}`,
        dest: `${destPath}/${storeName}/${storeName}-type.js`
      }, {
        src: `${templatePath}/${actionTemplate}`,
        dest: `${destPath}/${storeName}/${storeName}-action.js`
      }, {
        src: `${templatePath}/${keepTemplate}`,
        dest: `${destPath}/${storeName}/tests/.gitkeep`
      }];


      grunt.config('compile-handlebars.store', {
        files: moduleFiles,
        templateData: {
          storeName,
          storeNameUpperCase
        }
      });

      grunt.task.run('compile-handlebars:store');

    }

  };
}());

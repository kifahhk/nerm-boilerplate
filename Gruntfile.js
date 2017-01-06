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
                default: 'y'
              }, {
                name: 'name',
                type: 'input',
                message: 'Enter the name please!',
                validate: function (value, answers) {
                  const {type, moduleName, componentType} = answers;
                  const isModuleComponent = componentType && moduleName;
                  const basePath = createChoices.indexOf(type) >= 3 ? 'server' : 'client';
                  const baseComponent = ''; // Todo in case of module list all modules
                  const dirPath = isModuleComponent ? `modules/${baseComponent}/components` : `${type}s`;
                  console.log(dirPath);
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
      const {type, withTest, name, componentType} = results;
      if(type === createChoices[0]) { // case component

        createComponent(name, componentType, withTest);
      }
      console.log(results);
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
      const templateFile = 'stateless-function.handlebars';
      const templateStyle = 'style.handlebars';
      const templateTest = 'test.handlebars';
      const destPath = 'client/components';
      const componentFiles = [{
        src: `${templatePath}/${templateFile}`,
        dest: `${destPath}/${cName}/${cName}.js`
      }, {
        src: `${templatePath}/${templateStyle}`,
        dest: `${destPath}/$${cName}/${cName}.scss`
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

    function createModuleComponent(cName, cType, withTest) {
      const cNameCamelCase = getCamelCase(cName);
      const cNameClassName = getClassName(cNameCamelCase);
      const templatePath = 'dev/templates/modules/components';
      const templateFile = 'stateless-function.handlebars';
      const templateStyle = 'style.handlebars';
      const templateTest = 'test.handlebars';
      const destPath = 'client/modules/components';
      const componentFiles = [{
        src: `${templatePath}/${templateFile}`,
        dest: `${destPath}/${cName}/${cName}.js`
      }, {
        src: `${templatePath}/${templateStyle}`,
        dest: `${destPath}/$${cName}/${cName}.scss`
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

  };
}());

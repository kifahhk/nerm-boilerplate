(function () {
  "use strict";
  /*jslint node: true*/

  const {
    getStoreConfig, getModelConfig, getModuleConfig, getModuleFiles, getModuleComponentConfig,
    getLibComponentConfig, getQuestions
  } = require('./dev/tasks');

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
        },
        model: {
          handlebars: 'node_modules/handlebars'
        },
        refreshReducers: {
          handlebars: 'node_modules/handlebars'
        },
        refreshRoutes: {
          handlebars: 'node_modules/handlebars'
        }
      },
      clean: {
        routes: 'server/routes/index.js',
        reducers: 'client/stores/reducers.js',
        stories: '.storybook/stories/index.js',
      },
      prompt: {
        create: {
          options: {
            then: create
          }
        }
      },
      cssmin: {
        target: {
          files: [{
            expand: true,
            cwd: 'dist',
            src: ['*.css', '!*.min.css'],
            dest: 'dist',
            ext: '.min.css'
          }]
        }
      }
    });

    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-prompt');

    grunt.registerTask('create', function (args) {
      const done = this.async();

      getModuleFiles()
        .then((moduleFiles) => {
          grunt.config('prompt.create.options.questions', getQuestions(moduleFiles));
          grunt.task.run('prompt:create');

          done();
        })
        .catch((err) => grunt.log.error("error", err));
    });

    function create(results, done) {
      const { type, withTest, name, componentType, moduleName, withExample } = results;
      switch (type) {
        case 'component':
          moduleName // module component
            ? createModuleComponent(name, componentType, withTest, moduleName)
            : createLibComponent(name, componentType, withTest, withExample);
          break;
        case 'module':
          createModule(name);
          break;
        case 'store':
          createStore(name);
          break;
        case 'model':
          createModel(name);
          break;
        default:
          grunt.log.write('coming soon...');
      }
      done();
    }

    function createLibComponent(cName, cType, withTest, withExample) {
      grunt.config('compile-handlebars.component', getLibComponentConfig(cName, cType, withTest));
      grunt.task.run('compile-handlebars:component');
    }

    function createModuleComponent(cName, cType, withTest, moduleName) {
      grunt.config('compile-handlebars.component', getModuleComponentConfig(cName, cType, withTest, moduleName));
      grunt.task.run('compile-handlebars:component');
    }

    function createModule(moduleName) {
      grunt.config('compile-handlebars.module', getModuleConfig(moduleName));
      grunt.task.run('compile-handlebars:module');
    }

    function createStore(storeName) {
      grunt.registerTask('create-store', function (args) {
        const done = this.async();

        getStoreConfig(storeName)
          .then((storeConfig) => {
            grunt.config('compile-handlebars.store', storeConfig.store);
            grunt.config('compile-handlebars.refreshReducers', storeConfig.refreshReducers);
            grunt.task.run(['clean:reducers', 'compile-handlebars:store', 'compile-handlebars:refreshReducers']);

            done();
          })
          .catch((err) => grunt.log.error("error", err));
      });

      grunt.task.run('create-store');
    }

    function refreshReducers() {
      grunt.registerTask('refresh-reducers', function (args) {
        const done = this.async();

        getStoreConfig()
          .then((storeConfig) => {
            grunt.config('compile-handlebars.refreshReducers', storeConfig.refreshReducers);
            grunt.task.run(['clean:reducers', 'compile-handlebars:refreshReducers']);

            done();
          })
          .catch((err) => grunt.log.error("error", err));
      });

      grunt.task.run('refresh-reducers');
    }

    function createModel(modelName) {
      grunt.registerTask('create-model', function (args) {
        const done = this.async();

        getModelConfig(modelName)
          .then((modelConfig) => {
            grunt.config('compile-handlebars.model', modelConfig.model);
            grunt.config('compile-handlebars.refreshRoutes', modelConfig.refreshRoutes);
            grunt.task.run(['clean:routes', 'compile-handlebars:model', 'compile-handlebars:refreshRoutes']);

            done();
          })
          .catch((err) => grunt.log.error("error", err));
      });

      grunt.task.run('create-model');
    }

    function refreshRoutes() {
      grunt.registerTask('refresh-routes', function (args) {
        const done = this.async();

        getModelConfig()
          .then((modelConfig) => {
            grunt.config('compile-handlebars.refreshRoutes', modelConfig.refreshRoutes);
            grunt.task.run(['clean:routes', 'compile-handlebars:refreshRoutes']);

            done();
          })
          .catch((err) => grunt.log.error("error", err));
      });

      grunt.task.run('refresh-routes');
    }

  };
}());

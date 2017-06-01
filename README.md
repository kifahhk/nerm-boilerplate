# NERM Boilerplate

## Boilerplate for building apps with Node / Express / React Redux and MongoDB

Inspired by [MERN](https://mern.io) and mainly created using [MERN-cli](https://github.com/Hashnode/mern-cli)
#### modified for own purposes 

#### Demo
https://nerm-boilerplate.herokuapp.com/

## install
```
git clone https://github.com/kifahhk/nerm-boilerplate
cd nerm-boilerplate
npm install
npm run dev
```
[http://localhost:8000/](http://localhost:8000/)

## Available Commands

1. `npm run dev` - run the development server with hot reloading enabled

2. `npm run build` - build code-bundle and starts the production server

3. `npm run test:server` - run mocha tests on server

4. `npm run test:client` - run mocha tests on client

5. `npm run watch:server` - run mocha tests on server with watch mode

6. `npm run watch:client` - run mocha tests on server with watch mode

7. `npm run test` - run mocha tests on server and client

8. `npm run lint` - runs linter to check for lint errors

9. `npm run styleguide` - runs react stroybook styleguide on port 9001

10. `npm run create` - runs grunt helper tool to creat shared components, modules, stores and models

please note that `npm start` will run the production build


## Configuration

#### Webpack 2 (environments)
`webpack.config.dev.js` (for development client & server)
`webpack.config.prod.js` (for bundling client in production)
`webpack.config.server.js` (for bundling server in production)

#### Database configuration
`config/db.js`

#### Server configuration
`config/server.js`

## File Structure

### Server

Express web framework

#### Server Side Rendering

React Router handles all the routes are defined in `client/routes.js`.

### Client

Client directory contains all the shared components, routes, modules.

#### components
This folder contains all the common components which are used throughout the project.

#### index.js
Index.js simply does client side rendering using the data provided from `window.__INITIAL_STATE__`.

#### modules
Modules are the way of organising different domain-specific modules in the project.
A typical module contains the following:

```
| - todo
  | - components // Sub components of this module
      | - footer.js
      | - header.js
      | - main-section.js
      | - todo-input.js
      | - todo-item.js
  | - tests // all the tests for this module goes here
        | - footer.spec.js
        | - header.spec.js
        | - main-section.spec.js
        | - todo-input.spec.js
        | - todo-item.spec.js
  | - todo.js // container
  | - todo.scss // main style
```

#### stores
Stores contains all redux stores/reducers, file structure:

```
| - todo
  | - tests // all the tests for this store goes here
        | - todo-action.spec.js
        | - todo-reducer.spec.js
  | - todo-action.js // store actions
  | - todo-reducer.js // store reducer
  | - todo-type.js // store constants
```

## Testing
Tests will be run with [mocha](https://github.com/mochajs/mocha)
using [chai](https://github.com/chaijs/chai) as an assertions library
 - [enzyme](https://github.com/airbnb/enzyme) as testing library
 - [sinon](https://github.com/sinonjs/sinon) as test spies
 - [moxios](https://github.com/mzabriskie/moxios) to mock [axios](https://github.com/mzabriskie/axios) requests for testing.
 Alternative: [nock](https://github.com/node-nock/nock) for [fetch](https://github.github.io/fetch/)
 - [supertest](https://github.com/visionmedia/supertest) HTTP assertions for server testing

## Linting
Lints rules are defined in `.eslintrc` file.

## TravisCI
Travis rules are defined in `.travis.yml` file.
- It runs test and lint after creating a pull request as well as after pushing to master

## Pull Approve
Travis rules are defined in `.pullapprove.yml` file.
The pull request need an approve from other collaborator in order to be merged

## ToDos
- fix react-route warning on hot reload
- enhance run speed

## License
MIT

## Developing

Follow scaffolding tool:
````
npm run create
````

### General guideline
- Any change must be done in separate branch
- Name convension
  - No plural for files name, directories can be in plural though
  - No camelCase, instead use dash '-' to separate => camel-case
  - No capital-letters
- Follow file structure
- Create Tests
- Edit just related files
- Separate between Server and Client implementation

### Before creating Pull-Request
- All the tests pass
- Lint pass

### API Service
- model
- controller
- routes
- add routes to express server

### Client Checklist
- lib (shared components)
- modules
- stores
- routes

### Before merge
- Code reviewed and approved

### After merge
- Delete Branch

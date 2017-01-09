# NERM Boilerplate

## Boilerplate for building apps with Node / Express / React Redux and MongoDB

Heavily inspired by [MERN](https://mern.io) and mainly created using [MERN-cli](https://github.com/Hashnode/mern-cli)
#### modified for own purposes

Todo example on the client side modified from [redux example](https://github.com/reactjs/redux/tree/master/examples/todomvc)

#### Demo
https://nerm-boilerplate.herokuapp.com/

## To Run
```
git clone https://github.com/kifahhk/nerm-boilerplate
cd nerm-boilerplate
npm install
npm start
http://localhost:8000/
```

## Available Commands

1. `npm run start` - run the development server with hot reloading enabled

2. `npm run build` - build code-bundle and starts the production server

3. `npm run test:server` - run mocha tests on server

4. `npm run test:client` - run mocha tests on client

5. `npm run watch:server` - run mocha tests on server with watch mode

6. `npm run watch:client` - run mocha tests on server with watch mode

7. `npm run test` - run mocha tests on server and client

8. `npm run lint` - runs linter to check for lint errors

9. `grunt create` - scuffolding tool to create components, modules and stores


## Configuration and File Structure

#### Webpack (environments)
`webpack.config.dev.js` (for development)
`webpack.config.prod.js` (for production)
`webpack.config.server.js` (for bundling server in production)
`webpack.config.babel.js` (for [babel-plugin-webpack-loaders](https://github.com/istarkov/babel-plugin-webpack-loaders) for server rendering of assets included through webpack).

#### Database configuration
`config/db.js`

#### Server configuration
`config/server.js`

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

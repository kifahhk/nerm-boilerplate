## Boilerplate for building apps with Node / Express / React Redux and MongoDB

inspired by [MERN](https://mern.io) and mainly created using [MERN-cli](https://github.com/Hashnode/mern-cli)
#### modified for own purposes 

Todo example on the client side modified from [redux example](https://github.com/reactjs/redux/tree/master/examples/todomvc) 

#### Demo
https://nerm-boilerplate.herokuapp.com/

## Available Commands

1. `npm run start` - run the development server with hot reloading enabled

2. `npm run build` - build code-bundle and starts the production server

3. `npm run test:server` - run mocha tests on server

4. `npm run test:client` - run mocha tests on client

5. `npm run watch:server` - run mocha tests on server with watch mode

6. `npm run watch:client` - run mocha tests on server with watch mode

7. `npm run test` - run mocha tests on server and client

8. `npm run lint` - runs linter to check for lint errors

## File Structure

### Configuration

As in MERN:
There are four types of Webpack configs provided 
`webpack.config.dev.js` (for development), 
`webpack.config.prod.js` (for production), 
`webpack.config.server.js` (for bundling server in production) and 
`webpack.config.babel.js` (for [babel-plugin-webpack-loaders](https://github.com/istarkov/babel-plugin-webpack-loaders) for server rendering of assets included through webpack).

### Server

As in MERN: 
Express web framework

#### Server Side Rendering

React Router's match function for handling all page requests so that browser history works.

All the routes are defined in `client/routes.js`. 
React Router renders components according to route requested

### Client

Client directory contains all the shared components, routes, modules.

#### components
This folder contains all the common components which are used throughout the project.

#### index.js
Index.js simply does client side rendering using the data provided from `window.__INITIAL_STATE__`.

#### modules
Modules are the way of organising different domain-specific modules in the project. A typical module contains the following

```
| - Post
  | - __tests__ // all the tests for this module goes here
      | - components // Sub components of this module
          | - Post.spec.js
          | - PostList.spec.js
          | - PostItem.spec.js
          | - PostImage.spec.js
      | - pages
          | - PostPage.spec.js
          | - PostViewPage.spec.js
      | - PostReducer.spec.js
      | - PostActions.spec.js
  | - components // Sub components of this module
      | - Post.js
      | - PostList.js
      | - PostItem.js
      | - PostImage.js
  | - pages // React Router Pages from this module
      | - PostPage
          | - PostPage.js
          | - PostPage.css
      | - PostViewPage
          | - PostViewPage.js
          | - PostViewPage.css
  | - PostReducer.js
  | - PostActions.js
```


### Deploy

## ToDos


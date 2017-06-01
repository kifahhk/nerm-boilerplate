import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { isDev } from '../../config/server';

export function configureStore(initialState = {}) {
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk),
  ];

  if (process.env.CLIENT && isDev) {
    // Enable DevTools only when rendering on client and during development.
    if (window && window.devToolsExtension) {
      enhancers.push(window.devToolsExtension());
    }
  }

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

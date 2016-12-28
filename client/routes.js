import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/app/app';
import Todo from './modules/todo/todo';
//
// import { getuser } from './actions/types';
//
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(reducers);
//
// const token = localStorage.getItem('token');
// // If we have a token, consider the user to be signed in
// if (token) {
//   // we need to update application state
//   store.dispatch({ type: AUTH_USER });
// }

export default (
  <Route path="/" component={App}>
    <IndexRoute />
    <Route path="todo" component={Todo} />
  </Route>
);

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/app/app';
import Todo from './modules/todo/todo';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Todo} />
  </Route>
);

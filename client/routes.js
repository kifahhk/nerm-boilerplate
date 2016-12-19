import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/app/app';
import Todo from './modules/todo/todo';
import About from './pages/about';

export default (
  <Route path="/" component={App}>
    <IndexRoute />
    <Route path="about" component={About} />
    <Route path="todo" component={Todo} />
  </Route>
);

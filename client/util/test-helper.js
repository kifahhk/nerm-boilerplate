import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils';
import chai, { expect, assert } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../stores/reducers';
import { mount, shallow } from 'enzyme';
import sinonChai from 'sinon-chai';
import thunk from 'redux-thunk';
import { LocalStorage } from 'node-localstorage';
import * as router from 'react-router';

chai.use(sinonChai);

const exposedProperties = ['window', 'navigator', 'document'];
const globalKeys = ['DocumentFragment', 'Event', 'KeyboardEvent', 'MouseEvent']; // dom4

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
globalKeys.forEach(key => {
  global[key] = document.defaultView[key];
});
global.window = global.document.defaultView;
global.localStorage = new LocalStorage('./localStorageTemp');
global.window.localStorage = global.localStorage;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

const renderComponent = (ComponentClass, props, state) => {
  return TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );
};

const middlewares = [thunk];
const mockStore = (currentState) => {
  const getCurrentState = currentState;

  const mockStoreWithoutMiddleware = () => {
    const actions = [];

    const getState = () => {
      return typeof getCurrentState === 'function' ?
        getCurrentState() :
        getCurrentState;
    };

    const dispatch = (action) => {
      actions.push(action);
      return action;
    };

    const subscribe = () => {
      return () => {
      };
    };

    const getActions = () => {
      return actions;
    };

    return {
      getState,
      dispatch,
      subscribe,
      getActions,
    };
  };

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
};
// mock router browser history
router.browserHistory = {
  push: () => {
  },
};

export { renderComponent, expect, shallow, mount, assert, mockStore };

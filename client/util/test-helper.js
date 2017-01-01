import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils';
import chai, { expect, assert } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../stateManager/reducers';
import { mount, shallow } from 'enzyme';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
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

export { renderComponent, expect, shallow, mount, assert };

// Client entry point
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './root';
import { configureStore } from './stores/store';

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

const renderApp = () => {
  render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    mountApp
  );
};

renderApp();

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./root', renderApp);
}

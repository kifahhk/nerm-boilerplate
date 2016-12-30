import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { isDev } from '../../../config/server';
import DevTools from './components/dev-tool';
import './app.scss';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && isDev && <DevTools />}
        <div>
          <Helmet
            title="Mongo-Node-Express-React Starter"
            titleTemplate="%s - Mongo-Node-Express-React Starter"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <div className="container">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
};

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import './app.scss';

const App = ({ children }) => {
  return (
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
        {children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object,
};

export default App;

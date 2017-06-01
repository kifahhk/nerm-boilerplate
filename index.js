// Entry point
if (process.env.NODE_ENV === 'production') {
  if (!process.env.HEROKU_ENV) { // If we are not in heroku use .env
    // set envirenment vars
    require('dotenv').config();
  }

  process.env.webpackAssets = JSON.stringify(require('./dist/manifest.json'));
  process.env.webpackChunkAssets = JSON.stringify(require('./dist/chunk-manifest.json'));
  // In production, serve the webpacked server file.
  require('./dist/server.bundle.js');
} else {
  // set envirenment vars
  require('dotenv').config();

  // Babel polyfill to convert ES6 code in runtime
  require('babel-register')({
    'plugins': [
      [
        'babel-plugin-transform-require-ignore',
        {
          extensions: ['.scss', '.less', '.sass', '.css', '.svg', '.png', '.jpg', '.jpeg', '.gif']
        }
      ]
    ],
    extensions: [".js"]
  });

  require('babel-polyfill');

  require('./server/server');
}

const fs = require('fs');
const path = require('path');
const ExternalsPlugin = require('webpack-externals-plugin');

module.exports = {

  entry: path.resolve(__dirname, 'server/server.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
  },

  resolve: {
    extensions: ['.js'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'react',
                'es2015',
                'stage-0',
              ],
              plugins: [
                [
                  'babel-plugin-transform-require-ignore',
                  {
                    extensions: ['.scss', '.less', '.sass', '.css', '.svg', '.png', '.jpg', '.jpeg', '.gif']
                  }
                ],
                "jsx-control-statements",
                "transform-react-constant-elements"
              ]
            }
          }
        ]
      }, {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },
  plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: path.join(__dirname, './node_modules/'),
    }),
  ],
};

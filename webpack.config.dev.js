const webpack = require('webpack');
const path = require('path');
const postcssPlugins = require('./config/postcss');

let cssModulesIdentName = '[name]__[local]__[hash:base64:5]';
if (process.env.NODE_ENV === 'production') {
  cssModulesIdentName = '[hash:base64]';
}


module.exports = {
  devtool: 'cheap-eval-source-map',

  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },

  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js'],
    modules: [
      'node_modules',
      'client',
    ],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1&localIdentName' + cssModulesIdentName + '&sourceMap',
          'postcss-loader?plugins=' + postcssPlugins,
          'resolve-url-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1&localIdentName' + cssModulesIdentName + '&sourceMap',
          'postcss-loader?plugins=' + postcssPlugins,
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: 'url-loader?limit=10000'
      },
      {
        test: /\.json$/,
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        use: 'json-loader'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: 'file-loader?name=[name].[ext]'
      }
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
      }
    })
  ],
};

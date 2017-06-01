const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;
const postcssPlugins = require('./config/postcss');


module.exports = {
  devtool: 'hidden-source-map',

  entry: {
    app: [
      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader?plugins=' + postcssPlugins,
            'resolve-url-loader',
            'sass-loader?sourceMap'
          ],
        })
      }, {
        test: /\.js?$/,
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        use: 'babel-loader?plugins=jsx-control-statements'
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('app.[chunkhash].css').replace('css/js', 'css');
      },
      allChunks: true
    }),
    new ManifestPlugin({
      basePath: '/',
    }),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest",
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compressor: {
        warnings: false,
      }
    }),
    new WebpackBundleSizeAnalyzerPlugin('./build-report.txt')
  ],
};

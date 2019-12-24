const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const ROOT_PATH = path.join(__dirname, '..', '..');
const DIST_PATH = path.join(ROOT_PATH, 'dist-web');
const APP_PATH = path.join(ROOT_PATH, 'src');
const WEB_PATH = path.join(ROOT_PATH, 'web');
const TS_CONFIG_PATH = path.join(ROOT_PATH, 'tsconfig.json');

const buildConfig = (env, argv) => ({
  entry: ROOT_PATH,

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },

  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'eslint-loader', include: APP_PATH, enforce: 'pre' },
      { test: /\.tsx?$/, loader: 'babel-loader', include: APP_PATH },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({ __DEV__: argv.mode === 'development' }),
    new HtmlWebpackPlugin({ inject: true, template: path.join(WEB_PATH, 'template.html') }),
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'signin-callback.html',
      template: 'web/signin-callback.html'
    }),
    new ForkTsCheckerWebpackPlugin({ tsconfig: TS_CONFIG_PATH, async: true }),
  ],
});

module.exports = {
  buildConfig,
  APP_PATH,
  DIST_PATH,
  WEB_PATH,
};

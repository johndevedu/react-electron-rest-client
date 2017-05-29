/* eslint global-require: 0, import/no-dynamic-require: 0 */

import path from 'path';
import webpack from 'webpack';

const dll = path.resolve(process.cwd(), 'dll');
const manifest = path.resolve(dll, 'mainVendor.json');

export default {
  devtool: 'inline-source-map',

  target: 'electron-main',

  entry: [
    'webpack/hot/poll?1000',
    // 'webpack/hot/only-dev-server',
    path.join(__dirname, 'app/main.dev.js'),
  ],

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }, {
        loader: 'webpack-module-hot-accept'
      }]
    }]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'main.js'
  },

  plugins: [
    // new webpack.DllReferencePlugin({
    //   context: process.cwd(),
    //   manifest: require(manifest),
    //   sourceType: 'commonjs2',
    // }),

    /**
     * https://webpack.js.org/concepts/hot-module-replacement/
     */
    new webpack.HotModuleReplacementPlugin({
      // @TODO: Waiting on https://github.com/jantimon/html-webpack-plugin/issues/533
      // multiStep: true
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     *
     * By default, use 'development' as NODE_ENV. This can be overriden with
     * 'staging', for example, by changing the ENV variables in the npm scripts
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true
    }),

    new webpack.NamedModulesPlugin(),
  ],

  node: {
    __dirname: false,
    __filename: false
  },
};

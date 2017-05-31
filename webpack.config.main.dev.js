/* eslint global-require: 0, import/no-dynamic-require: 0 */

import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'inline-source-map',

  target: 'electron-main',

  entry: [
    'webpack/hot/poll?1000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'app/main.js'),
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

  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: false,
    depth: false,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    hash: false,
    maxModules: 0,
    modules: false,
    performance: false,
    providedExports: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: false,
    usedExports: false,
    version: false,
    warnings: false
  },

  output: {
    path: path.join(__dirname, 'app'),
    hotUpdateChunkFilename: '../dll/hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: '../dll/hot/[hash].hot-update.json',
    filename: 'main.dev.js'
  },

  plugins: [
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

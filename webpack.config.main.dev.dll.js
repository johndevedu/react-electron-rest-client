/**
 * Builds the DLL for development electron renderer process
 */

import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const dist = path.resolve(process.cwd(), 'dll');

export default merge.smart(baseConfig, {

  devtool: 'eval',

  target: 'electron-main',

  externals: ['fsevents', 'crypto-browserify'],

  resolve: {
    modules: [
      'app',
    ],
  },

  entry: {
    mainVendor: [
      'babel-polyfill',
      'electron',
      'source-map-support',
      'electron-devtools-installer'
    ]
  },

  output: {
    library: 'mainVendor',
    path: dist,
    filename: '[name].dll.js',
    libraryTarget: 'commonjs2'
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(dist, '[name].json'),
      libraryTarget: 'commonjs2',
      name: '[name]',
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: path.resolve(process.cwd(), 'app'),
        output: {
          path: path.resolve(process.cwd(), 'dll'),
        },
      },
    })
  ],
});

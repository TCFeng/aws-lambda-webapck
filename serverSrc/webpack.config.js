const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
var glob = require('glob');

const handlerRegex = /\.[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
const include = './_webpack/include.js';

const ymlFiles = glob.sync('serverless/functions/*.yml');

const entries = ymlFiles.reduce((result, ymlDocPath) => {
  const doc = yaml.safeLoad(fs.readFileSync(`./${ymlDocPath}`, 'utf8'));
  for (var key in doc) {
    var handler = doc[key].handler;
    var entryKey = handler.replace(handlerRegex, '');
    return Object.assign({}, result, { [entryKey]: [include, './' + entryKey + '.js'] });
  }
}, {});

module.exports = {
  entry: entries,
  target: 'node',
  // Generate sourcemaps for proper error messages
  devtool: 'source-map',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: __dirname,
      exclude: /node_modules/,
    }]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  }
};
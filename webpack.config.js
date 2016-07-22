var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'fdn';

var plugins = [],
  outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

plugins.push(new webpack.ResolverPlugin(
  new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
    'bower.json', ['main'])
));

/*
plugins.push(new HtmlWebpackPlugin({
  pkg: require('./package.json'),
  template: 'app/entry-template.html',
}));
*/

var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.html$/, loader: "html" },
      { test: /\.json$/, loader: "json" }, {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      }, {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery"
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    alias: {
      npm: __dirname + '/node_modules',
      bower: __dirname + '/bower_components',
      styles: __dirname + '/src/styles'
    }
  },
  plugins: plugins
};

module.exports = config;


const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    xfsgojs: './src/index.js',
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-transform-modules-commonjs",
            ],
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    globalObject: 'this',
    libraryTarget: 'umd',
    library: '[name]',
  }
};

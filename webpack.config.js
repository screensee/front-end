const HtmlWebPackPlugin = require('html-webpack-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.woff$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 50000
          }
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    })
  ],
  resolve: {
    plugins: [new DirectoryNamedWebpackPlugin()]
  },
  devServer: {
    contentBase: './build'
  },
  devtool: 'inline-source-map'
};

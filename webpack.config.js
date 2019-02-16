const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: {
        app: path.join(__dirname, 'src', 'main.js'),
        detail: path.join(__dirname, 'src', 'detail.js'),
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'docs'),
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(jpg|png|gif|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                  name: 'images/[name].[ext]',
              },
            }
          ]
        },    
      ],
    },    
    plugins: [ 
      new CleanWebpackPlugin(['docs']),
      new htmlPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
        chunks: ['app'],
      }),
      new htmlPlugin({
        filename: 'detail.html',
        template: path.join(__dirname, 'src', 'detail.html'),
        chunks: ['detail'],
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        open: true,
        overlay: true,
        port: 3000,
        hot: true,
        inline: true,
        contentBase: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'src', 'templates'),
        ],
        watchContentBase: true,
    },
}
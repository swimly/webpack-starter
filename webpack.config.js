var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path')

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {test: /\.css$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader'],
        publicPath: '/dist'
      })},
      {test: /\.scss$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
        publicPath: '/dist'
      })},
      {test: /\.pug$/, use: ['html-loader', 'pug-html-loader']}
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    stats: 'errors-only',
    open: true // 启动后自动打开浏览器窗口
  },
  plugins: [
    new ExtractTextPlugin({
      filename:  (getPath) => {
        return getPath('css/[name].css').replace('css/js', 'css');
      },
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'myApp',
      // minify: {
      //   collapseWhitespace: true //生成被压缩的html文件
      // },
      hash: true,
      filename: './index.html',
      excludeChunks: ['contact'],
      template: './src/index.pug', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      title: 'contact',
      hash: true,
      filename: 'contact.html',
      chunks: ['contact'],
      template: './src/contact.html'
    })
  ]
}
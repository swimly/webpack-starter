var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path')
var webpack = require('webpack')
var isProduction = process.env.NODE_ENV === 'production';
var scssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssDev = ['style-loader', 'css-loader'];
var scssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  loader: ['css-loader', 'sass-loader'],
  publicPath: '/dist'
});
var cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  loader: ['css-loader'],
  publicPath: '/dist'
});
var scssConfig = isProduction ? scssProd : scssDev;
var cssConfig = isProduction ? cssProd : cssDev;

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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: cssConfig
      },
      {
        test: /\.scss$/,
        use: scssConfig
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader']
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/,
        use: [
          'file-loader?name=images/[name].[ext]',
          // 'file-loader?name=[hash:6].[ext]&publicPath=images/',
          'image-webpack-loader?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    stats: 'errors-only',
    hot: true,
    open: true // 启动后自动打开浏览器窗口
  },
  plugins: [
    new ExtractTextPlugin({
      filename:  (getPath) => {
        return getPath('css/[name].css').replace('css/js', 'css');
      },
      disable: !isProduction,
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
      template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      title: 'contact',
      hash: true,
      filename: 'contact.html',
      chunks: ['contact'],
      template: './src/contact.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
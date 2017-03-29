# webpack-starter
### 1、项目初始化
``` bash
npm init
```
一路回车即可！最终会生成package.json文件，如下所示：
``` json
{
  "name": "webpack-starter",
  "version": "1.0.0",
  "description": "``` bash\r npm init\r ```\r 一路回车即可！最终会生成package.json文件，如下所示：\r ``` json",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/swimly/webpack-starter.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/swimly/webpack-starter/issues"
  },
  "homepage": "https://github.com/swimly/webpack-starter#readme"
}
```
接下来全局安装webpack。
``` bash
npm i -g webpack  // 已安装的跳过
```
在该项目安装webpack
``` bash
npm i -D webpack
```
package.json:
``` json
"devDependencies": {
  "webpack": "^2.3.2"
}
```
创建如下目录结构：
```
+ src
  - app.js
+ dist
package.json
```
app.js
``` javascript
console.log('hello from app.js')
```
到此就可以用webpack进行简单的打包
``` bash
webpack ./src/app.js ./dist/app.bundle.js
```
``` bash
webpack ./src/app.js ./dist/app.bundle.js
Hash: 59e49fa6a143615fafca
Version: webpack 2.3.2
Time: 64ms
        Asset     Size  Chunks             Chunk Names
app.bundle.js  2.66 kB       0  [emitted]  main
   [0] ./src/app.js 32 bytes {0} [built]
```
``` bash
webpack ./src/app.js ./dist/app.bundle.js -p //打包出来的文件被压缩处理
```
``` bash
webpack ./src/app.js ./dist/app.bundle.js -p --watch //打包出来的文件被压缩处理,并且实时监听文件的变化
```
这时候就可以看到dist目录下会生成一个app.bundle.js文件，呃，如果每次都这样打包，那这样还有什么乐趣可言。

接下来在根目录创建webpack.config.js
``` javascript
module.exports = {
  entry: './src/app.js',
  output: {
    filename: './dist/app.bundle.js'
  }
}
```
接下来在终端输入：
``` bash
webpack
```
就这么简单就可以进行项目打包。
修改package.json文件如下所示：
``` json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack -d --watch"  //这条是添加的
}
```
这时候我们只用在终端输入
``` bash
npm run dev
```
就可以实时监听项目并且打包了！
当然开发时候是这样，实际项目打包我们还需要如下：
``` json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack -d --watch",
  "prod": "webpack -p"
},
```

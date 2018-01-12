
# 从零开始开发一个简易的类vue-cli构建工具

``` bash

在根目录按照依赖
$ yarn install or npm install

```

### Series1

将main1.js/main2.js/main.css进行打包构建

```javascript
// webpack.config.js
module.exports = {
    entry: {
        bundle1: './main1.js',
        bundle2: './main2.js'
    },
    output: {
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    }
}
```

```bash
$ cd Series1
$ webpack
```
### Series2

1.使用webpack的loader编译less以及css文件（如需打包image，vue文件则加载相应的loader即可）

2.将所有的资源打包构建到一个文件：bundle.js中


```javascript
// webpack.config.js
let path = require('path')
let webpack = require('webpack');


module.exports = {
    entry: './src/entry.js',
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    devServer: {
        contentBase: path.join(__dirname, "./"),
        hot: true,
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    }
}
```

```bash
$ cd Series2
$ webpack
```
### Series3

1.使用webpack-dev-server在线浏览效果

2.使用HtmlWebpackPlugin及HotModuleReplacementPlugin实现热重载功能


```javascript
// webpack.config.js
let path = require('path')
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/entry.js',
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        hot: true,
        compress: true,
        publicPath: '/'
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热加载
        new HtmlWebpackPlugin(),
    ]
}
```

```bash
$ cd Series3
$ webpack-dev-server
```
### Series4

1.使用webpack-merge分别设置webpack的dev及prod模式

2.在prod模式中利用CommonsChunkPlugin将第三方类库分开打包，使用UglifyJsPlugin将代码压缩


```javascript
// webpack.base.config.js
let path = require('path')

module.exports = {
    entry: './src/main.js',
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    }
}
```

```javascript
// webpack.dev.config.js
let path = require('path')
let webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {

    devServer: {
        hot: true,
        compress: true,
        publicPath: '/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热加载
        new HtmlWebpackPlugin(),
    ]
})
```

```javascript
// webpack.build.config.js
let path = require('path')
let webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: path.join('static', 'js/[name].[chunkhash].js'),
        chunkFilename: path.join('static', 'js/[id].[chunkhash].js')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false,
            parallel: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'ventor',
            minChunks: Infinity
        }),
    ]
})
```

```bash
$ cd Series4
dev:
$ webpack-dev-server --inline --config webpack.dev.config.js
prod:
$ webpack --config webpack.build.config.js
```


### Series4

1.引用vue-loader将vue文件进行编译

2.设置resolve以支持template选项

```bash
$ cd Series4
dev:
$ webpack-dev-server --inline --config webpack.dev.config.js
prod:
$ webpack --config webpack.build.config.js
```


## 未完成

1.设置vue文件中样式的编译，通过阅读vue-loader的文档得知可以通过设置其loader解决此问题
2.prod模式构建文件的优化，例如引用productionGzip、bundleAnalyzerReport等插件，因为时间有限，暂时不一一去研究了，可以通过比对vue-cli文档了解详情
3.目录优化，可以将一些设置丢到config文件中去，再在文档中加以区分
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
        new HtmlWebpackPlugin()
    ]
})
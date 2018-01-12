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
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
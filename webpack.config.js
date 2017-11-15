/* webpack.config.js */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); 
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
module.exports = {
    entry: './src/js/entry.js',
    output: {
        path: BUILD_PATH,
        filename: 'index.js'
    },
    module: {
        loaders: [
            {//抽取css
                test: /\.css$/,
                loaders: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
            },
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new ExtractTextPlugin('index.css')
    ]
}
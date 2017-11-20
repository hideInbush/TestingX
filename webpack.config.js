/* webpack.config.js */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var JS_PATH = path.resolve(SRC_PATH, 'js');
var JSX_PATH = path.resolve(SRC_PATH, 'jsx');
var VIEW_PATH = path.resolve(SRC_PATH, 'views');
var TEMPLATE_PATH = path.resolve(SRC_PATH, 'template');

module.exports = {
    entry: {
        index: path.resolve(VIEW_PATH, 'index.js'),
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        loaders: [
            {//支持babel
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015','react']
                }
            },
            {//抽取css
                test: /\.css$/,
                loaders: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" })
            },
            /*{//支持处理图片
                test: /\.(png|jpg)$/,
                use: 'url-loader?limit=1&name=[name].[ext]&outputPath=img/',
            }*/
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            title: 'TestingX',
            filename: 'index.html',
            template: path.resolve(TEMPLATE_PATH, 'index.html'),
        }),
    ]
}
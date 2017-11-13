/* webpack.config.js */
module.exports = {
    entry: './src/js/entry.js',
    output: {
        path: './out',
        publicPath: './out',
        filename: 'index.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.(jpg|png|gif|svg)$/, loader: 'url?limit=8192'}
        ]
    }
}
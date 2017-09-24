var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: './src/App.js',
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].bundle.js' //synamic name from entry...
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader'],
                    publicPath: '/public'
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.pug$/,
                use: ['raw-loader','pug-html-loader'],
            }
        ]
    },
    devServer: {
        contentBase: __dirname + '/public',
        compress: true,
        port: 3000,
        stats: 'errors-only',
        open: true // opens automatically browser
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Basic Server Pug',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: 'src/index.pug'
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true,
        })
    ],
}

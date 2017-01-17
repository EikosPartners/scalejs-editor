const path = require('path');
const webpack = require('webpack');
module.exports = {
    context: path.join(__dirname, 'public'),
    entry: {
        app: path.resolve(__dirname, 'public/src/app/app.js'),
        appOutput: path.resolve(__dirname, 'public/src/appOutput/appOutput.js')
    },
    resolve: {
        root: [__dirname, path.join(__dirname, 'public/src/')],
        alias: {
            // scalejs
            'scalejs.application': path.join(__dirname, 'node_modules/scalejs/dist/scalejs.application.js'),
            'scalejs.core': path.join(__dirname, 'node_modules/scalejs/dist/scalejs.core.js'),
            'scalejs.sandbox': path.join(__dirname, 'node_modules/scalejs/dist/scalejs.sandbox.js'),

            // extensions
        }
    },
    output: {
        path: __dirname,
        publicPath: '/build/',
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: 'public'
    },
    module: {
        preLoaders: [
            {
                test: [
                    path.join(__dirname, 'node_modules/scalejs')
                ],
                loader: 'source-map-loader'
            }
        ],
        loaders: [
            {
                loader: 'babel-loader',
                test: [
                    path.join(__dirname, 'public/src')
                ],
                exclude: /\.html?$/,
                query: {
                  presets: 'es2015',
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader',
            },
            {
                test: /\.woff|\.woff2|\.svg|.eot|\.png|\.jpg|\.ttf/,
                loader: 'url-loader?prefix=font/&limit=10000'
            }
        ]
    },
    watch: true,
    // Create Sourcemaps for the bundle
    devtool: 'source-map'
};

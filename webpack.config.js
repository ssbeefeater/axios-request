const path = require('path');
const webpack = require('webpack');

const isProd = process.argv.includes('--mode=production');

const config = ({
    context: path.join(__dirname, '/src'),
    entry: [
        './axios-request.js',
    ],
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: `axios-request${isProd ? '.min' : ''}.js`,
        library: 'axios-request',
        libraryTarget: 'umd',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
});

if (isProd) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false,
        },
        sourceMap: true,
    }));
}

module.exports = config;

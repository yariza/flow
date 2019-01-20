const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin([
            'index.html',
            { from: 'lfjs/liquidfun.js', to: path.resolve(__dirname, './dist/lfjs/') },
            { from: 'lfjs/testbed', to: path.resolve(__dirname, './dist/lfjs/testbed/') }
        ])
    ]
});

/**
 * Created with comment
 * @author: 武扬/956826374@qq.com
 * @time: 2018/12/16 22:50
 */
const path = require('path');
module.exports = {
    mode: 'production',
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: [ "@babel/preset-env"],
                plugins: [
                    "@babel/plugin-transform-runtime",
                    "@babel/plugin-syntax-dynamic-import",
                    "@babel/plugin-syntax-import-meta",
                    ["@babel/plugin-proposal-class-properties", { "loose": false }],
                    "@babel/plugin-proposal-json-strings"

                ]
            }
        }]
    },
}
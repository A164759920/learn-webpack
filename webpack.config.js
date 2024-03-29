const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:5].bundle.js',
    },
    mode: 'development', // production
    // 配置loader
    module: {
        rules: [
            {
                test: /\.vue$/, // 正则表达式
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@vue/babel-preset-app']
                        ],
                    }
                }
            }
        ]
    },
    // 配置插件
    plugins: [
        new VueLoaderPlugin(),
        new WebpackBar(),
        new HtmlWebpackPlugin({
            title: 'Name From HtmlWebpack',
            filename: path.join(__dirname, 'dist/index.html'),
            template: path.join(__dirname, 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:5].chunk.css'
        }),
        new CleanWebpackPlugin(),
    ]
}
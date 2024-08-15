const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './sources/quiz.js', // 入口文件
    output: {
        filename: 'bundle.js', // 输出文件名
        path: path.resolve(__dirname, 'dist') // 输出路径
    },
    mode: 'development', // 开发模式
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify('http://localhost:5000')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'sources'),
        compress: true,
        port: 9000
    }
};
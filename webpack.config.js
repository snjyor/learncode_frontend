const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const { merge } = require('webpack-merge');

// 加载环境变量
const env = dotenv.config().parsed;
console.log('env:', env);
// 将环境变量转换为Webpack可以使用的格式
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

const commonConfig = {
    entry: './sources/js/projectExercises.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin(envKeys)
    ]
};

const developmentConfig = {
    mode: 'development',
    devtool: 'source-map'
};

const productionConfig = {
    mode: 'production'
};

module.exports = (env, argv) => {
    switch (argv.mode) {
        case 'development':
            return merge(commonConfig, developmentConfig);
        case 'production':
            return merge(commonConfig, productionConfig);
        default:
            throw new Error('No matching configuration was found!');
    }
};


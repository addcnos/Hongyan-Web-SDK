const { resolve } = require('path')

const { NODE_ENV } = process.env

const development = NODE_ENV !== 'production'

module.exports = {
    mode: development ? 'development' : 'production',
    entry: './src/index.ts',
    devtool: development ? 'inline-source-map' : false,
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'im.js',
        library: {
            name: 'addcnWebImSdk',
            type: 'umd',
            export: 'default',
        },
        clean: true,
    },
    module: {
        rules: [{
            test: /\.(t|j)s$/,
            include: resolve(__dirname, 'src'),
            use: [{
                loader: 'babel-loader'
            }]
        }]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
}
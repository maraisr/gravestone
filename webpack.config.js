var webpack = require('webpack');

module.exports = {
    entry: [
        './app/entry.ts'
    ],
    output: {
        path: './dist/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.pug']
    },
    module: {
        loaders: [
            { test: /\.ts?$/, loader: 'ts' },
            { test: /\.pug?$/, loader: 'pug-html', exclude: /(app\/pages)/}
        ]
    },
    plugins: (function () {
        var returns = [];

        if (process.env.NODE_ENV == 'production') {
            returns.push(new webpack.optimize.UglifyJsPlugin());
        }

        return returns;
    })()
}

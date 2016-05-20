var webpack = require('webpack');

module.exports = {
    entry: [
        './src/app/entry.ts'
    ],
    output: {
        path: './dist/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.pug', '.json']
    },
    module: {
        loaders: [
            { test: /\.ts?$/, loader: 'ts' },
			{ test: /\.json?$/, loader: 'json' },
            { test: /\.pug?$/, loader: 'pug-html', exclude: /(src\/public)/ }
        ]
    },
    plugins: (function () {
        var returns = [
			new webpack.DefinePlugin({
				__DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV != 'production')))
			})
		];

        if (process.env.NODE_ENV == 'production') {
            returns.push(new webpack.optimize.UglifyJsPlugin());
        }

        return returns;
    })()
}

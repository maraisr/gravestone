module.exports = {
    entry: {
        main: './app/entry.ts'
    },
    output: {
        path: './dist/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader'
            }
        ]
    }
}

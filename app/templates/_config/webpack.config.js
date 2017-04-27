module.exports = {
    entry: "./_assets/js/main.js",
    output: {
        path: 'assets/js',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};

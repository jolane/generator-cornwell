const path = require('path');


module.exports = {
    entry: "./_assets/js/main.js",
    output: {
        path: __dirname + '/assets/js',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
};

const webpack = require("webpack");
const webpackMerge = require("webpack-merge");

const commonConfig = require("./webpack.config.base");

const BABEL_QUERY = {
    plugins: [
        ["transform-es2015-spread"],
        ["transform-class-properties"],
        ["transform-es2015-classes"]
    ]
};

module.exports = webpackMerge(commonConfig(BABEL_QUERY), {
    debug: true,
    devtool: "cheap-module-source-map",
    noInfo: true,
    entry: [
        "babel-polyfill",
        "./src/index"
    ],
    output: {
        path: __dirname + "/public",
        publicPath: "/",
        filename: "bundle.js"
    },
    target: "web",
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});
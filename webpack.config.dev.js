import webpack              from "webpack";
import commonConfig         from "./webpack.config.base";
import webpackMerge         from "webpack-merge";

const BABEL_QUERY = {
    plugins: [
        ["transform-es2015-spread"],
        ["transform-class-properties"],
        ["transform-es2015-classes"],
        [
            "react-transform",
            {
                transforms: [
                    {
                        transform: "react-transform-hmr",
                        imports: ["react"],
                        locals: ["module"]
                    }
                ]
            }
        ]
    ]
};

export default webpackMerge(commonConfig(BABEL_QUERY), {
    debug: true,
    devtool: "source-map",
    noInfo: false,
    entry: [
        "react-hot-loader/patch",
        "babel-polyfill",
        "webpack-hot-middleware/client?reload=true",
        "./src/index"
    ],
    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "bundle.js"
    },
    target: "web",
    devServer: {
        contentBase: "./src"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
});
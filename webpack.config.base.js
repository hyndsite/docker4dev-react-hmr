const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const sassLoaders = [
    "css?sourceMap",
    "postcss-loader",
    "sass?sourceMap"
];



module.exports = function(babelQuery) {
    return {
        target: "web",
        plugins: [
            new ExtractTextPlugin("styles.css")
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    include: [path.join(__dirname, "shared"), path.join(__dirname, "src")],
                    loader: "babel",
                    exclude: /node_modules/,
                    query: babelQuery,
                },
                {
                    test: /(\.css)$/,
                    loaders: ["style", "css"]
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract("style-loader", sassLoaders.join("!")),
                    include: [path.join(__dirname, "shared/assets/styles")]
                },
                {
                    test: /\.(png|jpe?g|gif)(\?\S*)?$/,
                    loader: "url?limit=100000&name=[name].[ext]"
                },
                {
                    test: /\.(eot)(\?\S*)?$/,
                    loader: "url?limit=100000&mimetype=application/font-otf&name=[name].[ext]"
                },
                {
                    test: /\.(woff|woff2)(\?\S*)?$/,
                    loader: "url?limit=100000&mimetype=application/x-font-woff&name=[name].[ext]"
                },
                {
                    test: /\.(ttf)(\?\S*)?$/,
                    loader: "url?limit=100000&mimetype=application/octet-stream&name=[name].[ext]"
                },
                {
                    test: /\.(svg)(\?\S*)?$/,
                    loader: "url?limit=100000&mimetype=image/svg+xml&name=[name].[ext]"
                }
            ]
        },
        postcss: function () {
            return [autoprefixer({
                browsers: ["last 3 versions"]
            })];
        }
    };
};

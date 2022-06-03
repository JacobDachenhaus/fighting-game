const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/main",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[contenthash].js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devtool: "inline-source-map",
    target: "web",
    devServer: {
        static: path.join(__dirname, "build")
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    optimization: {
        moduleIds: 'deterministic',
        splitChunks: {
            // Extract third-party libraries to a separate vendor chunk as they
            // are less likely to change than our local source code
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};
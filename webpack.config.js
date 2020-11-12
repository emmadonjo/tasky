const path = require("path");

module.exports = {
    entry: {
        main: "./src/js/tasky.js",
    },
    output:  {
        filename: "tasky.bundle.js",
        path: path.resolve(__dirname, "./public_html/assets/js"),
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: [
                    "style-loader",
                    "css-loader"
                ],
            },
            {
                test: /\.(woff2|woff|ttf|eot|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: "webfonts/",
                        }
                    }
                ],
            },
            {
                test: /\.html$/i,
                use: "html-loader"
            }
        ]
    },
};
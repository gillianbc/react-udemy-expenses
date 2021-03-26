const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        loader: "source-map-loader",
        test: /\.js$/,
      },
    ],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    publicPath: "/dist/",
  },
});

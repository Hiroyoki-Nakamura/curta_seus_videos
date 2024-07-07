const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      axios: "axios",
    },
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "src"),
    },
    compress: true,
    port: 8080,
    hot: true,
    liveReload: true,
    devMiddleware: {
      publicPath: "/dist/",
    },
  },
  devtool: "source-map",
};

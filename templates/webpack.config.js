const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // Webpack 5 的新特性，自动清理 dist 目录
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "dist"), // Webpack 5 中将 contentBase 替换为 static
    compress: true,
    port: 9000,
  },
  mode: "development", // 明确指定模式
};

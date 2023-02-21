var path = require("path");
var TerserPlugin = require("terser-webpack-plugin");

var common = {
  mode: "production",
  entry: "./index.tsx",
  externals: ["react"],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};

module.exports = [
  {
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
      library: {
        type: "commonjs",
      },
    },
    ...common,
  },

  {
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      libraryTarget: "umd",
    },
    ...common,
  },
  {
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, "dist/esm"),
      filename: "index.esm.js",
      libraryTarget: "module",
    },
    ...common,
  },
  {
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.min.js",
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({ parallel: true })],
    },
    ...common,
  },
];

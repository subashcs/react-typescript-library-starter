const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const webpack = require("webpack");

const plugins = function () {
  return [
    new CopyPlugin({
      patterns: [
        {
          from: "public/",
          to: "./",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/index.html"],
          },
        },
        {
          from: "assets",
          to: "assets",
        },
      ],
    }),
  ];
};

var common_config = {
  entry: "./index.tsx",
  devtool: "inline-source-map",

  devServer: {
    static: "./build",
  },
 
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

var prod_config = {
  ...common_config,
  mode: "production",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: "public/index.html",
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
      )
    ),
    ...plugins(),
  ],
};

var dev_config = {
  ...common_config,
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: "public/index.html",
        }
      )
    ),
    ...plugins(),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    return dev_config;
  }

  if (argv.mode === "production") {
    return prod_config;
  }
};

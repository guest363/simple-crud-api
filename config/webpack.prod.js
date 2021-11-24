"use strict";
import path from "path";
import webpack from "webpack";

const __dirname = path.resolve(path.dirname(""));

export default {
  cache: false,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    charset: true,
    module: true,
    filename: "bundle.js",
  },
  target: 'node16.13',
  mode: "production",
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: [".js"],
    fallback: {
      fs: false,
      path: false,
      os: false,
      http: false,
    },
  },

  /*  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
  }, */
  plugins: [new webpack.ProgressPlugin()],
};

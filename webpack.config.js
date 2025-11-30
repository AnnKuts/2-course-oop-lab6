const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = [
  {
    mode: "development",
    entry: {
      lab6_main: "./lab6/main.ts",
      object2_main: "./object2/main.ts",
      object3_main: "./object3/main.ts",
    },
    target: "electron-main",
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: { extensions: [".ts", ".js"] },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
  },

  {
    mode: "development",
    entry: {
      lab6_preload: "./lab6/preload.ts",
      object2_preload: "./object2/preload.ts",
      object3_preload: "./object3/preload.ts",
    },
    target: "electron-preload",
    externals: [nodeExternals()],
    module: {
      rules: [{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ }],
    },
    resolve: { extensions: [".ts", ".js"] },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
  },

  {
    mode: "development",
    entry: {
      lab6_renderer: "./lab6/renderer.ts",
      object2_renderer: "./object2/renderer.ts",
      object3_renderer: "./object3/renderer.ts",
    },
    target: "electron-renderer",
    module: {
      rules: [{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ }],
    },
    resolve: { extensions: [".ts", ".js"] },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
  },
];

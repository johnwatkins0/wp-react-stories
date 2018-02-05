import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

import packageJson from "./package.json";

const main = () => {
  const entry = {
    [packageJson.name]: ["./demo/src/index.js"]
  };
  const filename = `[name].js`;

  return {
    entry,
    output: {
      filename,
      path: path.resolve(__dirname, "demo")
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, "demo/index.html"),
        template: "demo/src/index.html"
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["react", "env", "stage-0"],
              plugins: [
                [
                  "transform-runtime",
                  {
                    helpers: false,
                    polyfill: false,
                    regenerator: true
                  }
                ]
              ]
            }
          }
        }
      ]
    },
    devServer: {
      open: true,
      openPage: "wp-react-stories/",
      publicPath: "/wp-react-stories/"
    },
    devtool: "source-maps"
  };
};

export default main;

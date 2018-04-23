/* eslint import/no-extraneous-dependencies: 0 */
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import packageJson from '../package.json';

const main = () => {
  const entry = {
    [packageJson.name]: path.resolve(__dirname, '../demo/src/index.js'),
  };

  const filename = '[name].js';

  return {
    entry,
    output: {
      filename,
      path: path.resolve(__dirname, '../demo'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../demo/index.html'),
        template: path.resolve(__dirname, '../demo/src/index.html'),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
        },
      ],
    },
    devServer: {
      open: true,
      openPage: 'wp-react-stories/',
      publicPath: '/wp-react-stories/',
    },
    devtool: 'source-maps',
  };
};

export default main;

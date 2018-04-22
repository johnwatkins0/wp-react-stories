import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import packageJson from './package.json';

const main = () => {
  const PROD = process.argv.includes('-p');
  const min = PROD ? '.min' : '';
  const entry = {
    [packageJson.name]: ['./demo/src/index.js'],
  };
  const filename = `${packageJson.name}${min}.js`;

  return {
    entry,
    output: {
      filename,
      path: path.resolve(__dirname, PROD ? 'dist' : 'demo'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, 'demo/index.html'),
        template: 'demo/src/index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
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

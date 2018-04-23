/* eslint import/no-extraneous-dependencies: 0 */
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import packageJson from '../package.json';

const main = () => {
  const PROD = process.argv.includes('-p');
  const WATCHING = process.argv.includes('-w');
  const min = PROD ? '.min' : '';
  const entry = {
    [packageJson.name]: path.resolve(__dirname, '../src/index.js'),
    [`${packageJson.name}-editor`]: path.resolve(__dirname, '../src/editor/index.js'),
  };

  const plugins = [];

  if (!WATCHING) {
    plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
  }

  const filename = `[name]${min}.js`;

  return {
    entry,
    output: {
      filename,
      path: path.resolve(__dirname, '../dist'),
    },
    plugins,
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
    devtool: 'source-maps',
  };
};

export default main;

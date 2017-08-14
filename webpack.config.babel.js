import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import packageJson from './package.json';

const main = () => {
  const PROD = process.argv.includes('-p');
  const watching = process.argv.includes('--watch');
  const min = PROD ? '.min' : '';
  const entry = './src/index.build.js';
  const filename = `${packageJson.name}${min}.js`;
  const plugins = [new ExtractTextPlugin(`${packageJson.name}${min}.css`)];

  if (PROD) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false,
        },
      })
    );
  }

  if (!watching) {
    plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
  }

  return {
    entry,
    output: {
      filename,
      path: path.resolve(__dirname, 'dist'),
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: { presets: ['react', 'es2015', 'stage-1'] },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]',
                },
              },
              { loader: 'postcss-loader' },
              { loader: 'sass-loader' },
            ],
          }),
        },
      ],
    },
    externals: {
      'prop-types': 'PropTypes',
      'react': 'React',
      'react-dom': 'ReactDOM',
      'date-fns': 'dateFns',
      'lodash': '_',
    },
    target: 'web',
    devtool: PROD ? false : 'source-maps',
  };
};

export default main;

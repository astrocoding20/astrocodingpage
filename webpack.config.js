const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  // The entry file for the bundle
  entry: path.join(__dirname, 'src/index.js'),

  // The bundle file we will get in the result
  output: {
    path: path.join(__dirname, 'src/static/js'),
    filename: 'app.js',
  },

  module: {
    // Apply loaders to files that meet given conditions
    rules: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          query: {
            presets: [
              '@babel/preset-react',
              ['@babel/preset-env', { useBuiltIns: 'entry' }]
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              // Stage-1
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-logical-assignment-operators',
              ['@babel/plugin-proposal-optional-chaining', { loose: false }],
              ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
              ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
              '@babel/plugin-proposal-do-expressions'
            ]
          },
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '../img',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },

  // Set max file size for performance check
  performance: {
    maxEntrypointSize: 2500000,
    maxAssetSize: 2500000
  },

  mode: 'development',

  // Make minified version of the bundle file
  /*plugins: [
    new TerserPlugin({
      parallel: true,
      sourceMap: false,
      terserOptions: {
        warnings: false,
        compress: {
          dead_code: true,
          toplevel: true,
        },
        mangle: true,
        output: {
          comments: false,
          beautify: false
        }
      },
    })
  ],*/

  // Start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};
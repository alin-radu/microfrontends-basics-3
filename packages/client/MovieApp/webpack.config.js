// MovieApp
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const { ModuleFederationPlugin } = require('webpack').container;
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// loaders
const postCssLoader = {
  loader: 'postcss-loader',
};

const cssLoader = {
  loader: 'css-loader',
};

const sassLoader = {
  loader: 'sass-loader',
};

const styleLoader = MiniCssExtractPlugin.loader;

const cssLoaders = {
  test: /\.(css)$/i,
  use: [styleLoader, cssLoader, postCssLoader],
};

const sassLoaders = {
  test: /.s[ac]ss$/i,
  use: [styleLoader, cssLoader, postCssLoader, sassLoader],
};

const babelLoader = {
  test: /\.(js|jsx)$/,
  include: path.resolve(__dirname, 'src'),
  exclude: path.resolve(__dirname, 'node_modules'),
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: 'defaults',
            },
          ],
          '@babel/preset-react',
        ],
      },
    },
  ],
};

// plugins
const htmlWebpackPluginInstances = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
  }),
];

const miniCssExtractPluginInstance = new MiniCssExtractPlugin();

// const moduleFederationPluginInstance = new ModuleFederationPlugin({
//   name: 'components',
//   filename: 'remoteEntry.js',
//   exposes: {
//   },
// });

// configObj
const devServerConfig = {
  static: {
    directory: path.resolve(__dirname, 'dist'),
  },
  open: true,
  port: 9000,
};

// main configObj
const configObj = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: devServerConfig,
  devtool: 'eval-source-map',
  plugins: [...htmlWebpackPluginInstances, miniCssExtractPluginInstance],
  module: {
    rules: [babelLoader, cssLoaders, sassLoaders],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

module.exports = configObj;
const webpack = require('webpack');
const path = require('path');

const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { CommonsChunkPlugin } = require('webpack').optimize;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const entryPoints = ['manifest', 'polyfills', 'vendor', 'main'];
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    main: [
      require.resolve('./src/polyfills'),
      './src/index.jsx',
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    sourceMapFilename: '[name].[chunkhash].map',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: ['eslint-loader'],
        exclude: /node_modules/, 
        enforce: 'pre',
      }, {
        test: /.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            forceEnv: 'production',
          },
        }],
        exclude: /node_modules/, 
      }, {
        test: /.html$/,
        use: ['html-loader'],
      }, {
        test: /.(s?)css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:8]',
            },
          }, 'sass-loader'],
        }),
      }, {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
    ],
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ManifestPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      minRatio: 0.8,
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
      chunks: 'main',
    }),
    new CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    //new HtmlWebpackPlugin({
      //template: './src/index.html',
      //inject: 'body',
      //chunksSortMode(left, right) {
        //const leftIndex = entryPoints.indexOf(left.names[0]);
        //const rightIndex = entryPoints.indexOf(right.names[0]);
        //if (leftIndex > rightIndex) {
          //return 1;
        //}
        //if (leftIndex < rightIndex) {
          //return -1;
        //}
        //return 0;
      //}
    //}),
    new ProgressPlugin(),
  ]
};


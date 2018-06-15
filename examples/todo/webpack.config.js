const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './index.js'
  },
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'angular-react': path.resolve(__dirname, '../../')
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'raw-loader'
        // use: {
        //   loader: 'raw-loader',
        // }
      },
      {
        test: /.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react']
          }

        }
        // query: {
        //   presets: ['es2015', 'stage-0', 'react']
        // }
      },
    ]
  },
  plugins: [
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('./dist/library.json')
    // }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'index.html')
    })
  ]
}

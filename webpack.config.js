const path = require('path');

module.exports = {
  entry: '/src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',  
            options: {
              sourceMap: true,
            },
          }, 
          {
          loader: 'sass-loader',  
          options: {
            sourceMap: true,
          },
        }
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, ''),
    },
    compress: true,
    port: 8080,
    hot: true,
    liveReload: true,  
    devMiddleware: {
        publicPath: '/dist/',
      },
  },
  devtool: 'source-map',
};

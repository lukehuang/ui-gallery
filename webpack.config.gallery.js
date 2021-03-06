const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const transformObjectRestSpread = require('babel-plugin-transform-object-rest-spread');

const extractGallerySass = new ExtractTextPlugin({ filename: 'gallery.css' });
const extractNXStylesSass = new ExtractTextPlugin({ filename: 'nx-styles.css' });
const extractLibrarySass = new ExtractTextPlugin({ filename: 'lib.css' });
const publicPath = '/assets/';

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: './main.js',
  output: {
    publicPath,
    filename: 'app-bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules|src[\/\\]main[\/\\]frontend[\/\\]lib[\/\\](protovis|Base64)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: [transformObjectRestSpread]
        }
      }
    }, {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
        options: {
          attrs: false
        }
      }
    }, {
      test: /\.s?css$/,
      include: [
        path.resolve(__dirname, 'app/scss/')
      ],
      use: extractGallerySass.extract({
        use: [
          { loader: 'css-loader' },
          { loader: 'resolve-url-loader' },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      })
    }, {
      test: /\.s?css$/,
      include: [
        path.resolve(__dirname, 'example-scss/')
      ],
      use: extractNXStylesSass.extract({
        use: [
          { loader: 'css-loader' },
          { loader: 'resolve-url-loader' },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      })
    }, {
      test: /\.s?css$/,
      include: [
        path.resolve(__dirname, 'node_modules/')
      ],
      use: extractLibrarySass.extract({
        use: [
          { loader: 'css-loader' },
          { loader: 'resolve-url-loader' },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      })
    }, {
      test: /\.(png|jpg|jpeg|gif)/,
      loader: 'file-loader',
      options: {
        name: 'images/[name].[ext]'
      }
    }, {
      test: /\.(ttf|eot|woff2?|svg)$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]'
      }
    }]
  },
  plugins: [
    extractGallerySass,
    extractNXStylesSass,
    extractLibrarySass
    // new CSSSplitPlugin({
    //   size: 4095,
    //   filename: '[name]-[part].[ext]'
    // })
  ],
  devtool: 'eval',
  devServer: {
    // contentBase: ['src/main/component-gallery', 'src/main/frontend', 'target/classes/assets', '.tmp/scss']
    //     .map(subpath => path.join(__dirname, subpath)),
    publicPath,
    port: 4041,
    host: '0.0.0.0'
  }
};

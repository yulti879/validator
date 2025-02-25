const path = require('node:path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const LicensePlugin = require('webpack-license-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new LicensePlugin({
      outputFilename: 'licenses.txt',
      additionalFiles: {
        'image-licenses.txt': (packages) => {
          return packages
            .filter(pkg => pkg.licenseText && pkg.name.includes('image'))
            .map(pkg => `Package: ${pkg.name}\nLicense: ${pkg.licenseText}\n\n`)
            .join('');
        }
      }
    })
  ],
};
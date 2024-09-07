const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = (env) => {
  setEnv = () => {
    if (env.development) {
      return (environment = 'development')
    } else if (env.uat) {
      return (environment = 'uat')
    } else if (env.qa) {
      return (environment = 'qa')
    } else {
      return (environment = 'production')
    }
  }

  setEnv()

  return {
    entry: './src/index.tsx',
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      symlinks: false,
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          include: path.join(__dirname, 'src'),
          use: ['babel-loader'],
        },
        {
          test: /\.svg$/,
          include: path.join(__dirname, 'src'),
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new Dotenv({
        defaults: true,
        path: `.env.${environment}`,
        // path: path.resolve(__dirname, './',  )
        systemvars: true,
      }),
      // new BundleAnalyzerPlugin(),
      new ForkTsCheckerWebpackPlugin(),
    ],
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.bundle.js',
      clean: true,
    },
  }
}

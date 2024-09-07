const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    allowedHosts: 'all',
    static: path.join(__dirname, 'public'),
    port: 80,
    historyApiFallback: true,
  },
}

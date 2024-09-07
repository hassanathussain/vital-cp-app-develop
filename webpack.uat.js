const path = require('path')

module.exports = {
  mode: 'uat',
  devtool: 'inline-source-map',
  devServer: {
    allowedHosts: 'all',
    static: path.join(__dirname, 'src'),
    port: 80,
    historyApiFallback: true,
  },
}

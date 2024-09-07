const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')

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

  const config = require(`./webpack.${environment}`)

  return merge(commonConfig(env), config)
}

const merge = require('lodash/merge')

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    basename: process.env.PUBLIC_URL,
    isBrowser: typeof window !== 'undefined',  
  },
  development: {
    apiUrl: process.env.REACT_APP_API_URL,
  },
  production: {
    apiUrl: process.env.REACT_APP_API_URL,
  },
}
module.exports = merge(config.all, config[config.all.env])

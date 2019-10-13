const fs = require('fs')

let cachedConfig = null
if (!cachedConfig) {
    const env = process.env.NODE_ENV || 'development'
    const configPath = __dirname + '/' + env + '.json'
    cachedConfig = JSON.parse(fs.readFileSync(configPath))
}

module.exports = cachedConfig
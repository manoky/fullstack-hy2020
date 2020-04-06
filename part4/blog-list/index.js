const app = require('./app')
const http = require('http')
const confing = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)
server.listen(confing.PORT, () => {
  logger.info(`Server is running on port ${confing.PORT}`)
})
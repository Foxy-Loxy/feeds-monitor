import fs, { WatchEventType } from 'fs'
import redis from 'redis'
import path from 'path'
import { promisify } from 'util'
import logger from './logger'
import { appConfig } from './configs/appConfig'

const client = redis.createClient()
const setExAsync = promisify(client.setex).bind(client)
logger.info(`Waiting for changes in: "${appConfig.watchingDirectory}"`)
fs.watch(appConfig.watchingDirectory, async (event: WatchEventType, filename: string) => {
  if (filename) {
    if (event === 'change') {
      const parsedFilename = path.parse(filename)
      const id = parseInt(parsedFilename.name, 10)
      logger.info(`Event for ${id} has been found`)
      if (parsedFilename.ext.toLowerCase() === '.batch' && appConfig.watchingIds.indexOf(id) >= 0) {
        await setExAsync(
          `feeds-monitor/customer-id/${id.toString()}`,
          60,
          Math.round(Date.now() / 1000).toString()
        )
        logger.info(`Event timestamp has been logged for id=${id}: ${new Date().toISOString()}`)
      }
    }
  }
})

import redis from 'redis'
import { promisify } from 'util'
import logger from './logger'

logger.info(`Started`)
const client = redis.createClient()
const keysAsync = promisify(client.keys).bind(client)
const getAsync = promisify(client.get).bind(client)
const setExAsync = promisify(client.setex).bind(client)
const setAsync = promisify(client.set).bind(client)
const quitAsync = promisify(client.quit).bind(client)

async function proc(): Promise<void> {
  // @ts-ignore
  let keys: string[] | undefined
  try {
    keys = await keysAsync('feeds-monitor/customer-id/*')
  } catch (e: any) {
    logger.error(`Cannot get keys: ${e.message}`)
    await quitAsync()
    return
  }
  logger.info(`Keys received`)
  // console.log(keys)
  let alertLogged: boolean | undefined
  try {
    alertLogged = !!parseInt((await getAsync('feeds-monitor/alert-logged')) || '0', 10)
  } catch (e: any) {
    logger.error(`Cannot get keys: ${e.message}`)
    await quitAsync()
    return
  }
  logger.info(`Status received: status=${alertLogged}`)
  let lastValidNotificationTime = 0
  for (const key of keys) {
    logger.info(`key: ${key}`)
    const current = new Date()
    const invalidBefore = new Date(current.getTime() - 60 * 1000)
    const date = new Date(1000 * parseInt((await getAsync(key)) || '0', 10))
    if (date >= invalidBefore && date <= current) {
      if (Math.round(date.getTime() / 1000) > lastValidNotificationTime)
        lastValidNotificationTime = Math.round(date.getTime() / 1000)
    }
  }
  if (lastValidNotificationTime > 0) {
    if (alertLogged) {
      logger.info('BACK TO NORMAL')
      await setExAsync('feeds-monitor/alert-logged', 1, '0')
    }
  } else if (!alertLogged) {
    logger.warn("WE'VE GOT NO NOTIFICATIONS FROM CUSTOMERS")
    await setAsync('feeds-monitor/alert-logged', '1')
  }
  logger.info('exit')
  // process.exit(0)
  await quitAsync()
}
proc()
  .then((_val): any => {})
  .catch()

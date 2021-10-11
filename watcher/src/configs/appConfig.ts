const logDir = process.env.LOG_DIR || 'logs'

export const logConfig = {
  file: {
    level: process.env.LOG_FILE_LEVEL || 'info',
    dirname: logDir,
    filename: process.env.LOG_FILENAME || 'app-%DATE%.log',
    datePattern: process.env.LOG_DATE_PATTERN || 'YYYY-MM-DD-HH',
    zippedArchive: process.env.LOG_ZIPPED_ARCHIVE === 'true',
    maxsize: +(process.env.LOG_FILE_MAXSIZE || 2097152),
    maxFiles: process.env.LOG_MAX_FILES || '7d',
  },
  cons: {
    level: process.env.LOG_CONSOLE_LEVEL || 'debug',
  },
  exceptionHandler: {
    // filename: path.join(logDir, (process.env.LOG_EXCEPTION_HANDLER_FILENAME || 'exceptions.log')),
    filename: process.env.LOG_EXCEPTION_HANDLER_FILENAME || 'exceptions.log',
  },
}

import expressWinston from "express-winston"
import winston from 'winston';

const errorLogger = expressWinston.errorLogger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  })

export default errorLogger
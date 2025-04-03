import fs from 'fs';
import winston from 'winston';

const fsPromise = fs.promises;


// async function log(logData) {
//     try {
//         logData = `\n ${new Date().toString()} - ${logData}`;
//         await fsPromise.appendFile('log.txt',logData);
//     } catch (err) {
//         console.log(err);
//     }
// }


/*
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};
*/
const logger = winston.createLogger({
    level: 'info',  // means error, warn, info will be accessible (see above level object)
    format: winston.format.json(),
    defaultMeta: { service: 'request-logging' },
    transports: [
      new winston.transports.File({ filename: 'logs.txt'}),
    ],
});

const loggerMiddleware = async (req,res,next) => {
    // 1. Log request body.
    if (!req.url.includes("signin")) {  // not including as it contains personal information
        const logData = `${req.url} - ${JSON.stringify(req.body)}`;
        // await log(logData);  // uncomment this when u are not using winston logger
        logger.info(logData);
    }
    next();
};

export default loggerMiddleware;
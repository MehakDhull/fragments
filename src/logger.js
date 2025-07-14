// const options = { level: process.env.LOG_LEVEL || 'info' };

// if (options.level === 'debug') {
//     console.log('Environment Variables:', process.env);
//   options.transport = {
//     target: 'pino-pretty',
//     options: {
//       colorize: true,
//     },
//   };
// }

// module.exports = require('pino')(options);

// // us-east-1_EEHFcSnH1
// // 7isffc9d0krf4ebvf4bu2uslvs
// src/logger.js
const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        }
      : undefined,
});

module.exports = logger;


const app = require('./app');


require('dotenv').config();
const logger = require('./logger');
console.log('AWS_COGNITO_POOL_ID:', process.env.AWS_COGNITO_POOL_ID);
console.log('AWS_COGNITO_CLIENT_ID:', process.env.AWS_COGNITO_CLIENT_ID);
process.on('uncaughtException', (err, origin) => {
  logger.fatal({ err, origin }, 'uncaughtException');
  throw err;
});

process.on('unhandledRejection', (reason, promise) => {
  logger.fatal({ reason, promise }, 'unhandledRejection');
  throw reason;
});

require('./server');
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

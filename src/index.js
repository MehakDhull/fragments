require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const logger = require('./lib/logger');
const api = require('../src/routes/api');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
const pkg = require('../package.json');

app.use('/v1', api);  

app.get('/health', (req, res) => {
  const healthInfo = {
    status: 'ok',
    version: pkg.version,
    author: pkg.author,
    githubUrl: pkg.repository?.url || '',
  };

  // Print to console
  console.log('Health Check Info:');
  console.log(`URL: ${healthInfo.githubUrl}`);
  console.log(`Version: ${healthInfo.version}`);
  console.log(`Author: ${healthInfo.author}`);

  // Return in response
  res.status(200).json(healthInfo);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  logger.info(`API server listening on http://localhost:${port}`);
});

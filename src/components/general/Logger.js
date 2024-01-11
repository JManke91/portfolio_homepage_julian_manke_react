const bunyan = require('bunyan');
const formatOut = require('bunyan-format')({ outputMode: 'short' });

// Create a logger instance
const logger = bunyan.createLogger({
  name: 'your-app-name', // Replace with your application name
  stream: formatOut,     // Log to the console using the bunyan-format output
  level: 'info',         // Adjust the log level as needed (debug, info, warn, error)
});

module.exports = logger;

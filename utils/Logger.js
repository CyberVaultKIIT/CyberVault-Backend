class Logger {

    // Method to log informational messages (always logs)
    static log(message) {
        console.log(`[+]  [INFO]: ${message}\n`);
    }
    // Method to log debug messages only if debug mode is enabled
    static debug(message) {
        if (process.env.DEBUG_MODE === 'true') {
            console.log(`[+]  [DEBUG]: ${message}\n`);
        }
    }

    // Method to log errors (always logs)
    static error(message) {
        console.error(`[-]  [ERROR]: ${message}\n`);
    }
    // Method to log errors only if debug mode is enabled
    static debugError(message) {
        if (process.env.DEBUG_MODE === 'true') {
            console.error(`[-]  [DEBUG ERROR]: ${message}\n`);
        }
    }
}

module.exports = Logger;


/*
    HOW TO USE ??

    // Import the Logger class
    const Logger = require('<root_directory>/utils/logger');

    // Log a debug message (only logs if DEBUG_MODE is true)
    Logger.debug('This is a debug message.');

    // Log an informational message (always logs)
    Logger.info('This is an informational message.');

    // Log a debug error message (only logs if DEBUG_MODE is true)
    Logger.debugError('This is a debug error message.');

    // Log an error message (always logs)
    Logger.error('This is an error message.');

*/
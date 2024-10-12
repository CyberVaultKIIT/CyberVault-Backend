class Logger {

    // Method to log informational messages (always logs)
    static log(...args) {
        console.log(`[+]  [INFO]:`, ...args, `\n`);
    }

    // Method to log debug messages only if debug mode is enabled
    static debug(...args) {
        if (process.env.DEBUG_MODE === 'true') {
            console.log(`[+]  [DEBUG]:`, ...args, `\n`);
        }
    }

    // Method to log errors (always logs)
    static error(...args) {
        console.error(`[-]  [ERROR]:`, ...args, `\n`);
    }

    // Method to log debug error messages only if debug mode is enabled
    static debugError(...args) {
        if (process.env.DEBUG_MODE === 'true') {
            console.error(`[-]  [DEBUG ERROR]:`, ...args, `\n`);
        }
    }
}

module.exports = Logger;

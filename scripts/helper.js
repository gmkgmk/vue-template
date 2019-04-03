const chalk = require("chalk");

function currentPath() {
    let currentPath = () => {
        return process.cwd();
    };
    return currentPath();
}

function log() {
    const args = Array.from(arguments);
    args[0] = chalk.green(args[0]);
    console.log.apply(console, args);
}

function errorLog() {
    const args = Array.from(arguments);
    args[0] = chalk.red(args[0]);
    console.log.apply(console, args);
}

module.exports = {
    currentPath,
    log,
    errorLog
};

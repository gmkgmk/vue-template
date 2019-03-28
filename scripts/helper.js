const chalk = require("chalk");

/**
 *
 *
 * @date 2019-01-29
 * @export
 * @returns String
 */
function homedir() {
    var env = process.env;
    var home = env.HOME;

    if (process.platform === "win32") {
        return env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null;
    }
    return home || null;
}

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
    homedir,
    log,
    errorLog
};

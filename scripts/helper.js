const { logInfo } = require('./failures');

function currentPath() {
    let currentPath = () => {
        return process.cwd();
    };
    return currentPath();
}

function modifyLog({ path }, error) {
    logInfo(
        {
            type: 'modify',
            path
        },
        error
    );
}

module.exports = {
    currentPath,
    modifyLog
};

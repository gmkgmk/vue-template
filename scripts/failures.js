let failures = [];

function logInfo(action, error) {
    failures.push({
        type: action.type || '',
        path: action.path || '',
        error
    });
}
module.exports = {
    failures,
    logInfo
};

const { entryPoints } = require("../../entrypoints");


module.exports = {
    beforeExecuting: (args) => {
        args = entryPoints.beforeExecuting(args);
        return args;
    },
    onError: (args) => {
        args = entryPoints.onError(args);
        return args;
    },
    onCompleted: () => {
        args = entryPoints.onCompleted(args);
        return args;
    }
};
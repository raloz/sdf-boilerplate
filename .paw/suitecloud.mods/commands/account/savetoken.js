const { removeAccountCredentials } = require("../../modules/credentials");
const { entryPoints } = require("../entrypoints");

module.exports = {
    beforeExecuting: (args) => {
        args = entryPoints.beforeExecuting(args);
        const { authid } = args.arguments;

        //@comments: se elimina la credencial anterior de la instancia que se está autenticando
        removeAccountCredentials(authid)
        return args;
    },
    onError: (args) => {
        args = entryPoints.onError(args);
        return args;
    },
    onCompleted: (args) => {
        args = entryPoints.onCompleted(args);
        return args;
    }
};
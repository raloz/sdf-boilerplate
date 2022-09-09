const { removeAccountCredentials } = require("../../modules/credentials-file");
const { createProjectFile, copyProjectFileAsTemp } = require("../../modules/project-file");
const { entryPoints } = require("../entrypoints");

module.exports = {
    beforeExecuting: (args) => {
        args = entryPoints.beforeExecuting(args);
        const { authid } = args.arguments;

        //@comments: se elimina la credencial anterior de la instancia que se está autenticando
        removeAccountCredentials(authid);
        copyProjectFileAsTemp();
        return args;
    },
    onError: (args) => {
        args = entryPoints.onError(args);
        return args;
    },
    onCompleted: (args) => {
        args = entryPoints.onCompleted(args);
        const { _status, _authId, _accountInfo } = args;
        _status === "SUCCESS" && createProjectFile(_authId, _accountInfo);

        return args;
    }
};
const { colors } = require("../../constants");
const { author, version, defaultAuthId, timestamp } = require("../../config");

module.exports = {
    entryPoints: {
        beforeExecuting: (args) => {
            console.log(colors.highlight, `\n> paw v${version} by ${author}\n> executed at ${timestamp}\n`);
            return args;
        },
        onError: (args) => args,
        onCompleted: (args) => args
    }
};
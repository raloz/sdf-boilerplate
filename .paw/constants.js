const { homedir, tmpdir } = require("os");

module.exports = {
    colors: {
        error: "\x1b[31m%s\x1b[0m",
        warning: "\x1b[33m%s\x1b[0m",
        info: "\x1b[36m%s\x1b[0m",
        highlight: "\x1b[35m%s\x1b[0m",
    },
    homedir: homedir(),
    tmpdir: tmpdir(),
};
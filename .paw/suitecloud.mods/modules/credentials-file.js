const { unlink } = require("fs");
const { join } = require("path");
const { homedir } = require("../../constants");


const credentials = {
    removeAccountCredentials: (authid) => {
        if (!authid) return;
        unlink(join(homedir, ".suitecloud-sdk", authid), (err) => null);
    },
    renameAccountCredentials: (namefile) => {
        
    }
};

module.exports = credentials;

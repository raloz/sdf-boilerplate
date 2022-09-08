const { account } = require("./.suitecloud.mods/commands");

module.exports = {
    defaultProjectFolder: "src",
    commands: {
        "account:savetoken": account.saveToken,
    },
};
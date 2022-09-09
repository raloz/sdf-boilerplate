const { account } = require("./.paw/suitecloud.mods/commands");

module.exports = {
    defaultProjectFolder: "src",
    commands: { "account:savetoken": account.saveToken, },
};
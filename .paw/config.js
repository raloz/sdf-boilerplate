const { readFileSync } = require("fs");
const { colors } = require("./constants");
const { author, name, version } = loadConfigFromFile("package.json");
const { defaultAuthId } = loadConfigFromFile("project.json");

module.exports = {
    author,
    name,
    version,
    defaultAuthId, 
    timestamp: new Date().toLocaleTimeString()
};

function loadConfigFromFile(fileName) {
    try {
        return JSON.parse(readFileSync(fileName), "utf8");
    } catch (e) {
        console.warn(colors.warning, `! ${e.message}`);
        return {};
    }
}
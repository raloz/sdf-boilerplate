const { createInterface } = require("readline");
const { copyFileSync, readFile, writeFileSync } = require("fs");
const { colors, homedir } = require("./constants");
const { join } = require("path");

const __maindir__ = process.cwd();
const { env, platform } = process;
const { NODE_ENV } = env;

//(creates a .env file)
copyFileSync(join(__maindir__, ".paw", "templates", "env.template"), join(__maindir__, ".env"));

//(asking for add the paw's vscode shortcuts)
if (!NODE_ENV && (platform === "darwin" || platform === "linux" || platform === "win32")) {
    const readerInput = createInterface({ input: process.stdin, output: process.stdout });
    readerInput.question("Do you want install the vscode keybindings ? (yes/no) ", function (response) {
        if (response.toLowerCase() === "yes") {
            const keybiding = {
                darwin: `${homedir}/Library/Application\ Support/Code/User/keybindings.json`,
                linux: `${homedir}/.config/Code/User/keybindings.json`,
                win32: `${homedir}\\%APPDATA%\\Code\\User\\keybindings.json`
            };
            readFile(keybiding[platform], "utf-8", (err, data) => {
                if (err) {
                    console.log(colors.error, err.message);
                    return;
                }
                try {
                    data = JSON.parse(data.replace(/\/\/.*/g, "").replaceAll("\n", "").replace(/\s{1,}/g, ""));
                } catch (e) {
                    console.error(colors.error, "Your keybidings it's malformed, can't add paw keybidings :/");
                    return;
                }
                const keybidingFile = [
                    ...data,
                    ...[
                        {
                            "key": "cmd+shift+u",
                            "command": "workbench.action.terminal.sendSequence",
                            "args": { "text": "npm run file:upload \"'${relativeFile}'\"\u000D" }
                        },
                        {
                            "key": "cmd+shift+i",
                            "command": "workbench.action.terminal.sendSequence",
                            "args": { "text": "npm run file:import \"'${relativeFile}'\"\u000D" }
                        }
                    ]
                ];
                writeFileSync(keybiding[platform], JSON.stringify(keybidingFile, null, 4));
            });
        }
        readerInput.close();
    });
}
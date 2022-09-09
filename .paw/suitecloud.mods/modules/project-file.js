const { readFileSync, writeFileSync, copyFileSync } = require("fs");
const { join } = require("path");
const { tmpdir } = require("../../constants");

const project = { 
    rawProjectFileAsString,
    createProjectFile: (authId, accountInfo) => {
        const { defautlAuthId, environments = [] } = rawProjectFileAsString();
        const project = { 
            defautlAuthId: authId,
            environments: [
                ...environments,
                ...[
                    { authId: authId, ...accountInfo }
                ]
            ] 
        };
        writeFileSync("project.json", JSON.stringify(project, null, 4));
    },
    copyProjectFileAsTemp: () => {
        try{
            copyFileSync("project.json", join(tmpdir, "project.json"));
        }catch(e){}
    }
};

module.exports = project;

function rawProjectFileAsString(){
    try {
        return JSON.parse(readFileSync(join(tmpdir, "project.json"), "utf8"));
    } catch (e) {
        return { defautlAuthId: "", environments: [] };
    }
}
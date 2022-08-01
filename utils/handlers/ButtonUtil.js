const {promisify} = require("util");
const {glob} = require("glob");
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/buttons/*/*.js`)).map(async (btnFile) => {
        const btn = require(btnFile);

        if (!btn.name) return Logger.warn(`Command not load: name is not specified in the command.\nFile -> ${btnFile}`)
        
        client.buttons.set(btn.name, btn);
    });
};


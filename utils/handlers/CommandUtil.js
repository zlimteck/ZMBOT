const {promisify} = require("util");
const {glob} = require("glob");
const pGlob = promisify(glob);
const Logger = require("../Logger");
const {ApplicationCommandType} = require('discord.js');

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async (cmdFile) => {
        const cmd = require(cmdFile);

        if (!cmd.name) return Logger.warn(`Command not load: not name.\nFile -> ${cmdFile}`);

        if (!cmd.description && cmd.type != ApplicationCommandType.User) return Logger.warn(`Command not load: not description.\nFile -> ${cmdFile}`);

        if (!cmd.category) return Logger.warn(`Command not load: not category.\nFile -> ${cmdFile}`)

        if (!cmd.permissions) return Logger.warn(`Command not load: not required permissions.\nFile -> ${cmdFile}`)

        if (cmd.ownerOnly == undefined) return Logger.warn(`Command not load: ownerOnly is not specified in the command.\nFile -> ${cmdFile}`)

        if (!cmd.usage) return Logger.warn(`Command not load: usage is not specified in the command.\nFile -> ${cmdFile}`)

        if (!cmd.examples) return Logger.warn(`Command not load: examples is not specified in the command.\nFile -> ${cmdFile}`)

        cmd.permissions.forEach(permission => {
            if (!permissionList.includes(permission)) {
                return Logger.typo(`Command not load in the permission "${permission}"\nFile -> ${cmdFile}`);
            }
        });

        client.commands.set(cmd.name, cmd);
        Logger.command(`Command load: ${cmd.name}`);
    });
};

const permissionList = ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS_AND_STICKERS', 'USE_APPLICATION_COMMANDS', 'REQUEST_TO_SPEAK', 'MANAGE_EVENTS', 'MANAGE_THREADS', 'USE_PUBLIC_THREADS', 'CREATE_PUBLIC_THREADS', 'USE_PRIVATE_THREADS', 'CREATE_PRIVATE_THREADS', 'USE_EXTERNAL_STICKERS', 'SEND_MESSAGES_IN_THREADS', 'START_EMBEDDED_ACTIVITIES', 'MODERATE_MEMBERS'];


const Logger = require("../../utils/Logger");

module.exports = {
    name: "ready",
    once: true,
    async execute(client){
        let guildsCount = await client.guilds.fetch();
        let usersCount = client .guilds.cache.reduce((a, g) => a + g.memberCount, 0);
        Logger.client(`${client.user.username} is connected on ${guildsCount.size} server(s) for ${usersCount} members.`);
        client.user.setPresence({activities: [{name: "to your commands", type: "LISTENING"}], status: "idle"});
        const devGuild = await client.guilds.cache.get("709033934452949104");
        devGuild.commands.set(client.commands.map(cmd => cmd));
        //client.application.commands.set(client.commands.map(cmd => cmd));
    },
};
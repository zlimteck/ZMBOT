module.exports = {
    /* Creating a new guild in the database. */
    name: "guildCreate",
    once: false,
    async execute(client, guild){
        await client.createGuild(guild);
    },
};
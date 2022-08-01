const {EmbedBuilder} = require("discord.js");
const Logger = require("../../utils/Logger");

module.exports = {
    name: "reload",
    category: "moderation",
    description: "Reload the bot witch pm2",
    usage: " reload",
    examples: [" reload"],
    permissions:["ADMINISTRATOR"],
    ownerOnly: true,
    
    /* It's a command. It's used to reload the bot. */
    async runInteraction(client, interaction) {
        //const devGuild = await client.guilds.cache.get("709033934452949104");
        //devGuild.commands.set([]);
        const reloadembed = new EmbedBuilder()
        .setTitle("Reload")
        .setDescription(`${client.user.username} was successfully restarted.`)
        .setTimestamp()
        await interaction.reply({embeds: [reloadembed]})
        return process.exit(),
   
        Logger.command(`/reload command executed on the server ${message.guild.name} in the channel ${message.channel.name} by member ${message.author.username} the ${message.createdAt}`)    
    },
}
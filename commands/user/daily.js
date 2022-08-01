const {EmbedBuilder} = require("discord.js");
const Logger = require("../../utils/Logger");
const {daily} = require("../../db/zcoin");

module.exports = {
    name: "daily",
    category: "user",
    description: "Allows you to recover zcoins every day.",
    usage: " daily",
    examples: [" daily"],
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,
    
    async runInteraction(client, interaction){
        return interaction.reply(await daily(interaction.member)),
        Logger.command(`/daily command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`) 
    },
    
};
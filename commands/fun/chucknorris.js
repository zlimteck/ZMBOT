const {EmbedBuilder} = require("discord.js");
const {get} = require("snekfetch");
const Logger = require("../../utils/Logger");

module.exports = {
    /* The code for the nasa command. */
    
    name: "chucknorris",
    category: "fun",
    description: "The bot displays a joke from Chuck Norris.",
    usage: " chucknorris",
    examples: [" chucknorris"],
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,

    async runInteraction(client, interaction) {
        const {body} = await get("https://api.chucknorris.io/jokes/random")
        const chuckembed = new EmbedBuilder()
        .setTitle("Chuck Norris joke")
        .setColor("#F7BA2A")
        .setThumbnail(body.icon_url)
        .setDescription(body.value)
        .setTimestamp()
        .setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()});
        interaction.reply({embeds: [chuckembed], ephemeral: true})

        Logger.command(`/chucknorris command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    }, 
};
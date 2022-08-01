const {EmbedBuilder} = require("discord.js");
const {get} = require("snekfetch");
const Logger = require("../../utils/Logger");

module.exports = {
    /* The code for the nasa command. */
    
    name: "nasa",
    category: "fun",
    description: "The bot displays the photo of the day from nasa.",
    usage: " nasa",
    examples: [" ping"],
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,

    async runInteraction(client, interaction) {
        const {body} = await get("https://api.nasa.gov/planetary/apod?api_key=OqIIKfOjA5ca8bgG1Y6TdYabE9YnTM2kj1Lkfvj4")
        const nasaembed = new EmbedBuilder()
        .setTitle("NASA")
        .setDescription("Voici la photo du jour du site de la NASA")
        .setImage(body.hdurl)
        .setTimestamp()
        .setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()});
        interaction.reply({embeds: [nasaembed], ephemeral: true})

        Logger.command(`/nasa command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    }, 
};
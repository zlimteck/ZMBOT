const {EmbedBuilder} = require("discord.js");
const {get} = require("snekfetch");
const Logger = require("../../utils/Logger");

module.exports = {
    /* The code for the nasa command. */
    
    name: "iss",
    category: "fun",
    description: "The bot displays information about the ISS.",
    usage: " iss",
    examples: [" iss"],
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,

    async runInteraction(client, interaction) {
        const {body} = await get("https://api.wheretheiss.at/v1/satellites/25544")
        const issembed = new EmbedBuilder()
        .setTitle("ISS Position")
        .setURL("https://isstracker.zlimteck.fr")
        .setColor("#B0B0B0")
        .setThumbnail('https://imgur.com/EcSWXOq.jpg')
        .addFields([
            {name: "Latitude", value: `${body.latitude}`},
            {name: "Longitude", value: `${body.longitude}`},
            {name: "Altitude", value: `${body.altitude}`},
            {name: "Visibility", value: `${body.visibility}`},
        ])
        .setTimestamp()
        .setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()});
        interaction.reply({embeds: [issembed], ephemeral: true})

        Logger.command(`/iss command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    }, 
};
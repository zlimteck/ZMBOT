const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const Logger = require("../../utils/Logger");

/* Creating a button that will be displayed in the embed. */
const buttons = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
    .setCustomId("accept-button")
    .setLabel("Accept")
    .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
    .setCustomId("refuse-button")
    .setLabel("Refuse")
    .setStyle(ButtonStyle.Danger),
)

module.exports = {
    /* The code for the join command. */
    name: "join",
    category: "utils",
    description: "The command sends the server rules",
    usage: " join",
    examples: [" join"],
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,
    
    async runInteraction(client, interaction) {

        var serverIcon1 = interaction.guild.iconURL();

        const joinEmbed1 = new EmbedBuilder()
        .setTitle("Join")
        .setThumbnail(serverIcon1)
        .setDescription("Accept or refuse the rules before continuing on the server")
        .setTimestamp()

        await interaction.reply({embeds: [joinEmbed1], components: [buttons]})

        Logger.command(`/join command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    },     
};
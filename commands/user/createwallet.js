const {EmbedBuilder} = require("discord.js");
const Logger = require("../../utils/Logger");
const {createMember} = require("../../db/zcoin");

/* A command that allows you to create a wallet to store your coins. */
module.exports = {
    name: "createwallet",
    category: "user",
    description: "Allows you to create a wallet to store your coins.",
    usage: " createwallet",
    examples: [" createwallet"],
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,

    async runInteraction(client, interaction) {

        createMember(interaction.member);
        const logsChannel = client.channels.cache.find(logsChannel => logsChannel.name === "logs");
        const createwalletembed = new EmbedBuilder()
        .setTitle("Wallet created")
        .setThumbnail('https://i.imgur.com/buq6ZAc.jpg')
        .setDescription("Your wallet at Z-corp has been successfully created")
        .setTimestamp()
        interaction.reply({embeds: [createwalletembed], ephemeral: true})

        const logcreatewalletembed = new EmbedBuilder()
        .setTitle("New Wallet created")
        .setThumbnail('https://i.imgur.com/buq6ZAc.jpg')
        .setDescription(`${interaction.member} created his wallet`)
        .setTimestamp()
        logsChannel.send({embeds: [logcreatewalletembed]}),

        Logger.command(`/createwallet command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    },
};
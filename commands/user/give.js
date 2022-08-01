const {EmbedBuilder} = require("discord.js");
const Logger = require("../../utils/Logger");
const {give} = require("../../db/zcoin");
const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: "give",
    category: "user",
    description: "Allows to give zcoin between users.",
    usage: " give",
    examples: [" addzcoin 100"],
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,

/* It's the options for the command. */
    options: [
        {
            name: "amount",
            description: "Enter the amount to give to the user",
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
        },
        {
            name: "user",
            description: "Enter username",
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    
    async runInteraction(client, interaction) {
        const logsChannel = client.channels.cache.find(logsChannel => logsChannel.name === "logs");
        const number = interaction.options.getNumber("amount")
        const member = interaction.options.getMember("user")
        await give(interaction.member, member, number);
        const giveembed = new EmbedBuilder()
        .setTitle("Give completed successfully")
        .setThumbnail('https://i.imgur.com/buq6ZAc.jpg')
        .setDescription(`${interaction.member} offered ${number} zcoin on the wallet of ${member}`)
        .setTimestamp()
        return interaction.reply({embeds: [giveembed], ephemeral: true}),
        logsChannel.send({embeds: [giveembed]}),

        Logger.command(`/give command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    },
};
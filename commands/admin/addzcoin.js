const {EmbedBuilder} = require("discord.js");
const Logger = require("../../utils/Logger");
const {addMoney} = require("../../db/zcoin");
const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: "addzcoin",
    category: "admin",
    description: "Adds the specified amount of zcoin to the mentioned user's wallet.",
    usage: " addzcoin",
    examples: [" addzcoin 100"],
    permissions:["ADMINISTRATOR"],
    ownerOnly: true,

    options: [
        {
            name: "amount",
            description: "Enter the amount of zcoin to add to the wallet",
            type: ApplicationCommandOptionType.Number,
            required: true,
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
        addMoney(member, number);
        const addzcoinembed = new EmbedBuilder()
        .setTitle("Transfer completed successfully")
        .setThumbnail('https://i.imgur.com/buq6ZAc.jpg')
        .setDescription(`Z-corp offered ${number} zcoin on the wallet of ${member}`)
        .setTimestamp()
        interaction.reply({embeds: [addzcoinembed], ephemeral: true})

        const logaddzcoinembed = new EmbedBuilder()
        .setTitle("Transfer completed successfully")
        .setThumbnail('https://i.imgur.com/buq6ZAc.jpg')
        .setDescription(`Z-corp offered ${number} zcoin on the wallet of ${member}`)
        .setTimestamp()
        logsChannel.send({embeds: [logaddzcoinembed]}),

        Logger.command(`/addzcoin command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    },
};
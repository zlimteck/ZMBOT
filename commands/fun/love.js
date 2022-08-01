const {EmbedBuilder} = require("discord.js");
const Logger = require("../../utils/Logger");
const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: "love",
    category: "fun",
    description: "Test love",
    usage: " love <user> <user>",
    examples: [" love @username @username"],
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,

    options: [
        {
            name: "user1",
            description: "Enter username",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "user2",
            description: "Enter username",
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],

    async runInteraction(client, interaction) {

        const user1 = interaction.options.getMember("user1")
        const user2 = interaction.options.getMember("user2")
        const number = Math.floor(Math.random() * 99) + 1;

        if (!user1 || !user2) return interaction.reply("Please enter a valid username");

        const loveEmbed = new EmbedBuilder()
        .setTitle("Love")
        .setDescription(`Love test`)
        .addFields([
            {name: "Member", value: `${user1} + ${user2}`},
            {name: "Result", value: `${number}% :heart:`},
        ])
        .setColor("#D50A0A")
        .setImage("https://i.imgur.com/RAwPNKH.png")
        if (number > 90) return interaction.reply({embeds: [loveEmbed]});

        Logger.command(`/love command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)

        const loveEmbed1 = new EmbedBuilder()
        .setTitle("Love")
        .setDescription(`Test de love`)
        .addFields([
            {name: "Member", value: `${user1} + ${user2}`},
            {name: "Result", value: `${number}% :heart:`},
        ])
        .setColor("#D50A0A")
        if (number < 90) return interaction.reply({embeds: [loveEmbed1]});

        Logger.command(`/love command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    }  
};
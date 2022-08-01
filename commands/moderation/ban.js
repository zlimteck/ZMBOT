const {EmbedBuilder} = require("discord.js");
const Logger = require("../../utils/Logger");
const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: "ban",
    category: "moderation",
    description: "The bot will ban the indicated member from the server",
    usage: " ban [@member] [reason]",
    examples: [" ban @Username reason"],
    permissions:["BAN_MEMBERS"],
    ownerOnly: false,

    /* It's a command option. It's used to make a command interactive. */
    options: [
        {
            name: "target",
            description: "The member banned",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "reason",
            description: "The reason for the ban",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

//It's a command option. It's used to make a command interactive.
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason");
        if (!target.bannable) return interaction.reply("I cannot ban this member");
        target.ban({reason});
        const banembed = new EmbedBuilder()
        .setTitle("Banned")
        .setDescription(`${target} has been banned from the server by ${interaction.user} for reason: ${reason}`)
        .setTimestamp()
        interaction.reply({embeds: [banembed], ephemeral: true})

        Logger.command(`/ban command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    }, 
};
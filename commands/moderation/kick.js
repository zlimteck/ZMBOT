const {EmbedBuilder} = require("discord.js");
const Logger = require("../../utils/Logger");
const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: "kick",
    category: "moderation",
    description: "The bot will kick the indicated member from the server",
    usage: " kick [@member] [reason]",
    examples: [" kick @Username reason"],
    permissions:["KICK_MEMBERS"],
    ownerOnly: false,

    /* It's a command option. It's used to make a command interactive. */
    options: [
        {
            name: "target",
            description: "The member kicked",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "reason",
            description: "The reason for the kick",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

//It's a command option. It's used to make a command interactive.
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason");
        if (!target.kickable) return interaction.reply("I cannot kick this member");
        target.kick(reason);
        const kickembed = new EmbedBuilder()
        .setTitle("Kicked")
        .setDescription(`${target} has been kicked from the server by ${interaction.user} for reason: ${reason}`)
        .setTimestamp()
        interaction.reply({embeds: [kickembed], ephemeral: true})

        Logger.command(`/kick command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    }, 
};
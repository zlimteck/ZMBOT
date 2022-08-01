const {EmbedBuilder} = require("discord.js");
const ms = require("ms");
const Logger = require("../../utils/Logger");
const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: "mute",
    category: "moderation",
    description: "The bot mute a user",
    usage: " mute [@member] [duration] [reason]",
    examples: [" mute @Username 1 min reason"],
    permissions:["MODERATE_MEMBERS"],
    ownerOnly: false,

    /* It's a command option. It's used to make a command interactive. */
    options: [
        {
            name: "target",
            description: "The member mute",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "duration",
            description: "The duration for the mute",
            type: ApplicationCommandOptionType.String,
            minValue: 1,
            maxValue: 7,
            required: true,
        },
        {
            name: "reason",
            description: "The reason for the mute",
            type: ApplicationCommandOptionType.String,
            required: true,
        },

    ],

//It's a command option. It's used to make a command interactive.
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember("target");
        const duration = interaction.options.getString("duration");
        const convertedTime = ms(duration);
        const reason = interaction.options.getString("reason");
        if (!target.moderatable) return interaction.reply("I cannot mute this member");
        target.timeout(convertedTime, reason);
        if (!convertedTime) return interaction.reply("Please specify a duration **(between 1 and 7 days)**");
        const muteembed = new EmbedBuilder()
        .setTitle("Muted")
        .setDescription(`${target} has been muted during ${duration} from the server by ${interaction.user} for reason: ${reason}`)
        .setTimestamp()
        interaction.reply({embeds: [muteembed], ephemeral: true})

        Logger.command(`/mute command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    }, 
};
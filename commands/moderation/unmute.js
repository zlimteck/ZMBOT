const {EmbedBuilder} = require("discord.js");
const Logger = require("../../utils/Logger");
const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: "unmute",
    category: "moderation",
    description: "The bot unmute a user",
    usage: " unmute [@member]",
    examples: [" unmute @Username"],
    permissions:["MODERATE_MEMBERS"],
    ownerOnly: false,

    /* It's a command option. It's used to make a command interactive. */
    options: [
        {
            name: "target",
            description: "The member unmute",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],

//It's a command option. It's used to make a command interactive.
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember("target");
        if (!target.isCommunicationDisabled()) return interaction.reply("This user is not muted");
        target.timeout(null);
        const unmuteembed = new EmbedBuilder()
        .setTitle("Unmuted")
        .setDescription(`${target} has been unmuted from the server by ${interaction.user}`)
        .setTimestamp()
        interaction.reply({embeds: [unmuteembed], ephemeral: true})

        Logger.command(`/unmute command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    }, 
};
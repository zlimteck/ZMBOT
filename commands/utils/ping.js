const {EmbedBuilder} = require("discord.js");
const Logger = require("../../utils/Logger");

module.exports = {
    /* The code for the ping command. */
    name: "ping",
    category: "fun",
    description: "Displays bot and websocket timeout",
    usage: " ping",
    examples: [" ping"],
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,

    async runInteraction(client, interaction) {
        const tryPing = await interaction.reply({content: "One moment please...", fetchReply: true});
        const pingembed = new EmbedBuilder()
        .setTitle("📤 Ping")
        .setThumbnail(client.user.displayAvatarURL())
        .addFields([
            {name: "Latence WEBSOCKET", value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true},
            {name: "Latence BOT", value: `\`\`\`${tryPing.createdTimestamp - interaction.createdTimestamp}\`\`\``, inline: true},
        ])
        .setTimestamp()
        .setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()});
        interaction.editReply({content: " ", embeds: [pingembed]})

        Logger.command(`/ping command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    },     
};
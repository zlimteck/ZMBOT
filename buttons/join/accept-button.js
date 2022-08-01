const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: "accept-button",

    async runInteraction(client, interaction) {

        var role = interaction.guild.roles.cache.find(role => role.name === "REQUESTER");
        var serverIcon = interaction.guild.iconURL();

        const acceptEmbed = new EmbedBuilder()
        .setTitle("Accepted")
        .setThumbnail(serverIcon)
        .setDescription(`You have accepted the rules you get the role ${role} that allows you to access the server`)
        .setTimestamp()

        await interaction.member.roles.add(role);
        await interaction.reply({embeds: [acceptEmbed], ephemeral: true})

        const logsChannel = client.channels.cache.get("985225557912469524");
        const acceptLogEmbed = new EmbedBuilder()
        .setTitle("Accepted")
        .setThumbnail(serverIcon)
        .setDescription(`The member ${interaction.member.displayName} to accept the rules of the server he obtained the role ${role}`)
        .setTimestamp()
        await logsChannel.send({embeds: [acceptLogEmbed]});
    },     
};
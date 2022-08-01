const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: "refuse-button",
    async runInteraction(client, interaction, member) {
        try {
            var serverIcon = interaction.guild.iconURL();
            var serverName = interaction.name;

            const refuseEmbed = new EmbedBuilder()
            .setTitle("Refused")
            .setThumbnail(serverIcon)
            .setDescription(`You did not accept the rules of the server ${serverName} so you were kicked`)
            .setTimestamp()
            await interaction.member.send({embeds: [refuseEmbed]});
        }catch(err) {
            const logsChannel = client.channels.cache.get("985225557912469524");
            const refuseLogEmbed = new EmbedBuilder()
            .setTitle("Refused")
            .setThumbnail(serverIcon)
            .setDescription(`The member ${interaction.member.displayName} was kicked because he did not accept the rules of the server`)
            .setTimestamp()
            await logsChannel.send({embeds: [refuseLogEmbed]});
        }
        await interaction.member.kick("Did not accept the rules");
    },     
};
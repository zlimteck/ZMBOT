const {EmbedBuilder} = require("discord.js");
const Logger = require("../../utils/Logger");
const {leaderboard} = require("../../db/zcoin");

module.exports = {
    name: "leaderboard",
    category: "user",
    description: "Displays the top 10 members of the server.",
    usage: " leaderboard",
    examples: [" leaderboard"],
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,
    
    /* A command that displays the top 10 members of the server. */
    async runInteraction(client, interaction){
        const guildLeaderboard = await leaderboard(interaction.guild.id);
        if (!guildLeaderboard || guildLeaderboard.length < 1) return interaction.reply("There is no leaderboard on this server.");
        const leaderboardembed = new EmbedBuilder()
        .setAuthor({name: `Leaderboard for ${interaction.guild.name}`, icon_url: interaction.guild.iconURL()})
        .setThumbnail('https://i.imgur.com/buq6ZAc.jpg')
        .setColor("RANDOM")
        .setTitle("Leaderboard")

        for (let i = 0; i < guildLeaderboard.length; i++){
            const member = await interaction.guild.members.fetch(guildLeaderboard[i].id);
            leaderboardembed.addFields([{name: `${i+1}. ${member.user.username}`, value: `${guildLeaderboard[i].zcoin} zcoin`}]);
        }
        interaction.reply({embeds: [leaderboardembed], ephemeral: true})

        Logger.command(`/leaderboard command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    },
};
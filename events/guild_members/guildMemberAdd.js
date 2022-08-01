const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    on: false,
    /* It's a event that sends a message when a user joins the server. */

    async execute(client, member) {
        const fetchGuild = await client.getGuild(member.guild);

        const memberembed = new EmbedBuilder()
        .setAuthor({name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL()})
        .setColor("GREEN")
        .setDescription(`± Username: ${member}
        ± Created the: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
        ± Joined the: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
        `)
        .setTimestamp()
        .setFooter({text: "This user has joined the server."});

        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        logChannel.send({embeds: [memberembed]})
    },
};
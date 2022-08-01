const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    on: false,
    async execute(client, member,){
        const fetchGuild = await client.getGuild(member.guild);

        const memberembed = new EmbedBuilder()
        .setAuthor({name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL()})
        .setColor("RED")
        .setDescription(`± Username: ${member.displayName}
        ± Created the: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
        ± Joined the: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
        ± Left the: <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)
        `)
        .setTimestamp()
        .setFooter({text: "This user left the server."});

        const logsChannel = client.channels.cache.get(fetchGuild.logChannel); 
        logsChannel.send({embeds: [memberembed]})
    },
};
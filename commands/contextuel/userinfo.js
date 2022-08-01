const {EmbedBuilder} = require("discord.js");
const Logger = require("../../utils/Logger");
const {getMemberMoney} = require("../../db/zcoin");
const {ApplicationCommandType} = require('discord.js');

module.exports = {
    /* The code for the ping command. */
    name: "userinfo",
    type: ApplicationCommandType.User,
    category: "contextuel",
    //description: "",
    usage: "Displays user information via context menu",
    examples: ["Displays user information via context menu"],
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,
    async runInteraction(client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId);
        const memberZcoin = await getMemberMoney(interaction.member);
        const pingembed = new EmbedBuilder()
        .setAuthor({name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? "https://img.jointhecult.xyz/images/2022/06/07/1f916.png" : "https://img.jointhecult.xyz/images/2022/06/07/1f468.png"})
        .setColor("DARK_ORANGE")
        .setImage(member.user.displayAvatarURL())
        .addFields([
            {name: "Nom", value: `${member.displayName}`, inline: true},
            {name: "Administrateur | Moderateur", value: `${member.kickable ? "🔴" : "🟢"}`, inline: true},
            {name: "Bot", value: `${member.user.bot ? "🟢" : "🔴"}`, inline: true},
            {name: "Roles", value: `${member.roles.cache.map(role => role).join("|").replace("|@everyone"," ")}`},
            {name: "Account created:", value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`},
            {name: "Join the server:", value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`},
            {name: "Zcoin", value: `${memberZcoin} zcoin`, inline: true},
        ])
        interaction.reply({embeds: [pingembed], ephemeral: true});
        
        Logger.command(`Userinfo executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    }, 
};
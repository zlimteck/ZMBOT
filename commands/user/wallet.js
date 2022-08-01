const {EmbedBuilder} = require("discord.js");
const Logger = require("../../utils/Logger");
const {getMemberMoney} = require("../../db/zcoin");

module.exports = {
    name: "wallet",
    category: "user",
    description: "Displays the amount of zcoin in your wallet.",
    usage: " wallet",
    examples: [" wallet"],
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,
    
    async runInteraction(client, interaction){
        const memberZcoin = await getMemberMoney(interaction.member);
        const walletembed = new EmbedBuilder()
        .setTitle("Wallet")
        .setThumbnail('https://i.imgur.com/buq6ZAc.jpg')
        .setDescription(`You have ${memberZcoin} zcoin in your wallet`)
        .setTimestamp()
        interaction.reply({embeds: [walletembed], ephemeral: true})

        Logger.command(`/wallet command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    },
};


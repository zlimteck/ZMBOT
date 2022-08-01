const Logger = require("../../utils/Logger");
const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: "clear",
    category: "moderation",
    description: "The bot will clear the specified message count or messages from the specified user",
    usage: " clear [amount] <@target>",
    examples: [" clear 10", " clear @Username"],
    permissions:["MANAGE_MESSAGES"],
    ownerOnly: false,

    /* It's a command option. It's used to make a command interactive. */
    options: [
        {
            name: "message",
            description: "number of messages to delete",
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: "target",
            description: "choose user",
            type: ApplicationCommandOptionType.User,
            required: false,
        }
    ],

//It's a command option. It's used to make a command interactive.
    async runInteraction(client, interaction) {
        const amountToDelete = interaction.options.getNumber("message")
        if (amountToDelete > 100 || amountToDelete < 0) return interaction.reply("The number must be less than 100 and greater than 0");  //It's checking if the amount of messages to delete is greater than 100 or less than 0. If it is, it will return an error message.
        const target = interaction.options.getMember("target")
        // It's fetching all the messages in the channel and then filtering them by the target user.
        const messagesToDelete = await interaction.channel.messages.fetch();
        if (target){
            let i = 0;
            const filteredTargetMessages = [];
            (await messagesToDelete).filter(msg => {
                if (msg.author.id == target.id && amountToDelete > i) {
                    filteredTargetMessages.push(msg); i++;
                }
            });
            //It's deleting the messages.
            await interaction.channel.bulkDelete(filteredTargetMessages, true).then(messages =>{
                interaction.reply(`${messages.size} message(s) from ${target} we were deleted`)
            });
        }else {
            await interaction.channel.bulkDelete(amountToDelete, true).then(messages =>{
                interaction.reply(`${messages.size} message(s) on this channel`)
            });
        }

        Logger.command(`/clear command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    }, 
};
const Logger = require("../../utils/Logger");
const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: "emit",
    category: "admin",
    description: "The bot emit an event send in the logs channel",
    usage: " emit [eventName]",
    examples: [" emit guildCreate", " emit guildMemberAdd", " emit guildMemberRemove"],
    permissions:["ADMINISTRATOR"],
    ownerOnly: false,
    
/* It's a command option. It's used to make a command interactive. */
    options: [
        {
            name: "event",
            description: "choose an event to send",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "guildMemberAdd",
                    value: "guildMemberAdd"
                },
                {
                    name: "guildMemberRemove",
                    value: "guildMemberRemove"
                },
                {
                    name: "guildCreate",
                    value: "guildCreate"
                }
            ]
        }
    ],
    
    /* It's a command option. It's used to make a command interactive. */
    runInteraction(client, interaction) {
        const evtChoices = interaction.options.getString("event");

        if (evtChoices == "guildMemberAdd"){
            client.emit("guildMemberAdd", interaction.member);
            interaction.reply({content: "Event guildMemberAdd emitted.", ephemeral: true});
        }else if (evtChoices == "guildCreate"){
            client.emit("guildCreate", interaction.guild);
            interaction.reply({content: "Event guildCreate emitted.", ephemeral: true}); 
        }else {
            client.emit("guildMemberRemove", interaction.member);
            interaction.reply({content: "Event guildMemberRemove emitted.", ephemeral: true});
        }

        Logger.command(`/emit command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    }, 
};
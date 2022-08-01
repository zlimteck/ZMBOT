const Logger = require("../../utils/Logger");
const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: "dbconfig",
    category: "admin",
    description: "Configure database data",
    usage: " dbconfig [key] <value>",
    examples: [" dbconfig", " dbconfig prefix ?", " dbconfig prefix"],
    permissions:["ADMINISTRATOR"],
    ownerOnly: false,

    /* It's a command option. It's used to make a command interactive. */
    options: [
        {
            name: "key",
            description: "Choose a key to modify or display",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "prefix",
                    value: "prefix"
                },
                {
                    name: "logChannel",
                    value: "logChannel"
                },
            ]
        },

        {
            name: "value",
            description: "Choose the new value for your key",
            type: ApplicationCommandOptionType.String,
        }
    ],

    /* It's a command option. It's used to make a command interactive. */
    async runInteraction(client, interaction, guildSettings) {
        const key = interaction.options.getString("key");
        const value = interaction.options.getString("value");
        if (key == "prefix"){
            if (value){
                await client.updateGuild(interaction.guild, {prefix: value});
                return interaction.reply({content: `News Prefix value: ${value}`});
            }
            interaction.reply({content: `Prefix value: ${guildSettings.prefix}`});
        }else if (key == "logChannel"){
                if (value){
                    await client.updateGuild(interaction.guild, {logChannel: value});
                    return interaction.reply({content: `News logChannel value: ${value}`});
                }
                interaction.reply({content: `logChannel value: ${guildSettings.logChannel}`});
        }

        Logger.command(`/dbconfig command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    }
};

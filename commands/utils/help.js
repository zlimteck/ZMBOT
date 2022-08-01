const {EmbedBuilder} = require("discord.js");
const {readdirSync} = require("fs")
const commandFolder = readdirSync("./commands")
const Logger = require("../../utils/Logger");
const {ApplicationCommandOptionType} = require('discord.js');

const contextDescription = {
    userinfo: "Displays user information"
};

module.exports = {
    name: "help",
    category: "utils",
    description: "Gives information on the different commands available",
    usage: " help <command>",
    examples: [" help", " help ping"],
    permissions: ["SEND_MESSAGES"],
    ownerOnly: false,

    /* It's option for a help command. */
    options: [
        {
            name: "command",
            description: "Type the name of your command",
            type: ApplicationCommandOptionType.String,
            required: false,
        }
],
    /* It's a help command. */
    async runInteraction(client, interaction, guildSettings) {
        const prefix = guildSettings.prefix;
        const cmdName = interaction.options.getString("command");

        if (!cmdName){
            const noArgsEmbed = new EmbedBuilder()
            .setColor("DARK_BUT_NOT_BLACK")
            .addFields([{name: "List of commands.", value: `List of all commands by categories. \nFor more information on a command type \`${prefix} help <command>\``}])

            for (const category of commandFolder){
                noArgsEmbed.addFields([{
                   name: `${category.toUpperCase()}`,
                    value: `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(" | ")}\``
                }]);
            }
            return interaction.reply({embeds: [noArgsEmbed], ephemeral: true}),
            Logger.command(`/help command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)     
        }

        const cmd = client.commands.get(cmdName);
        if (!cmd) return interaction.reply({content: "This command does not exist", ephemeral: true});

        return interaction.reply({content:`
\`\`\`makefile
[Help: Command -> ${cmd.name}] ${cmd.ownerOnly ? "/!\\ Only for administrator. /!\\" : ""}

Permission(s) required: ${cmd.permissions.join(" | ")}

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Utilisation: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.examples.join(` | ${prefix}`)}
____

${prefix} = prefix to use the bot. (/commands also available)

{} = subcommand(s) available | [] = mandatory option(s) | <> = optional option(s)

Do not include characters -> {} , [] , <> in the command.

\`\`\``, ephemeral: true}), Logger.command(`/help command executed on the server ${interaction.guild.name} in the channel ${interaction.channel.name} by member ${interaction.user.username} the ${interaction.createdAt}`)
    },  
};

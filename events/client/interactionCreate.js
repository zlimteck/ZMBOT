const {InteractionType} = require("discord.js")
const ownerId = "176752455265157120";

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction){
        let guildSettings = await client.getGuild(interaction.guild);

        if (!guildSettings) {
            await client.createGuild(interaction.guild);
            guildSettings = await client.getGuild(interaction.guild);
        }

        if (interaction.type === InteractionType.ApplicationCommand) {
            const cmd = client.commands.get(interaction.commandName);  
            if (!cmd) return interaction.reply("This command does not exist !");
            if (cmd.ownerOnly){
                if (interaction.user.id != ownerId) return interaction.reply("You must be an administrator to run this command !");
            }
            if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({content: `You do not have the required permission(s) (\`${cmd.permissions.join("|")}\`) to run this command`, ephemeral: true});
            cmd.runInteraction(client, interaction, guildSettings);
        } else if (interaction.isButton()) {
            const btn = client.buttons.get(interaction.customId);
            if (!btn) return interaction.reply("This button does not exist !");
            btn.runInteraction(client, interaction, guildSettings);
        }
    },
};
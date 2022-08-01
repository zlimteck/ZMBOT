const ownerId = "176752455265157120";

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message){
        let guildSettings = await client.getGuild(message.guild);

        if (!guildSettings) {
            await client.createGuild(message.guild);
            guildSettings = await client.getGuild(message.guild);
            return interaction.reply("The bot has updated your database for your server, please retype the command");
        }
        
        const prefix = guildSettings.prefix;
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;
        
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmdName = args.shift().toLowerCase();
        if (cmdName.length == 0) return;

        let cmd = client.commands.get(cmdName);
        if (!cmd) return message.reply("This command does not exist !");

        if (cmd.ownerOnly){
            if (message.author.id != ownerId) return message.reply("You must be an administrator to run this command !");
        }

        if (!message.member.permissions.has([cmd.permissions])) return message.reply(`You do not have the required permission(s) (\`${cmd.permissions.join("|")}\`) to run this command`);

        if (cmd) cmd.run(client, message, args, guildSettings); 
    },
};
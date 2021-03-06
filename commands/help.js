exports.run = (bot, message, args, level) => {
	const Discord = require('discord.js');
	if (!args[0]) {
		var helpbox = new Discord.RichEmbed();
		helpbox.setTitle("Command List")
			.setDescription(`Use ${bot.config.prefix}help <commandname> for details`)
			.setColor([Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)])
		bot.commands.forEach(c => {
			if (message.member.hasPermission(c.conf.memberPerms))
				helpbox.addField(c.help.name, c.help.description)
		});
		message.channel.send({
			embed: helpbox
		});
	} else {
		let command = '';
		if (bot.commands.has(args[0])) {
			command = bot.commands.get(args[0]);
		} else if (bot.aliases.has(args[0])) {
			command = bot.commands.get(bot.aliases.get(args[0]));
		};
		if (!command) return message.reply(`That command doesn't seem to exist, nor is it an alias. Try again!`);
		var helpCommand = new Discord.RichEmbed();
		helpCommand.setTitle(command.help.name)
			.addField('Description', `${command.help.description}`)
			.addField('Usage', `${bot.config.prefix}${command.help.usage}`)
			.setColor([Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)])
		if (command.conf.aliases != "") {
			helpCommand.addField('Aliases', `${command.conf.aliases.join(', ')}`)
		}
		message.channel.send({
			embed: helpCommand
		});
	};
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['h', 'halp', '?'],
	botPerms: [],
	memberPerms: []
};
exports.help = {
	name: 'help',
	description: 'Displays all the commands avaliable for your permission level',
	usage: 'help <command [optional]>'
};

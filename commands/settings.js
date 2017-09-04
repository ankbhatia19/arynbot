const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../servers.sqlite');
exports.run = (bot, message, args, level) => {
    	if (!message.member.hasPermission('MANAGE_GUILD')) return msg.reply("you do not have permission to manage this server's setings!");
        if (args[0] == 'dadjokes') {
            db.all(`SELECT * FROM servers WHERE id = "${message.guild.id}"`, function (results, err) {
				if (err || !results.rows[0])
					bot.log('log', err, 'ERROR');
				else
					dadJokesEnabled = results.rows[0].dadJokes;
                    message.channel.send(`dadjokes current setting: ${dadJokesEnabled}`);
			});
            //if (!args[1]) return 
        }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'settings',
    description: '',
    usage: ''
};
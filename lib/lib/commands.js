
DLib.Commands = {};

DLib.Commands.invite = function(msg) {
	return 'Link https://discordapp.com/api/oauth2/authorize?client_id=' + DLib.bot.user.id + '&scope=bot&permissions=0';
}

DLib.fs.readdirSync('./lib/lib/commands/').forEach(function(file) {
	DLib.Commands[file] = require('./commands/' + file);
});

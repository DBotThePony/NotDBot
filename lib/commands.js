
DLib.Commands = {};

DLib.Commands.invite = function(msg) {
	return 'Link https://discordapp.com/api/oauth2/authorize?client_id=' + DLib.bot.user.id + '&scope=bot&permissions=0';
}

DLib.fs.readdirSync('./lib/commands/').forEach(function(file) {
	var id = file.split('.')[0];
	var command = require('./commands/' + file)
	
	if (command.alias) {
		command.alias.forEach(function(item) {
			DLib.Commands[item] = command;
		});
	}
	
	DLib.Commands[id] = command;
});

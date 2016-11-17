
DBot.Commands = {};

DBot.Commands.invite = function(msg) {
	return 'Link https://discordapp.com/api/oauth2/authorize?client_id=' + DBot.bot.user.id + '&scope=bot&permissions=0';
}

DBot.RegisterCommand = function(command) {
	if (command.alias) {
		command.alias.forEach(function(item) {
			DBot.Commands[item] = command;
		});
	}
	
	DBot.Commands[command.id] = command;
}

DBot.fs.readdirSync('./lib/commands/').forEach(function(file) {
	var id = file.split('.')[0];
	var command = require('./commands/' + file);
	
	if (!command)
		return;
	
	if (!command.name)
		return;
	
	command.id = id;
	DBot.RegisterCommand(command);
});



DBot.Commands = {};

DBot.RegisterCommand = function(command) {
	if (command.alias) {
		command.alias.forEach(function(item) {
			DBot.Commands[item] = command;
		});
	}
	
	DBot.Commands[command.id || command.name] = command;
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

DBot.BuildHelpString = function(command) {
	var output = 'Avaliable commands are:```';
	var first = true;
	
	for (var k in DBot.Commands) {
		var item = DBot.Commands[k];
		if (k != item.id && k != item.name)
			continue;
		
		if (first) {
			first = false;
			output += k;
		} else {
			output += ', ' + k;
		}
		
		if (item.alias) {
			output += ' (' + DBot.ConcatArray(item.alias, ', ') + ')';
		}
	}
	
	output += '```to get help with specified command, type help <command>';
	
	return output;
}

DBot.RegisterCommand({
	name: 'help',
	id: 'help',
	alias: ['h'],
	
	argNeeded: false,
	failMessage: '',
	
	help_args: '[command]',
	desc: 'Displays help',
	
	func: function(args, cmd, rawcmd, msg) {
		if (!args[0]) {
			return DBot.BuildHelpString();
		}
	},
});

DBot.RegisterCommand({
	name: 'invite',
	
	help_args: '',
	desc: 'Displays invite link',
	
	func: function(args, cmd, rawcmd, msg) {
		return 'Link https://discordapp.com/api/oauth2/authorize?client_id=' + DBot.bot.user.id + '&scope=bot&permissions=0';
	},
});

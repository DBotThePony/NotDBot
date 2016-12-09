
var fix = function(str) {
	return str.replace(/@everyone/gi, '@pne').replace(/@here/gi, '@pne').replace(/@[^ ]+/gi, '@pne');
}

module.exports = {
	name: 'reverse',
	alias: ['r'],
	
	argNeeded: true,
	failMessage: 'Missing phrase for reverse',
	
	help_args: '<phrase> ...',
	desc: 'Reverces a string',
	
	func: function(args, cmd, msg) {
		var out = '';
		
		for (i = cmd.length - 1; i >= 0; i--) {
			out += cmd[i];
		}
		
		return fix(out);
	},
}

DBot.RegisterCommand({
	name: 'sreverse',
	alias: ['sr'],
	
	argNeeded: true,
	failMessage: 'Missing phrase for soft reverse',
	
	help_args: '<phrase> ...',
	desc: 'Reverces all phrases in command',
	
	func: function(args, cmd, msg) {
		var out = '';
		
		args.forEach(function(item) {
			for (i = item.length - 1; i >= 0; i--) {
				out += item[i];
			}
			
			out += ' ';
		});
		
		return fix(out);
	},
});
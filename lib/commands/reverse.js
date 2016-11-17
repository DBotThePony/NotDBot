
module.exports = {
	name: 'reverse',
	alias: ['r'],
	
	argNeeded: true,
	failMessage: 'Missing phrase for /reverse!',
	
	func: function(args, cmd, rawcmd, msg) {
		var out = '';
		
		for (i = cmd.length - 1; i >= 0; i--) {
			out += cmd[i];
		}
		
		return out;
	},
}
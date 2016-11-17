
module.exports = {
	name: 'reverse',
	alias: ['r'],
	
	argNeeded: true,
	failMessage: 'Missing phrase for /reverse!',
	
	func: function(args, cmd, rawcmd, msg) {
		return 'It works!';
	},
}
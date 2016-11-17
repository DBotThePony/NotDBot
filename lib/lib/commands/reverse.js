
module.exports = {
	name: 'reverse',
	aliases: 'r',
	
	argNeeded: true,
	failMessage: 'Missing phrase for /reverse!',
	
	asked: function(parsed, cmd, rawcmd, msg) {
		return 'It works!';
	},
}
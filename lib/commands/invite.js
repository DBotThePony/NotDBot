var Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command({
	name: "invite",
	desc: "Paste bot invation links",
	fn: (argv, context) => {
		// This output will be redirected to your app's onReply function
		return 'Link https://discordapp.com/api/oauth2/authorize?client_id=' + DLib.bot.user.id + '&scope=bot&permissions=0';
	},
});

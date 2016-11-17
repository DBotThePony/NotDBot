
DLib = {};

DLib.IsMyMessage = function(msg) {
	return msg.author.id == DLib.bot.user.id;
}
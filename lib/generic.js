
DLib = {};
DLib.fs = require('fs');

require('./lib/commands.js');
require('./lib/handler.js');

DLib.IsMyMessage = function(msg) {
	return msg.author.id == DLib.bot.user.id;
}

DLib.InitVars = function() {
	DLib.id = DLib.bot.user.id;
	console.log('Bot ID: ' + DLib.id);
	DLib.askId = '<@' + DLib.bot.user.id + '>';
	DLib.askIdC = '<@' + DLib.bot.user.id + '> ';
	
	DLib.idLen = DLib.id.length;
	DLib.aidLen = DLib.askId.length;
	DLib.aidcLen = DLib.askIdC.length;
}

DLib.IsAskingMe = function(msg) {
	if (msg.content.substr(0, DLib.aidLen) == DLib.askId)
		return true;
	
	return false;
}

DLib.IsAskingMe_Command = function(msg) {
	if (msg.content.substr(0, DLib.aidcLen) == DLib.askIdC)
		return true;
	
	return false;
}
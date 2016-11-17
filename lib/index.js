'use strict';

const fs      = require('fs');
const Clapp   = require('./modules/clapp-discord');
const cfg     = require('../config.js');
const pkg     = require('../package.json');
const Discord = require('discord.js');
const bot     = new Discord.Client();

require('./generic.js');

/*
var app = new Clapp.App({
	name: cfg.name,
	desc: pkg.description,
	prefix: cfg.prefix,
	version: pkg.version,
	onReply: (msg, context) => {
	// Fired when input is needed to be shown to the user.

	context.msg.reply('\n' + msg).then(bot_response => {
		if (cfg.deleteAfterReply.enabled) {
			context.msg.delete(cfg.deleteAfterReply.time)
				.then(msg => console.log(`Deleted message from ${msg.author}`))
				.catch(console.log);
			bot_response.delete(cfg.deleteAfterReply.time)
				.then(msg => console.log(`Deleted message from ${msg.author}`))
				.catch(console.log);
			}
		});
	}
});

// Load every command in the commands folder
fs.readdirSync('./lib/commands/').forEach(file => {
	app.addCommand(require("./commands/" + file));
});
*/

bot.on('message', msg => {
	// Fired when someone sends a message
	
	if (DLib.IsMyMessage(msg))
		return;
	
	if (msg.channel.type == 'dm' && !DLib.IsAskingMe(msg)) {
		msg.reply('What do you want in PM?');
		return;
	}
	
	if (!DLib.IsAskingMe(msg))
		return;
	
	if (DLib.IsAskingMe(msg) && !DLib.IsAskingMe_Command(msg)) {
		msg.reply('What do you want?')
		return;
	}
	
	DLib.HandleMessage(msg);
});

bot.login(cfg.token).then(() => {
	console.log('Running!');
	DLib.bot = bot;
	DLib.InitVars();
});

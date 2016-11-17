'use strict';

const cfg     = require('../config.js');
const pkg     = require('../package.json');
const Discord = require('discord.js');
const bot     = new Discord.Client();

require('./init.js');

bot.on('message', msg => {
	// Fired when someone sends a message
	
	if (DBot.IsMyMessage(msg))
		return;
	
	if (msg.channel.type == 'dm' && !DBot.IsAskingMe(msg)) {
		msg.reply('What do you want in PM?');
		return;
	}
	
	if (!DBot.IsAskingMe(msg))
		return;
	
	if (DBot.IsAskingMe(msg) && !DBot.IsAskingMe_Command(msg)) {
		msg.reply('What do you want?')
		return;
	}
	
	DBot.HandleMessage(msg);
});

bot.login(cfg.token).then(() => {
	console.log('Running!');
	DBot.bot = bot;
	DBot.InitVars();
});

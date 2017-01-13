
const unirest = require('unirest');
const JSON3 = require('json3');
const fs = require('fs');

Util.mkdir(DBot.WebRoot + '/google');

const Search = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAhhmtK4vvqV4ryhhbPeJAJAjlRmzNP-2g&cx=011142896060985630711:sibr51l3m7a&safe=medium&q=';

DBot.CreateTagsSpace('google', [
	'fuck',
	'dick',
	'fap',
	'port',
	'cock',
	'ass',
	'assfuck',
	'fucking',
	'pron',
	'shit',
	'anal',
	'hentai',
	'ecchi',
	'echi',
	'scum',
	'r34',
	'rule34',
	'pornhub',
]);

let fn = function(prefix) {
	return function(args, cmd, msg, previousStuff) {
		let enc = encodeURIComponent(prefix + cmd.toLowerCase());
		let url = Search + enc;
		let hash = DBot.HashString(enc);
		let cachePath = DBot.WebRoot + '/google/' + hash + '.json';
		
		let ServerTags;
		let ClientTags = DBot.UserTags(msg.author, 'google');
		let ChannelTags;
		
		if (!DBot.IsPM(msg)) {
			ChannelTags = DBot.ChannelTags(msg.channel, 'google');
			ServerTags = DBot.ServerTags(msg.channel.guild, 'google');
		}
		
		if (!(msg.channel.name || 'private').match('nsfw')) {
			for (let k in args) {
				let split = args[k].split(' ');
				
				for (let i in split) {
					if (ClientTags.isBanned(split[i]) || ServerTags && ServerTags.isBanned(split[i]) || ChannelTags && ChannelTags.isBanned(split[i])) {
						return 'Search string contains tags that was banned by server, client or even you ;n;';
					}
				}
			}
		}
		
		msg.channel.startTyping();
		
		let continueSearch = function(data, isCached) {
			msg.channel.stopTyping();
			
			try {
				let items = data.items;
				
				if (!items || !items[0])
					return msg.reply('None found ;n;');
				
				let items2;
				
				if (!previousStuff)
					items2 = items;
				else {
					items2 = [];
					
					for (let i2 in items) {
						let hit = false;
						
						for (let i in previousStuff) {
							if (previousStuff[i] == items[i2].link) {
								hit = true;
								break;
							}
						}
						
						if (!hit)
							items2.push(items[i2]);
					}
				}
				
				if (!items2[0]) {
					msg.reply('Onoh! No more results ;n;');
					return;
				}
				
				let result;
				
				if (previousStuff)
					result = DBot.RandomArray(items2);
				else
					result = items2[0];
				
				let output = 'Title: ' + result.title;
				
				if (isCached) {
					output = '(results are cached)\n' + output;
				}
				
				output += '\n```' + result.snippet + '```\n' + result.link;
				
				msg.reply(output);
			} catch(err) {
				msg.reply('<internal pony error>');
				console.error(err);
			}
		}
		
		fs.stat(cachePath, function(err, stat) {
			let getFunc = function() {
				unirest.get(url)
				.end(function(result) {
					if (!result.body) {
						msg.channel.stopTyping();
						msg.reply('wtf with google');
						return;
					}
					
					continueSearch(result.body);
					
					fs.writeFile(cachePath, result.raw_body);
				});
			}
			
			if (stat) {
				fs.readFile(cachePath, 'utf8', function(err, data) {
					if (!data || data == '') 
						return getFunc();
					
					try {
						continueSearch(JSON3.parse(data), true);
					} catch(err) {
						msg.channel.stopTyping();
						msg.reply('wtf with google');
					}
				});
			} else {
				getFunc();
			}
		});
	}
}

module.exports = {
	name: 'google',
	alias: ['search', 'g'],
	
	argNeeded: true,
	delay: 3,
	more: true,
	
	help_args: '<phrase>',
	desc: 'Search a site in google',
	
	func: fn(''),
}

DBot.RegisterCommand({
	name: 'wiki',
	alias: ['wikipedia'],
	
	argNeeded: true,
	delay: 3,
	more: true,
	
	help_args: '<phrase>',
	desc: 'Search stuff in Wikipedia.\nThis uses Google tag ban space.',
	
	func: fn('site:wikipedia.org '),
});

DBot.RegisterCommand({
	name: 'youtube',
	alias: ['ytube'],
	
	argNeeded: true,
	delay: 3,
	more: true,
	
	help_args: '<phrase>',
	desc: 'Search stuff in YouTube.\nThis uses Google tag ban space.',
	
	func: fn('site:youtube.com '),
});

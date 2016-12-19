
const child_process = require('child_process');
const spawn = child_process.spawn;
const fs = DBot.fs;

Util.mkdir(DBot.WebRoot + '/wall');

module.exports = {
	name: 'wall',
	alias: ['iwall', 'flatspace'],
	
	help_args: '<url>',
	desc: 'Creates a small flat space out of image',
	allowUserArgument: true,
	delay: 10,
	
	func: function(args, cmd, msg) {
		var url = args[0];
		
		if (typeof(url) == 'object') {
			url = url.avatarURL;
			
			if (!url) {
				return 'Specified user have no avatar? ;w;';
			}
		}
		
		url = url || DBot.LastURLImageInChannel(msg.channel);
		if (!url)
			return DBot.CommandError('Invalid url maybe? ;w;', 'wave', args, 1);
		
		if (!DBot.CheckURLImage(url))
			return DBot.CommandError('Invalid url maybe? ;w;', 'wave', args, 1);
		
		let hash = DBot.HashString(url);
		
		let fPath;
		
		let fPathProcessed = DBot.WebRoot + '/wall/' + hash + '.png';
		let fPathProcessedURL = DBot.URLRoot + '/wall/' + hash + '.png';
		
		msg.channel.startTyping();
		
		let ContinueFunc = function() {
			fs.stat(fPathProcessed, function(err, stat) {
				if (stat && stat.isFile()) {
					msg.channel.stopTyping();
					msg.reply(fPathProcessedURL);
				} else {
					let magik = spawn('convert', ['(', fPath, '-resize', '128', ')', '-virtual-pixel', 'tile', '-mattecolor', 'none', '-background', 'none', '-resize', '512x512!', '-distort', 'Perspective', '0,0,57,42  0,128,63,130  128,0,140,60  128,128,140,140', fPathProcessed]);
					
					Util.Redirect(magik);
					
					magik.on('close', function(code) {
						if (code == 0) {
							msg.channel.stopTyping();
							msg.reply(fPathProcessedURL);
						} else {
							msg.channel.stopTyping();
							msg.reply('Jump. Jump, Jump... *falls on the ground*');
						}
					});
				}
			});
		}
		
		DBot.LoadImageURL(url, function(newPath) {
			fPath = newPath;
			ContinueFunc();
		}, function(result) {
			msg.channel.stopTyping();
			
			msg.reply('Failed to download image. "HTTP Status Code: ' + (result.code || 'socket hangs up or connection timeout') + '"');
		});
	}
}
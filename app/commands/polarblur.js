
const child_process = require('child_process');
const spawn = child_process.spawn;
const URL = require('url');
var unirest = require('unirest');
var fs = DBot.fs;

fs.stat(DBot.WebRoot + '/polarblur', function(err, stat) {
	if (!stat)
		fs.mkdirSync(DBot.WebRoot + '/polarblur');
});

var allowed = [
	'jpeg',
	'jpg',
	'png',
	'tif',
	'bmp',
];

module.exports = {
	name: 'polarblur',
	alias: ['heartattack'],
	
	help_args: '<url>',
	desc: 'Makes blur to the center of image',
	allowUserArgument: true,
	delay: 3,
	
	func: function(args, cmd, msg) {
		var url = args[0];
		
		if (typeof(url) == 'object') {
			url = url.avatarURL;
			
			if (!url) {
				return 'Specified user have no avatar? ;w;';
			}
		}
		
		if (!url) {
			url = DBot.LastURLImageInChannel(msg.channel);
			
			if (!url) {
				return 'Invalid url maybe? ;w;' + Util.HighlightHelp(['polarblur'], 2, args);
			}
		}
		
		var hash = DBot.HashString(url);
		var uObj = URL.parse(url);
		var path = uObj.pathname;
		var split = path.split('.');
		var ext = split[split.length - 1].toLowerCase();
		
		if (!DBot.HaveValue(allowed, ext))
			return 'Invalid url maybe? ;w;' + Util.HighlightHelp(['polarblur'], 2, args);
		
		var fPath;
		
		var fPathProcessed = DBot.WebRoot + '/polarblur/' + hash + '.png';
		var fPathProcessedURL = DBot.URLRoot + '/polarblur/' + hash + '.png';
		
		msg.channel.startTyping();
		
		var ContinueFunc = function() {
			fs.stat(fPathProcessed, function(err, stat) {
				if (stat && stat.isFile()) {
					msg.channel.stopTyping();
					msg.reply(fPathProcessedURL);
				} else {
					var magik = spawn('bash', ['./resource/scripts/polarblur', '-r', '30', '-a', '0', fPath, fPathProcessed]);
					
					magik.stderr.on('data', function(data) {
						console.error(data.toString());
					});
					
					magik.stdout.on('data', function(data) {
						console.log(data.toString());
					});
					
					magik.on('close', function(code) {
						if (code == 0) {
							msg.reply(fPathProcessedURL);
						} else {
							msg.reply('Uh oh! You are trying to break me ;n; Why? ;n;');
						}
						
						msg.channel.stopTyping();
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
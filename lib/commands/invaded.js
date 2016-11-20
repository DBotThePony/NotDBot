
const child_process = require('child_process');
const spawn = child_process.spawn;
const URL = require('url');
var unirest = require('unirest');
var fs = DBot.fs;

fs.stat(DBot.WebRoot + '/invaded', function(err, stat) {
	if (!stat)
		fs.mkdir(DBot.WebRoot + '/invaded');
});

module.exports = {
	name: 'invaded',
	alias: ['invade'],
	
	help_args: '<user>',
	desc: 'INVASION',
	allowUserArgument: true,
	delay: 5,
	
	func: function(args, cmd, rawcmd, msg) {
		if (typeof(args[0]) != 'object')
			return 'Must be an user ;n;';
		
		var url = args[0].avatarURL;
		
		if (!url) {
			return 'User have no avatar? ;w;';
		}
		
		var hash = DBot.HashString(url);
		
		var fPath;
		
		var fPathProcessed = DBot.WebRoot + '/invaded/' + hash + '.png';
		var fPathProcessedTmp = DBot.WebRoot + '/invaded/' + hash + '_tmp.png';
		var fPathProcessedURL = DBot.URLRoot + '/invaded/' + hash + '.png';
		
		var msgNew;
		var iShouldDelete = false;
		
		msg.reply(DBot.GenerateWaitMessage()).then(function(i) {
			msgNew = i;
			
			if (iShouldDelete)
				msgNew.delete(0);
		});
		
		var ContinueFunc = function() {
			fs.stat(fPathProcessed, function(err, stat) {
				if (stat && stat.isFile()) {
					iShouldDelete = true;
					if (msgNew)
						msgNew.delete(0);
					
					msg.reply(fPathProcessedURL);
				} else {
					var magik = spawn('convert', [
						fPath,
						'-resize', '512x512',
						'-recolor', '.3 .1 .3 .3 .1 .3 .3 .1 .3',
						fPathProcessedTmp
					]);
					
					magik.stderr.on('data', function(data) {
						console.error(data.toString());
					});
					
					magik.stdout.on('data', function(data) {
						console.log(data.toString());
					});
					
					magik.on('close', function(code) {
						if (code == 0) {
							var magik = spawn('convert', [
								fPathProcessedTmp,
								'-draw', 'rectangle 0, 400, 512, 480',
								'-fill', 'black',
								'-gravity', 'South',
								'-fill', 'white',
								'-weight', 'Bold',
								'-pointsize', '24',
								'-draw', 'text 0,60 "' + args[0].username + ' has invaded!"',
								fPathProcessed
							]);
							
							magik.stderr.on('data', function(data) {
								console.error(data.toString());
							});
							
							magik.stdout.on('data', function(data) {
								console.log(data.toString());
							});
							
							magik.on('close', function(code) {
								fs.unlink(fPathProcessedTmp);
								
								if (code == 0) {
									msg.reply(fPathProcessedURL);
								} else {
									msg.reply('<internal pony error>');
								}
								
								iShouldDelete = true;
								if (msgNew)
									msgNew.delete(0);
							});
						} else {
							msg.reply('<internal pony error>');
							iShouldDelete = true;
							if (msgNew)
								msgNew.delete(0);
						}
					});
				}
			});
		}
		
		DBot.LoadImageURL(url, function(newPath) {
			fPath = newPath;
			ContinueFunc();
		});
	}
}
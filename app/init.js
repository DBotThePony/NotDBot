
sprintf = require("sprintf-js").sprintf;

DBot.fs = require('fs');
DBot.WebRoot = 'D:/www/derpco/bot';
DBot.URLRootBare = 'dbot.serealia.ca/bot';
DBot.URLRoot = 'https://' + DBot.URLRootBare;
DBot.DBot = '141004095145115648';

DBot.js = {};

DBot.js.child_process = require('child_process');
DBot.js.unirest = require('unirest');
DBot.js.fs = require('fs');
DBot.js.json3 = require('json3');
DBot.js.moment = require('moment');
DBot.js.numeral = require('numeral');
DBot.js.hDuration = require('humanize-duration');

DBot.fs = DBot.js.fs;

require('./lib/util.js');
require('./lib/hook.js');
require('./lib/sql_helpers.js');
require('./lib/sql.js');
require('./lib/imagick.js');
require('./lib/emoji.js');

require('./lib/cvars.js');
require('./generic.js');
require('./lib/tags.js');
require('./lib/commban.js');

require('./handler.js');
require('./commands.js');

require('./lib/confirm.js');

DBot.fs.readdirSync('./app/modules/').forEach(function(file) {
	var sp = file.split('.');
	if (!sp[1] || sp[1] != 'js')
		return;
	
	require('./modules/' + file);
});

DBot.START_STAMP = (new Date()).getTime() / 1000;


const Boards = [
	["/a/", "Anime & Manga"],
	["/c/", "Anime/Cute"],
	["/w/", "Anime/Wallpapers"],
	["/m/", "Mecha"],
	["/cgl/", "Cosplay & EGL"],
	["/cm/", "Cute/Male"],
	["/f/", "Flash"],
	["/n/", "Transportation"],
	["/jp/", "Otaku Culture"],
	["/v/", "Video Games"],
	["/vg/", "Video Game Generals"],
	["/vp/", "Pokemon"],
	["/vr/", "Retro Games"],
	["/co/", "Comics & Cartoons"],
	["/g/", "Technology"],
	["/tv/", "Television & Film"],
	["/k/", "Weapons"],
	["/o/", "Auto"],
	["/an/", "Animals & Nature"],
	["/tg/", "Traditional Games"],
	["/sp/", "Sports"],
	["/asp/", "Alternative Sports"],
	["/sci/", "Science & Math"],
	["/his/", "History & Humanities"],
	["/int/", "International"],
	["/out/", "Outdoors"],
	["/toy/", "Toys"],
	["/i/", "Oekaki"],
	["/po/", "Papercraft & Origami"],
	["/p/", "Photography"],
	["/ck/", "Food & Cooking"],
	["/ic/", "Artwork/Critique"],
	["/wg/", "Wallpapers/General"],
	["/lit/", "Literature"],
	["/mu/", "Music"],
	["/fa/", "Fashion"],
	["/3/", "3DCG"],
	["/gd/", "Graphic Design"],
	["/diy/", "Do-It-Yourself"],
	["/wsg/", "Worksafe GIF"],
	["/qst/", "Quests"],
	["/biz/", "Business & Finance"],
	["/trv/", "Travel"],
	["/fit/", "Fitness"],
	["/x/", "Paranormal"],
	["/adv/", "Advice"],
	["/lgbt/", "LGBT"],
	["/mlp/", "Pony"],
	["/news/", "Current News"],
	["/wsr/", "Worksafe Requests"],
	["/vip/", "Very Important Posts"],
];

const nsfwBoard = [
	["/b/", "Random"],
	["/r9k/", "ROBOT9001"],
	["/pol/", "Politically Incorrect"],
	["/soc/", "Cams & Meetups"],
	["/s4s/", "Shit 4chan Says"],
	["/s/", "Sexy Beautiful Women"],
	["/hc/", "Hardcore"],
	["/hm/", "Handsome Men"],
	["/h/", "Hentai"],
	["/e/", "Ecchi"],
	["/u/", "Yuri"],
	["/d/", "Hentai/Alternative"],
	["/y/", "Yaoi"],
	["/t/", "Torrents"],
	["/hr/", "High Resolution"],
	["/gif/", "Adult GIF"],
	["/aco/", "Adult Cartoons"],
	["/r/", "Adult Requests"],
];

let validBoards = [];
let defBans = [];
const fs = DBot.js.fs;
const JSON3 = DBot.js.json3;
const unirest = DBot.js.unirest;

for (let data of Boards) {
	let brd = data[0];
	validBoards.push(brd.substr(1, brd.length - 2));
}

for (let data of nsfwBoard) {
	let brd = data[0];
	validBoards.push(brd.substr(1, brd.length - 2));
	defBans.push(brd.substr(1, brd.length - 2));
}

DBot.CreateTagsSpace('4chan', defBans);
Util.mkdir(DBot.WebRoot + '/4chan');

let ClearPostCharsExp = new RegExp('<br>', 'g');
let ClearPostCharsExp2 = new RegExp('<[^>]*>', 'g');
let ClearPostCharsExp3 = new RegExp('&gt;', 'g');
let ClearPostCharsExp4 = new RegExp('&#039;', 'g');

let ClearPostChars = function(str) {
	return str
		.replace(ClearPostCharsExp, '\n')
		.replace(ClearPostCharsExp2, '')
		.replace(ClearPostCharsExp3, '>')
		.replace(ClearPostCharsExp4, '\'');
}

module.exports = {
	name: 'chan',
	alias: ['4chan'],
	
	help_args: '[board]',
	desc: 'Posts a random message from selected board.\nIf no board specified, random SFW board will be selected',
	
	more: true,
	
	func: function(args, cmd, msg, previousStuff) {
		args[0] = args[0] || Array.Random(Boards)[0];
		let board = args[0];
		board = board.toLowerCase();
		
		if (board.substr(0, 1) == '/') {
			board = board.substr(1);
		}
		
		if (board.substr(board.length - 1) == '/') {
			board = board.substr(0, board.length - 1);
		}
		
		let hit = false;
		
		for (let i in validBoards) {
			if (board == validBoards[i]) {
				hit = true;
				break;
			}
		}
		
		if (!hit)
			return 'Invalid board! 6.9';
		
		let ServerTags;
		let ClientTags = DBot.UserTags(msg.author, '4chan');
		let ChannelTags;
		
		if (!DBot.IsPM(msg)) {
			ChannelTags = DBot.ChannelTags(msg.channel, '4chan');
			ServerTags = DBot.ServerTags(msg.channel.guild, '4chan');
		}
		
		if (!(msg.channel.name || 'private').match('nsfw') && (ClientTags.isBanned(board) || ServerTags && ServerTags.isBanned(board) || ChannelTags && ChannelTags.isBanned(board)))
			return 'Board is banned by the server, channel or even you';
		
		msg.channel.startTyping();
		
		let ContinueLoad = function(data) {
			msg.channel.stopTyping();
			
			try {
				let validReplies = [];
				
				for (let i in data.threads) {
					let thread = data.threads[i];
					
					let imgID = thread.posts[0].tim;
					let imgEXT = thread.posts[0].ext;
					let threadPost = thread.posts[0].no;
					
					for (let i2 in thread.posts) {
						let post = thread.posts[i2];
						let text = post.com;
						let id = post.no;
						
						let pimgID = post.tim || null;
						let pimgEXT = post.ext || null;
						
						if (id && text && text.length < 1000) {
							validReplies.push([text, id, imgID, imgEXT, threadPost, pimgID, pimgEXT]);
						}
					}
				}
				
				let rand;
				
				if (previousStuff) {
					rand = Array.Random(validReplies.filter(function(item) {
						return !Util.HasValue(previousStuff, item[1]);
					}));
					
					if (!rand) {
						msg.reply('None of valid posts found because i listed them all.\nDo you want to reset search history by }retry ?');
						return
					}
					
					previousStuff.push(rand[1]);
				} else {
					rand = Array.Random(validReplies);
				}
				
				if (!rand) {
					msg.reply('No valid posts found ;n;');
					return;
				}
				
				let text = ClearPostChars(rand[0]);
				let reply = 'Board: /' + board + '/';
				
				reply += '\nRelated image: https://i.4cdn.org/' + board + '/' + rand[2] + rand[3] + '\n';
				
				reply += '```Post #' + rand[1];
				
				if (rand[5] && rand[5] != rand[2]) {
					reply += '\nReact image: https://i.4cdn.org/' + board + '/' + rand[5] + rand[6];
				}
				
				reply += '\n' + text + '```';
				
				msg.reply(reply);
			} catch(err) {
				msg.reply('<internal pony error>');
				console.error(err);
			}
		}
		
		let path = DBot.WebRoot + '/4chan/' + board + '.json';
		
		fs.stat(path, function(err, stat) {
			if (stat && ((stat.ctime.getTime() / 1000) > (UnixStamp() - 3600))) {
				fs.readFile(path, 'utf8', function(err, data) {
					ContinueLoad(JSON3.parse(data));
				});
			} else {
				unirest.get('http://api.4chan.org/' + board + '/1.json')
				.end(function(reply) {
					fs.writeFile(path, reply.raw_body);
					ContinueLoad(reply.body);
				});
			}
		});
	},
}

DBot.RegisterCommand({
	name: 'chanboards',
	alias: ['4chanboards', 'chanboard', '4chanboards'],
	
	help_args: '',
	desc: 'Lists valid boards',
	
	func: function(args, cmd, msg) {
		let build = '';
		
		for (let i in Boards) {
			build += Boards[i][0] + ' - ' + Boards[i][1] + '\n';
		}
		
		msg.author.sendMessage('Boards: \n```' + build + '```');
		
		if (!DBot.IsPM(msg))
			return 'Look into your PM';
	}
});

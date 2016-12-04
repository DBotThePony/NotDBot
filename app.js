
var stamp = (new Date()).getTime();

const Discord = require('discord.js');
const bot = new Discord.Client();
var token = "MjQ4NzU2MjM1ODg3ODM3MTk0.Cw8Xzg.wAxaM4qN6docKitkQe-PDud_IM0";

require('./lib/init.js');
DBot.bot = bot;
DBot.client = bot;
hook.RegisterEvents();
DBot.Discord = Discord;

bot.on('message', msg => {
	try {
		hook.Run('OnMessage', msg);
		
		if (DBot.IsMyMessage(msg))
			return;
		
		hook.Run('OnValidMessage', msg);
		
		if (!msg.author.bot) {
			var supp = hook.Run('OnHumanMessage', msg);
			
			if (supp === true)
				return;
		}
		
		try {
			if (msg.channel.type == 'dm') {
				DBot.HandleMessage(msg, true)
				return;
			}
		} catch(err) {
			msg.reply('<internal pony error>');
			console.error(err);
			return;
		}
		
		if (!DBot.IsAskingMe(msg))
			return;
		
		if (DBot.IsAskingMe(msg) && !DBot.IsAskingMe_Command(msg)) {
			msg.reply('Hi? x3 @NotDBot help or }help')
			return;
		}
		
		try {
			DBot.HandleMessage(msg);
		} catch(err) {
			msg.reply('<internal pony error>');
			console.error(err);
		}
	} catch(err) {
		console.error(err);
	}
});

var IS_INITIALIZED = false;
var LEVEL_OF_CONNECTION = 0;

DBot.IsOnline = function() {
	return LEVEL_OF_CONNECTION > 0;
}

IsOnline = DBot.IsOnline;

var loginFunc = function() {
	if (LEVEL_OF_CONNECTION > 0)
		return;
	
	if (LEVEL_OF_CONNECTION < 0)
		LEVEL_OF_CONNECTION = 0;
	
	if (!IS_INITIALIZED)
		return;
	
	bot.login(token)
	.then(function() {})
	.catch(function() {
		console.log('Reconnect failed. Retrying in 10 seconds');
	});
}

bot.on('disconnect', function() {
	LEVEL_OF_CONNECTION--;
	
	if (LEVEL_OF_CONNECTION > 0)
		return;
	
	if (LEVEL_OF_CONNECTION < 0)
		LEVEL_OF_CONNECTION = 0;
	
	if (!IS_INITIALIZED)
		return;
	
	console.log('Disconnected from servers!');
	
	hook.Run('OnDisconnected');
});

bot.login(token).then(function() {
	IS_INITIALIZED = true;
});

bot.on('ready', function() {
	LEVEL_OF_CONNECTION++;
	
	console.log('Connection established');
	DBot.InitVars();
	
	hook.Run('BotOnline', DBot.bot);
});

setInterval(loginFunc, 10000);

var nStamp = (new Date()).getTime();

console.log('Initialization complete in ' + (Math.floor((nStamp - stamp) * 100) / 100) + ' ms');

/*
// Message with Picture

Message {
  channel:
   TextChannel {
     type: 'text',
     id: '248758076662874113',
     name: 'general',
     position: 0,
     permissionOverwrites: Collection { _array: null, _keyArray: null },
     topic: null,
     lastMessageID: '249427054460665856',
     guild:
      Guild {
        members: [Object],
        channels: [Object],
        roles: [Object],
        available: true,
        id: '248758076662874113',
        name: 'Test Polygon',
        icon: null,
        splash: null,
        region: 'eu-central',
        memberCount: 2,
        large: undefined,
        presences: [Object],
        features: [],
        emojis: [Object],
        afkTimeout: 300,
        afkChannelID: null,
        embedEnabled: undefined,
        verificationLevel: 0,
        joinedTimestamp: 1479466649112,
        ownerID: '141004095145115648',
        _rawVoiceStates: [Object] },
     messages:
      Collection {
        '249428753418027009' => [Object],
        _array: null,
        _keyArray: null },
     _typing: Map {} },
  id: '249428753418027009',
  type: 'DEFAULT',
  content: '',
  author:
   User {
     id: '141004095145115648',
     username: 'DBot',
     discriminator: '6786',
     avatar: 'cb4e45f6b0945a87482e9ad602423182',
     bot: false },
  member:
   GuildMember {
     guild:
      Guild {
        members: [Object],
        channels: [Object],
        roles: [Object],
        available: true,
        id: '248758076662874113',
        name: 'Test Polygon',
        icon: null,
        splash: null,
        region: 'eu-central',
        memberCount: 2,
        large: undefined,
        presences: [Object],
        features: [],
        emojis: [Object],
        afkTimeout: 300,
        afkChannelID: null,
        embedEnabled: undefined,
        verificationLevel: 0,
        joinedTimestamp: 1479466649112,
        ownerID: '141004095145115648',
        _rawVoiceStates: [Object] },
     user:
      User {
        id: '141004095145115648',
        username: 'DBot',
        discriminator: '6786',
        avatar: 'cb4e45f6b0945a87482e9ad602423182',
        bot: false },
     _roles: [],
     serverDeaf: false,
     serverMute: false,
     selfMute: undefined,
     selfDeaf: undefined,
     voiceSessionID: undefined,
     voiceChannelID: undefined,
     speaking: false,
     nickname: null,
     joinedTimestamp: 1479378947202 },
  pinned: false,
  tts: false,
  nonce: null,
  system: false,
  embeds: [],
  attachments:
   Collection {
     '249428753418027008' => MessageAttachment {
     message: [Circular],
     id: '249428753418027008',
     filename: 'fail.jpg',
     filesize: 154018,
     url: 'https://cdn.discordapp.com/attachments/248758076662874113/249428753418027008/fail.jpg',
     proxyURL: 'https://images.discordapp.net/.eJwNyFEOgyAMANC7cAAKiNB5G4KIGFwJ7b6W3X3-vbyv-syuNnWKDN4A9saZ5q5ZaKZadCWqvaTRWGe6IYmkfN7lLQzOY1zRxBCCw-itXZ56-cfr4i0aF41BOFLr-hpV_f6enSFr.nulXh7FRs2DTOh4VP6BFua6fqFQ',
     height: 297,
     width: 668 },
     _array: null,
     _keyArray: null },
  createdTimestamp: 1479538848977,
  editedTimestamp: null,
  mentions:
   { users: Collection { _array: null, _keyArray: null },
     roles: Collection { _array: null, _keyArray: null },
     channels: Collection { _array: null, _keyArray: null },
     everyone: false },
  _edits: [] }

// Message in PM

Message {
  channel:
   DMChannel {
     type: 'dm',
     id: '248765438027235328',
     recipient:
      User {
        id: '141004095145115648',
        username: 'DBot',
        discriminator: '6786',
        avatar: 'cb4e45f6b0945a87482e9ad602423182',
        bot: false },
     lastMessageID: '248953669532254209',
     messages:
      Collection {
        '248953949011312640' => [Object],
        '248953950986960896' => [Object],
        _array: null,
        _keyArray: null },
     _typing: Map { '141004095145115648' => [Object] } },
  id: '248953950986960896',
  type: 'DEFAULT',
  content: 'Hold on',
  author:
   ClientUser {
     id: '248756235887837194',
     username: 'NotDBot',
     discriminator: '3061',
     avatar: null,
     bot: true,
     verified: true,
     email: null,
     localPresence: {},
     _typing: Map {},
     friends: Collection { _array: null, _keyArray: null },
     blocked: Collection { _array: null, _keyArray: null } },
  member: null,
  pinned: false,
  tts: false,
  nonce: null,
  system: false,
  embeds: [],
  attachments: Collection { _array: null, _keyArray: null },
  createdTimestamp: 1479425647256,
  editedTimestamp: null,
  mentions:
   { users: Collection { _array: null, _keyArray: null },
     roles: Collection { _array: null, _keyArray: null },
     channels: Collection { _array: null, _keyArray: null },
     everyone: false },
  _edits: [] }

// Public message

Message {
  channel:
   TextChannel {
     type: 'text',
     id: '248758076662874113',
     name: 'general',
     position: 0,
     permissionOverwrites: Collection { _array: null, _keyArray: null },
     topic: null,
     lastMessageID: '248978627755114498',
     guild:
      Guild {
        members: [Object],
        channels: [Object],
        roles: [Object],
        available: true,
        id: '248758076662874113',
        name: 'Test Polygon',
        icon: null,
        splash: null,
        region: 'eu-central',
        memberCount: 2,
        large: undefined,
        presences: [Object],
        features: [],
        emojis: [Object],
        afkTimeout: 300,
        afkChannelID: null,
        embedEnabled: undefined,
        verificationLevel: 0,
        joinedTimestamp: 1479378954744,
        ownerID: '141004095145115648',
        _rawVoiceStates: [Object] },
     messages:
      Collection {
        '249111488734822400' => [Object],
        _array: null,
        _keyArray: null },
     _typing: Map { '141004095145115648' => [Object] } },
  id: '249111488734822400',
  type: 'DEFAULT',
  content: 'Test message',
  author:
   User {
     id: '141004095145115648',
     username: 'DBot',
     discriminator: '6786',
     avatar: 'cb4e45f6b0945a87482e9ad602423182',
     bot: false },
  member:
   GuildMember {
     guild:
      Guild {
        members: [Object],
        channels: [Object],
        roles: [Object],
        available: true,
        id: '248758076662874113',
        name: 'Test Polygon',
        icon: null,
        splash: null,
        region: 'eu-central',
        memberCount: 2,
        large: undefined,
        presences: [Object],
        features: [],
        emojis: [Object],
        afkTimeout: 300,
        afkChannelID: null,
        embedEnabled: undefined,
        verificationLevel: 0,
        joinedTimestamp: 1479378954744,
        ownerID: '141004095145115648',
        _rawVoiceStates: [Object] },
     user:
      User {
        id: '141004095145115648',
        username: 'DBot',
        discriminator: '6786',
        avatar: 'cb4e45f6b0945a87482e9ad602423182',
        bot: false },
     _roles: [],
     serverDeaf: false,
     serverMute: false,
     selfMute: undefined,
     selfDeaf: undefined,
     voiceSessionID: undefined,
     voiceChannelID: undefined,
     speaking: false,
     nickname: null,
     joinedTimestamp: 1479378947202 },
  pinned: false,
  tts: false,
  nonce: '249111494350864384',
  system: false,
  embeds: [],
  attachments: Collection { _array: null, _keyArray: null },
  createdTimestamp: 1479463207182,
  editedTimestamp: null,
  mentions:
   { users: Collection { _array: null, _keyArray: null },
     roles: Collection { _array: null, _keyArray: null },
     channels: Collection { _array: null, _keyArray: null },
     everyone: false },
  _edits: [] }

// Messages collection
Collection {
  '249427054460665856' => Message {
  channel:
   TextChannel {
     type: 'text',
     id: '248758076662874113',
     name: 'general',
     position: 0,
     permissionOverwrites: [Object],
     topic: null,
     lastMessageID: '249322424154193921',
     guild: [Object],
     messages: [Circular],
     _typing: [Object] },
  id: '249427054460665856',
  type: 'DEFAULT',
  content: 'test',
  author:
   User {
     id: '141004095145115648',
     username: 'DBot',
     discriminator: '6786',
     avatar: 'cb4e45f6b0945a87482e9ad602423182',
     bot: false },
  member:
   GuildMember {
     guild: [Object],
     user: [Object],
     _roles: [],
     serverDeaf: false,
     serverMute: false,
     selfMute: undefined,
     selfDeaf: undefined,
     voiceSessionID: undefined,
     voiceChannelID: undefined,
     speaking: false,
     nickname: null,
     joinedTimestamp: 1479378947202 },
  pinned: false,
  tts: false,
  nonce: '249427064904482816',
  system: false,
  embeds: [],
  attachments: Collection { _array: null, _keyArray: null },
  createdTimestamp: 1479538443914,
  editedTimestamp: null,
  mentions:
   { users: [Object],
     roles: [Object],
     channels: [Object],
     everyone: false },
  _edits: [] },
  _array: null,
  _keyArray: null }

// Bot Client Representation

Client {
  domain: null,
  _events:
   { 'self.voiceServer': [Function: bound onVoiceServer],
     'self.voiceStateUpdate': [Function: bound onVoiceStateUpdate],
     message: [Function] },
  _eventsCount: 3,
  _maxListeners: undefined,
  options:
   { apiRequestMethod: 'sequential',
     shardId: 0,
     shardCount: 0,
     messageCacheMaxSize: 200,
     messageCacheLifetime: 0,
     messageSweepInterval: 0,
     fetchAllMembers: false,
     disableEveryone: false,
     restWsBridgeTimeout: 5000,
     disabledEvents: [],
     sync: false,
     ws:
      { large_threshold: 250,
        compress: true,
        properties: [Object],
        token: 'MjQ4NzU2MjM1ODg3ODM3MTk0.Cw8Xzg.wAxaM4qN6docKitkQe-PDud_IM0' } },
  rest:
   RESTManager {
     client: [Circular],
     handlers: { 'https://discordapp.com/api/v6/gateway': [Object] },
     userAgentManager: UserAgentManager { restManager: [Circular], _userAgent: [Object] },
     methods: RESTMethods { rest: [Circular] },
     rateLimitedEndpoints: {},
     globallyRateLimited: false },
  dataManager: ClientDataManager { client: [Circular] },
  manager:
   ClientManager {
     client: [Circular],
     heartbeatInterval:
      Timeout {
        _called: false,
        _idleTimeout: 41250,
        _idlePrev: [Object],
        _idleNext: [Object],
        _idleStart: 2059,
        _onTimeout: [Function: wrapper],
        _repeat: [Function] } },
  ws:
   WebSocketManager {
     domain: null,
     _events: { close: [Object] },
     _eventsCount: 1,
     _maxListeners: undefined,
     client: [Circular],
     packetManager: WebSocketPacketManager { ws: [Circular], handlers: [Object], queue: [] },
     status: 0,
     sessionID: '4385b79892d91d985c0d6a8f7c3252d5',
     sequence: 4,
     gateway: 'wss://gateway.discord.gg/?encoding=json&v=6',
     normalReady: true,
     ws:
      WebSocket {
        domain: null,
        _events: [Object],
        _eventsCount: 4,
        _maxListeners: undefined,
        _socket: [Object],
        _ultron: [Object],
        _closeReceived: false,
        bytesReceived: 5647,
        readyState: 1,
        supports: [Object],
        extensions: {},
        _binaryType: 'nodebuffer',
        _isServer: false,
        url: 'wss://gateway.discord.gg/?encoding=json&v=6',
        protocolVersion: 13,
        _receiver: [Object],
        _sender: [Object] },
     disabledEvents: {},
     first: false,
     _queue: [],
     _remaining: 2,
     reconnecting: false },
  resolver: ClientDataResolver { client: [Circular] },
  actions:
   ActionsManager {
     client: [Circular],
     MessageCreate: MessageCreateAction { client: [Circular] },
     MessageDelete: MessageDeleteAction { client: [Circular], deleted: Map {} },
     MessageDeleteBulk: MessageDeleteBulkAction { client: [Circular] },
     MessageUpdate: MessageUpdateAction { client: [Circular] },
     ChannelCreate: ChannelCreateAction { client: [Circular] },
     ChannelDelete: ChannelDeleteAction { client: [Circular], deleted: Map {} },
     ChannelUpdate: ChannelUpdateAction { client: [Circular] },
     GuildDelete: GuildDeleteAction { client: [Circular], deleted: Map {} },
     GuildUpdate: GuildUpdateAction { client: [Circular] },
     GuildMemberGet: GuildMemberGetAction { client: [Circular] },
     GuildMemberRemove: GuildMemberRemoveAction { client: [Circular], deleted: Map {} },
     GuildBanRemove: GuildBanRemove { client: [Circular] },
     GuildRoleCreate: GuildRoleCreate { client: [Circular] },
     GuildRoleDelete: GuildRoleDeleteAction { client: [Circular], deleted: Map {} },
     GuildRoleUpdate: GuildRoleUpdateAction { client: [Circular] },
     UserGet: UserGetAction { client: [Circular] },
     UserUpdate: UserUpdateAction { client: [Circular] },
     GuildSync: GuildSync { client: [Circular] },
     GuildEmojiCreate: EmojiCreateAction { client: [Circular] },
     GuildEmojiDelete: EmojiDeleteAction { client: [Circular] },
     GuildEmojiUpdate: GuildEmojiUpdateAction { client: [Circular] },
     GuildRolesPositionUpdate: GuildRolesPositionUpdate { client: [Circular] } },
  voice:
   ClientVoiceManager {
     client: [Circular],
     connections: Collection { _array: null, _keyArray: null },
     pending: Collection { _array: null, _keyArray: null } },
  shard: null,
  users:
   Collection {
     '248756235887837194' => ClientUser {
     id: '248756235887837194',
     username: 'NotDBot',
     discriminator: '3061',
     avatar: null,
     bot: true,
     verified: true,
     email: null,
     localPresence: {},
     _typing: Map {},
     friends: [Object],
     blocked: [Object] },
     '141004095145115648' => User {
     id: '141004095145115648',
     username: 'DBot',
     discriminator: '6786',
     avatar: 'cb4e45f6b0945a87482e9ad602423182',
     bot: false },
     '1' => User {
     id: '1',
     username: 'Clyde',
     discriminator: '0000',
     avatar: 'https://discordapp.com/assets/f78426a064bc9dd24847519259bc42af.png',
     bot: true },
     '72873733743710208' => User {
     id: '72873733743710208',
     username: 'TLF | Squishi',
     discriminator: '6057',
     avatar: 'cea4c5b5eb5340a53c77d70242754d61',
     bot: false },
     '76232498052345856' => User {
     id: '76232498052345856',
     username: 'Background',
     discriminator: '0512',
     avatar: '855bb834fad03a6578a416cd60c67c5f',
     bot: false },
     '101917868580429824' => User {
     id: '101917868580429824',
     username: 'ViantriZ',
     discriminator: '6984',
     avatar: '1100af65a75cdcae2ec211f44ffdfb6d',
     bot: false },
     '106938698938978304' => User {
     id: '106938698938978304',
     username: 'Gabriel',
     discriminator: '6427',
     avatar: 'a2a0371af5e6260254c1f7f341f4d616',
     bot: false },
     '109452348891344896' => User {
     id: '109452348891344896',
     username: 'Grey',
     discriminator: '5620',
     avatar: '611bfbef4fc30651534afc911b786f17',
     bot: false },
     '141013790945705984' => User {
     id: '141013790945705984',
     username: 'HastieQuad',
     discriminator: '9757',
     avatar: '2d2245254d68306ad356378b3329ecd8',
     bot: false },
     '142458237705388033' => User {
     id: '142458237705388033',
     username: 'Volken卐𝔊𝔬𝔱𝔱 𝔐𝔦𝔱 𝔘𝔫𝔰',
     discriminator: '1449',
     avatar: '7808e2e172109a47f686d0f4f5cd8ab2',
     bot: false },
     '170903342199865344' => User {
     id: '170903342199865344',
     username: 'NotSoBot',
     discriminator: '0997',
     avatar: '19ff683c7f255b62c21d9f33be9e97c6',
     bot: true },
     '189166658030534665' => User {
     id: '189166658030534665',
     username: 'Roflstomps',
     discriminator: '3358',
     avatar: '21ea2c04a4d95b5b95d21e8e0c69a877',
     bot: false },
     '248277105668784128' => User {
     id: '248277105668784128',
     username: 'Mugek',
     discriminator: '5175',
     avatar: '4cb289a31159914827efe23bde165ad1',
     bot: false },
     '158976906711007234' => User {
     id: '158976906711007234',
     username: 'lc50',
     discriminator: '2500',
     avatar: 'c83558447a280e2e03b2ee957ee0a917',
     bot: false },
     '172301568450887680' => User {
     id: '172301568450887680',
     username: '⅍₧⅝',
     discriminator: '0836',
     avatar: '2ab154ce9fb64e6cf3d00675cd16344f',
     bot: false },
     '187406062989606912' => User {
     id: '187406062989606912',
     username: 'Google',
     discriminator: '7426',
     avatar: '675ebb30eab805a939104fb49a3e3176',
     bot: true },
     '239361211932737548' => User {
     id: '239361211932737548',
     username: 'Advent',
     discriminator: '3400',
     avatar: null,
     bot: false },
     '240904131110240257' => User {
     id: '240904131110240257',
     username: 'XrossGaming',
     discriminator: '9782',
     avatar: null,
     bot: false },
     '242249568794836993' => User {
     id: '242249568794836993',
     username: 'Pyro',
     discriminator: '7332',
     avatar: 'fc5a5bf84956b389922685dbb635f3c1',
     bot: true },
     '242553199368601610' => User {
     id: '242553199368601610',
     username: 'ДЕФОЛТная персона',
     discriminator: '2428',
     avatar: '2b1326f5020909baf4544750b5015a0f',
     bot: false },
     '247387869897949184' => User {
     id: '247387869897949184',
     username: '❄WiL_JacK!❄',
     discriminator: '3151',
     avatar: '9fca4a110dc68a685c6fa74e624341f0',
     bot: false },
     '247611774335975424' => User {
     id: '247611774335975424',
     username: 'gluestic',
     discriminator: '6170',
     avatar: 'f72dc3f1e6a54354dc11c1a4008fb031',
     bot: false },
     '247678295632642049' => User {
     id: '247678295632642049',
     username: 'Игл Игловый Иголович',
     discriminator: '7213',
     avatar: 'a899fbfa75974616f5994f74763cf7e4',
     bot: false },
     '248024147479887872' => User {
     id: '248024147479887872',
     username: 'Mav',
     discriminator: '7370',
     avatar: null,
     bot: false },
     '248027554139734016' => User {
     id: '248027554139734016',
     username: 'Фиш',
     discriminator: '5687',
     avatar: '75470bcaf373c39eef3f4bb47a26d517',
     bot: false },
     '248040665257082880' => User {
     id: '248040665257082880',
     username: 'СпеепС',
     discriminator: '2101',
     avatar: null,
     bot: false },
     '248056372766310400' => User {
     id: '248056372766310400',
     username: 'Артём',
     discriminator: '7576',
     avatar: null,
     bot: false },
     '248057415659028480' => User {
     id: '248057415659028480',
     username: 'Nike73',
     discriminator: '1433',
     avatar: 'd76dbe8b12aebb3e5aeea4a68a2addf7',
     bot: false },
     '248059117862649856' => User {
     id: '248059117862649856',
     username: 'DragonZetGamer',
     discriminator: '9483',
     avatar: 'e2ab0494ad30f207343b2d9d91815ee5',
     bot: false },
     '248059540996751360' => User {
     id: '248059540996751360',
     username: 'mr.babls',
     discriminator: '4206',
     avatar: '1423cb5dc64bc8518ac12ceadf00cd31',
     bot: false },
     '248065026462580736' => User {
     id: '248065026462580736',
     username: 'Шаден',
     discriminator: '0135',
     avatar: '54b641e6973d7087b75d90271a1faf56',
     bot: false },
     '248311556700504065' => User {
     id: '248311556700504065',
     username: 'nik-erema',
     discriminator: '4093',
     avatar: '2a8f257cafdee1d690a8da43841475b7',
     bot: false },
     _array: null,
     _keyArray: null },
  guilds:
   Collection {
     '247380566796795904' => Guild {
     members: [Object],
     channels: [Object],
     roles: [Object],
     available: true,
     id: '247380566796795904',
     name: 'Trade-Lief FUN TF2 Server',
     icon: null,
     splash: null,
     region: 'eu-central',
     memberCount: 22,
     large: undefined,
     presences: [Object],
     features: [],
     emojis: [Object],
     afkTimeout: 300,
     afkChannelID: '248062367420645376',
     embedEnabled: undefined,
     verificationLevel: 0,
     joinedTimestamp: 1479446250385,
     ownerID: '141004095145115648',
     _rawVoiceStates: [Object] },
     '248231299536388096' => Guild {
     members: [Object],
     channels: [Object],
     roles: [Object],
     available: true,
     id: '248231299536388096',
     name: 'DBot\'s Virtual World',
     icon: '8ecd2cd8f62376b7fc9fb8740968d613',
     splash: null,
     region: 'eu-central',
     memberCount: 12,
     large: undefined,
     presences: [Object],
     features: [],
     emojis: [Object],
     afkTimeout: 300,
     afkChannelID: null,
     embedEnabled: undefined,
     verificationLevel: 0,
     joinedTimestamp: 1479431539068,
     ownerID: '141004095145115648',
     _rawVoiceStates: [Object] },
     '248758076662874113' => Guild {
     members: [Object],
     channels: [Object],
     roles: [Object],
     available: true,
     id: '248758076662874113',
     name: 'Test Polygon',
     icon: null,
     splash: null,
     region: 'eu-central',
     memberCount: 2,
     large: undefined,
     presences: [Object],
     features: [],
     emojis: [Object],
     afkTimeout: 300,
     afkChannelID: null,
     embedEnabled: undefined,
     verificationLevel: 0,
     joinedTimestamp: 1479378954744,
     ownerID: '141004095145115648',
     _rawVoiceStates: [Object] },
     _array: null,
     _keyArray: null },
  channels:
   Collection {
     '248765438027235328' => DMChannel {
     type: 'dm',
     id: '248765438027235328',
     recipient: [Object],
     lastMessageID: '249108592269983745',
     messages: [Object],
     _typing: Map {} },
     '248758076662874113' => TextChannel {
     type: 'text',
     id: '248758076662874113',
     name: 'general',
     position: 0,
     permissionOverwrites: [Object],
     topic: null,
     lastMessageID: '249111488734822400',
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     '248758076662874114' => VoiceChannel {
     type: 'voice',
     id: '248758076662874114',
     name: 'General',
     position: 0,
     permissionOverwrites: [Object],
     bitrate: 64000,
     userLimit: 0,
     guild: [Object],
     members: [Object] },
     '248231299536388096' => TextChannel {
     type: 'text',
     id: '248231299536388096',
     name: 'general',
     position: 1,
     permissionOverwrites: [Object],
     topic: 'MAKE RUSSIA GREAT AGAIN',
     lastMessageID: '248997911428464640',
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     '248231299536388097' => VoiceChannel {
     type: 'voice',
     id: '248231299536388097',
     name: 'General',
     position: 0,
     permissionOverwrites: [Object],
     bitrate: 64000,
     userLimit: 0,
     guild: [Object],
     members: [Object] },
     '248231741477617664' => TextChannel {
     type: 'text',
     id: '248231741477617664',
     name: 'picture',
     position: 2,
     permissionOverwrites: [Object],
     topic: null,
     lastMessageID: '249029954715648000',
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     '248231769948684289' => TextChannel {
     type: 'text',
     id: '248231769948684289',
     name: 'shitposting',
     position: 3,
     permissionOverwrites: [Object],
     topic: null,
     lastMessageID: null,
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     '248231782506299393' => TextChannel {
     type: 'text',
     id: '248231782506299393',
     name: 'nsfw',
     position: 4,
     permissionOverwrites: [Object],
     topic: null,
     lastMessageID: null,
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     '248231803993718784' => TextChannel {
     type: 'text',
     id: '248231803993718784',
     name: 'private',
     position: 5,
     permissionOverwrites: [Object],
     topic: '',
     lastMessageID: null,
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     '248231972629905408' => VoiceChannel {
     type: 'voice',
     id: '248231972629905408',
     name: 'Teh Room #1',
     position: 1,
     permissionOverwrites: [Object],
     bitrate: 64000,
     userLimit: 0,
     guild: [Object],
     members: [Object] },
     '248231993924386816' => VoiceChannel {
     type: 'voice',
     id: '248231993924386816',
     name: 'Teh Room #2',
     position: 2,
     permissionOverwrites: [Object],
     bitrate: 64000,
     userLimit: 0,
     guild: [Object],
     members: [Object] },
     '248232012479987714' => VoiceChannel {
     type: 'voice',
     id: '248232012479987714',
     name: 'Teh Room #3',
     position: 3,
     permissionOverwrites: [Object],
     bitrate: 64000,
     userLimit: 0,
     guild: [Object],
     members: [Object] },
     '248232073964290049' => TextChannel {
     type: 'text',
     id: '248232073964290049',
     name: 'changelog',
     position: 0,
     permissionOverwrites: [Object],
     topic: '',
     lastMessageID: '248235264160301057',
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     '247380566796795904' => TextChannel {
     type: 'text',
     id: '247380566796795904',
     name: 'general',
     position: 0,
     permissionOverwrites: [Object],
     topic: '',
     lastMessageID: '249040718276984832',
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     '247380566796795905' => VoiceChannel {
     type: 'voice',
     id: '247380566796795905',
     name: 'General',
     position: 0,
     permissionOverwrites: [Object],
     bitrate: 64000,
     userLimit: 0,
     guild: [Object],
     members: [Object] },
     '247382250356867082' => TextChannel {
     type: 'text',
     id: '247382250356867082',
     name: 'picture',
     position: 1,
     permissionOverwrites: [Object],
     topic: 'https://images-2.discordapp.net/eyJ1cmwiOiJodHRwczovL2Rpc2NvcmQuc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9hdHRhY2htZW50cy8yNDczODA1NjY3OTY3OTU5MDQvMjQ3MzgxMjQ2MjU3MjY2Njg4L2FXb2RCdkhUX2pVLmpwZyJ9.jNPRX2iEmm8lSCoa7dzTZqF_BWc',
     lastMessageID: '248839451252490240',
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     '247384281964478464' => TextChannel {
     type: 'text',
     id: '247384281964478464',
     name: 'halp',
     position: 2,
     permissionOverwrites: [Object],
     topic: '',
     lastMessageID: null,
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     '247384320191234049' => TextChannel {
     type: 'text',
     id: '247384320191234049',
     name: 'shitposting',
     position: 3,
     permissionOverwrites: [Object],
     topic: null,
     lastMessageID: '248087834890600449',
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     '247501052805513219' => TextChannel {
     type: 'text',
     id: '247501052805513219',
     name: 'odmin_chat',
     position: 4,
     permissionOverwrites: [Object],
     topic: null,
     lastMessageID: '248452794326056962',
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     '247501429185445889' => TextChannel {
     type: 'text',
     id: '247501429185445889',
     name: 'private',
     position: 5,
     permissionOverwrites: [Object],
     topic: '',
     lastMessageID: '248828766552457216',
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     '247688868432707584' => VoiceChannel {
     type: 'voice',
     id: '247688868432707584',
     name: 'Gaem Room #1',
     position: 1,
     permissionOverwrites: [Object],
     bitrate: 64000,
     userLimit: 0,
     guild: [Object],
     members: [Object] },
     '247688890075316224' => VoiceChannel {
     type: 'voice',
     id: '247688890075316224',
     name: 'Gaem Room #2',
     position: 2,
     permissionOverwrites: [Object],
     bitrate: 64000,
     userLimit: 0,
     guild: [Object],
     members: [Object] },
     '247688917896265728' => VoiceChannel {
     type: 'voice',
     id: '247688917896265728',
     name: 'Gaem Room #3',
     position: 3,
     permissionOverwrites: [Object],
     bitrate: 64000,
     userLimit: 0,
     guild: [Object],
     members: [Object] },
     '248062367420645376' => VoiceChannel {
     type: 'voice',
     id: '248062367420645376',
     name: 'Silence',
     position: 4,
     permissionOverwrites: [Object],
     bitrate: 64000,
     userLimit: 0,
     guild: [Object],
     members: [Object] },
     '248064052297859072' => TextChannel {
     type: 'text',
     id: '248064052297859072',
     name: 'nsfw',
     position: 6,
     permissionOverwrites: [Object],
     topic: null,
     lastMessageID: '248112266254221312',
     guild: [Object],
     messages: [Object],
     _typing: Map {} },
     _array: null,
     _keyArray: null },
  presences: Collection { _array: null, _keyArray: null },
  token: 'MjQ4NzU2MjM1ODg3ODM3MTk0.Cw8Xzg.wAxaM4qN6docKitkQe-PDud_IM0',
  email: null,
  password: null,
  user:
   ClientUser {
     id: '248756235887837194',
     username: 'NotDBot',
     discriminator: '3061',
     avatar: null,
     bot: true,
     verified: true,
     email: null,
     localPresence: {},
     _typing: Map {},
     friends: Collection { _array: null, _keyArray: null },
     blocked: Collection { _array: null, _keyArray: null } },
  readyAt: 2016-11-18T10:14:27.691Z,
  _timeouts:
   Set {
     Timeout {
     _called: false,
     _idleTimeout: 1000,
     _idlePrev: [Object],
     _idleNext: [Object],
     _idleStart: 2055,
     _onTimeout: [Function],
     _repeat: null },
     Timeout {
     _called: false,
     _idleTimeout: 3600,
     _idlePrev: [Object],
     _idleNext: [Object],
     _idleStart: 2270,
     _onTimeout: [Function],
     _repeat: null } },
  _intervals:
   Set {
     Timeout {
     _called: false,
     _idleTimeout: 41250,
     _idlePrev: [Object],
     _idleNext: [Object],
     _idleStart: 2059,
     _onTimeout: [Function: wrapper],
     _repeat: [Function] } } }
*/

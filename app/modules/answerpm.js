
const hellows = [
	'hi',
	'hello',
	'privet',
	'������',
	'���',
	'����',
	'hoi',
];

let __hello = [];

for (let i in hellows) {
	__hello[i] = new RegExp('^' + hellows[i], 'i');
}

hook.Add('OnHumanMessage', 'AnswerPMHello', function(msg) {
	if (!DBot.IsPM(msg))
		return;
	
	let message = msg.content;
	
	for (let i in __hello) {
		if (message.match(__hello[i])) {
			msg.reply('Hellow pony stranger x3. You can get help by typing help');
			return true;
		}
	}
});

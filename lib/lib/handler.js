
DLib.ParseString = function(str) {
	var charset = str.split('');
	var nextHaveNoAction = false;
	var output = [];
	var current = '';
	var inDouble = false;
	var inSingle = false;
	
	charset.forEach(function(item) {
		console.log(item);
		if (nextHaveNoAction) {
			nextHaveNoAction = false;
			current += item;
			return;
		}
		
		if (item == ' ' && !inDouble && !inSingle) {
			output.push(current);
			current = '';
			return;
		}
		
		if (item == '\\') {
			nextHaveNoAction = true;
			return;
		}
		
		if (item == '"') {
			if (inDouble) {
				if (inSingle) {
					current += item;
				} else {
					output.push(current);
					current = '';
					inDouble = false;
				}
			} else {
				if (inSingle) {
					current += item;
				} else {
					inDouble = true;
				}
			}
			
			return;
		}
		
		if (item == '\'') {
			if (inSingle) {
				if (inDouble) {
					current += item;
				} else {
					output.push(current);
					current = '';
					inSingle = false;
				}
			} else {
				if (inDouble) {
					current += item;
				} else {
					inSingle = true;
				}
			}
			
			return;
		}
		
		current += item;
	});
	
	output.push(current);
	
	return output;
}

DLib.HandleMessage = function(msg) {
	var rawmessage = msg.content;
	var splitted = rawmessage.split(' ');
	var command = splitted[1].toLowerCase();
	
	/*
	splitted[0] = Our ID
	splitted[1] = Command
	splitted[...] = arguments
	*/
	
	if (!DLib.Commands[command]) {
		msg.reply('I don\'t know what to do with that :\\');
		return;
	}
	
	var rawcmd = '';
	var first = true;
	
	for (i = 2; i < splitted.length; i++) {
		if (first) {
			rawcmd = splitted[i];
		} else
			rawcmd += ' ' + splitted[i];
	}
	
	var parsedArgs = DLib.ParseString(rawcmd);
}
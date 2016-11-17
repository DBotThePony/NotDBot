var Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command({
	name: "reverse",
	desc: "reverse a phrase",
	fn: (argv, context) => {
		// This output will be redirected to your app's onReply function
		if (!argv.args.phrase)
			return 'No string to reverse';
		
		console.log(argv.args);
		
		var p = argv.args.phrase;
		var len = p.length;
		
		var output = '';
		
		if (argv.flags.soft) {
			var split = p.split(' ');
			
			split.forEach(function(item) {
				var len = item.length;
				
				for (i = len - 1; i >= 0; i--) {
					output += item[i];
				}
				
				output += ' ';
			});
		} else {
			for (i = len - 1; i >= 0; i--) {
				output += p[i];
			}
		}
		
		return output;
	},
	
	args: [
		{
		  name: 'phrase',
		  desc: 'Phrase to reverse',
		  type: 'string',
		  required: true,
		  default: ''
		}
	],
	
	flags: [
		{
		  name: 'soft',
		  desc: 'Reverse word-by-word',
		  alias: 's',
		  type: 'boolean',
		  default: false
		}
	]
});


hook = {};
hook.Table = {};

hook.Add = function(event, id, func) {
	if (!event)
		return;
	
	if (!id)
		return;
	
	if (!func)
		return;
	
	if (!hook.Table[event])
		hook.Table[event] = {};
	
	hook.Table[event][id] = func;
}

hook.Remove = function(event, id) {
	if (!hook.Table[event])
		return;
	
	hook.Table[event][id] = undefined;
}

hook.Call = function(event, A, B, C, D, E, F, G) {
	if (!hook.Table[event])
		return;
	
	for (var k in hook.Table[event]) {
		var func = hook.Table[event][k];
		var reply = func(A, B, C, D, E, F, G);
		
		if (reply != undefined)
			return reply;
	}
}

hook.Run = hook.Call

hook.GetTable = function() {
	return hook.Table;
}
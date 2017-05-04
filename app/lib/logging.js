

// 
// Copyright (C) 2016-2017 DBot. All other content, that was used, but not created in this project, is licensed under their own licenses, and belong to their authors.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
//  
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// 

'use strict';

const myGlobals = require('../globals.js');
const hook = myGlobals.hook;
const DBot = myGlobals.DBot;
const sql = myGlobals.sql;
const IMagick = myGlobals.IMagick;
const Util = myGlobals.Util;
const cvars = myGlobals.cvars;
const Postgres = myGlobals.Postgres;

const fs = require('fs');

fs.mkdir('./logs', err => {
	fs.mkdir('./logs/error', err => {});
	fs.mkdir('./logs/commands', err => {});
	fs.mkdir('./logs/console', err => {});

	if (myGlobals.LOG_FILE_ERROR)
		fs.close(myGlobals.LOG_FILE_ERROR, err => console.errHandler);

	if (myGlobals.LOG_FILE_COMMANDS)
		fs.close(myGlobals.LOG_FILE_COMMANDS, err => console.errHandler);

	if (myGlobals.LOG_FILE_CONSOLE)
		fs.close(myGlobals.LOG_FILE_CONSOLE, err => console.errHandler);
	
	const cDate = new Date();
	const fileStr = `${cDate.getSeconds()}-${cDate.getMinutes()}-${cDate.getHours()}-${cDate.getDate()}_${cDate.getMonth() + 1}_${cDate.getFullYear()}`;
	fs.open(`./logs/error/${fileStr}.log`, 'a', (err, fd) => {
		myGlobals.LOG_FILE_ERROR = fd;
	});

	fs.open(`./logs/commands/${fileStr}.log`, 'a', (err, fd) => {
		myGlobals.LOG_FILE_COMMANDS = fd;
	});

	fs.open(`./logs/console/${fileStr}.log`, 'a', (err, fd) => {
		myGlobals.LOG_FILE_CONSOLE = fd;
	});
});

hook.Add('OnError', 'Logging', (args) => {
	if (!myGlobals.LOG_FILE_ERROR) return;

	for (let arg of args) {
		fs.write(myGlobals.LOG_FILE_ERROR, arg.toString(), err => {});
	}

	fs.write(myGlobals.LOG_FILE_ERROR, '\n', err => {});
});

hook.Add('OnPrint', 'Logging', (args) => {
	if (!myGlobals.LOG_FILE_CONSOLE) return;

	for (let arg of args) {
		fs.write(myGlobals.LOG_FILE_CONSOLE, arg.toString(), err => {});
	}

	fs.write(myGlobals.LOG_FILE_CONSOLE, '\n', err => {});
});

hook.Add('CommandExecuted', 'Logging', (id, author, parsedArgs, rawcmd, msg, extraArgument, parsedHandlers, currentFuncObj) => {
	if (!myGlobals.LOG_FILE_COMMANDS) return;
	const date = (new Date()).toString();

	if (currentFuncObj.server)
		fs.write(myGlobals.LOG_FILE_COMMANDS, `[${date}] ${author.username}<${author.id}> executed command '${id}' in ${currentFuncObj.channel.name}<${currentFuncObj.channel.id}>(${currentFuncObj.server.name}<${currentFuncObj.server.id}>)`, err => {});
	else
		fs.write(myGlobals.LOG_FILE_COMMANDS, `[${date}] ${author.username}<${author.id}> executed command '${id}' in PM`, err => {});
});

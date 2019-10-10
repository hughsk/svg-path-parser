// v1.0 exported just the parser function. To maintain backwards compatibility,
// we export additional named features as properties of that function.
var parserFunction = require('./parser.js').parse;
parserFunction.composeSVG = composeSVG;
parserFunction.parseSVG = parserFunction;
parserFunction.makeAbsolute = makeSVGPathCommandsAbsolute;
parserFunction.mapCommandToString = mapCommandToString;

module.exports = parserFunction;

function makeSVGPathCommandsAbsolute(commands) {
	var subpathStart, prevCmd={x:0,y:0};
	var attr = {x:'x0',y:'y0',x1:'x0',y1:'y0',x2:'x0',y2:'y0'};
	commands.forEach(function(cmd) {
		if (cmd.command==='moveto') subpathStart=cmd;
		cmd.x0=prevCmd.x; cmd.y0=prevCmd.y;
		for (var a in attr) if (a in cmd) cmd[a] += cmd.relative ? cmd[attr[a]] : 0;
		if (!('x' in cmd)) cmd.x = prevCmd.x; // V
		if (!('y' in cmd)) cmd.y = prevCmd.y; // X
		cmd.relative = false;
		cmd.code = cmd.code.toUpperCase();
		if (cmd.command=='closepath') {
			cmd.x = subpathStart.x;
			cmd.y = subpathStart.y;
		}
		prevCmd = cmd;
	});
	return commands;
}

function mapCommandToString (cmd) {
	var boolToInt = function (bool) {
		return bool ? 1 : 0;
	};
	var arrayToCommandString = function (array) {
		return array.map(function(coords) { return coords.join(',')}).join(' ');
	};
	if (cmd.code.toLowerCase() === 'a') {
		return cmd.code +
			arrayToCommandString([[cmd.rx, cmd.ry], [cmd.xAxisRotation], [boolToInt(cmd.largeArc), boolToInt(cmd.sweep)], [cmd.x, cmd.y]]);
	}
	var axisCommandIndex = ['v', 'h'].indexOf(cmd.code.toLowerCase());
	if (axisCommandIndex !== -1) {
		var lengthAttr = axisCommandIndex === 0 ? 'y' : 'x';
		return cmd.code + cmd[lengthAttr];
	}

	if (cmd.code === 'Z') { return cmd.code; }

	var intermediaryPointsIndices = Object.keys(cmd)
		.filter(function(key){ return key.indexOf('x') === 0 && key.length === 2})
		.map(function(key){ return key.replace(/\D/g,'')}).sort();

	return cmd.code + arrayToCommandString(intermediaryPointsIndices.concat([''])
		.map(function (strIndex) { return [cmd['x' + strIndex], cmd['y' + strIndex]]; }));
}

function composeSVG (commandList) {
	return commandList.map(mapCommandToString).join(' ');
}

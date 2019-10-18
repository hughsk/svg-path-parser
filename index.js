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
				arrayToCommandString([cmd.radius, [cmd.xAxisRotation], cmd.flags.map(boolToInt), cmd.to]);
	}
	var axisCommandIndex = ['v', 'h'].indexOf(cmd.code.toLowerCase());
	if (axisCommandIndex !== -1) {
		return cmd.code + cmd.value;
	}

	if (cmd.code === 'Z') { return cmd.code; }

	var points = [];
	if (cmd.ctrl1) { points.push(cmd.ctrl1); }
	if (cmd.ctrl2) { points.push(cmd.ctrl2); }
	points.push(cmd.to);

	return cmd.code + arrayToCommandString(points);
}

function composeSVG (commandList) {
	return commandList.map(mapCommandToString).join(' ');
}

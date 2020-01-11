// v1.0 exported just the parser function. To maintain backwards compatibility,
// we export additional named features as properties of that function.
var parserFunction = require('./parser.js').parse;
parserFunction.composeSVG = composeSVG;
parserFunction.parseSVG = parserFunction;

parserFunction.mapCommandToString = mapCommandToString;

module.exports = parserFunction;

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

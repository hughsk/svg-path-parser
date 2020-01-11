## About this fork
This fork changes the shape of command data (see below) in order to reduce extraneous information that can be derived through helper functions (e.g. relative), and to encapsulate x/y related data into arrays for more convenient use with geometric abstractions through parameter splatting e.g. `new Point(...cmd.to)`.

### Interface changes
* add `composeSVG` which accepts an array of commands and returns an svg d attribute.
* add `mapCommandToString` which converts a single command object into its d command string.  
* removes `makeSVGPathCommandsAbsolute` as it is designed to favor absolute commands in conjunction with mathematical and path abstractions.

# svg-path-parser [![stable](http://hughsk.github.io/stability-badges/dist/stable.svg)](http://github.com/hughsk/stability-badges) #

An SVG path parser, originally built from the [PEG.js](http://pegjs.majda.cz/) grammar
specified [here](http://pastie.org/1036541), published as an NPM module.

Grammar originally written by [Gavin Kistner](http://github.com/Phrogz).

[![svg-path-parser](https://nodei.co/npm/svg-path-parser.png?mini=true)](https://nodei.co/npm/svg-path-parser)

## Usage ##

### `require('svg-path-parser')(d)` ###

Takes an SVG path string. The following code…

``` javascript
var parseSVG = require('svg-path-parser');
var d='M3,7 5-6 L1,7 1e2-.4 m-10,10 l10,0  \
  V27 89 H23           v10 h10             \
  C33,43 38,47 43,47   c0,5 5,10 10,10     \
  S63,67 63,67         s-10,10 10,10       \
  Q50,50 73,57         q20,-5 0,-10        \
  T70,40               t0,-15              \
  A5,5 45 1,0 40,20    a5,5 20 0,1 -10-10  Z';
console.log(parseSVG(d));
```

…will yield an array of commands that define the path, like so:

``` javascript
[
  { "code": "M", "to": [ 3, 7 ] },
  { "code": "L", "to": [ 5, -6 ] },
  { "code": "L", "to": [ 1, 7 ] },
  { "code": "L", "to": [ 100, -0.4 ] },
  { "code": "m", "to": [ -10, 10 ] },
  { "code": "l", "to": [ 10, 0 ] },
  { "code": "V", "value": 27 },
  { "code": "V", "value": 89 },
  { "code": "H", "value": 23 },
  { "code": "v", "value": 10 },
  { "code": "h", "value": 10 },
  { "code": "C", "to": [ 43, 47 ], "ctrl1": [ 33, 43 ], "ctrl2": [ 38, 47 ] },
  { "code": "c", "to": [ 10, 10 ], "ctrl1": [ 0, 5 ], "ctrl2": [ 5, 10 ] },
  { "code": "S", "to": [ 63, 67 ], "ctrl2": [ 63, 67 ] },
  { "code": "s", "to": [ 10, 10 ], "ctrl2": [ -10, 10 ] },
  { "code": "Q", "to": [ 73, 57 ], "ctrl1": [ 50, 50 ] },
  { "code": "q", "to": [ 0, -10 ], "ctrl1": [ 20, -5 ] },
  { "code": "T", "to": [ 70, 40 ] },
  { "code": "t", "to": [ 0, -15 ] },
  { "code": "A", "to": [ 40, 20 ], "radius": [ 5, 5 ], "flags": [ true, false ], "xAxisRotation": 45 },
  { "code": "a", "to": [ -10, -10 ], "radius": [ 5, 5 ], "flags": [ false, true ], "xAxisRotation": 20 },
  { "code": "Z" }
]
```

Alternatively, from version 1.1 on, the module exports multiple functions that you can separately use:

```js
const {parseSVG, composeSVG, mapCommandToString} = require('svg-path-parser');
```

## History

### v1.1.0 - 2017-Jun-19
+ Add `makeAbsolute(cmds)`.

### v1.0.2 - 2017-Mar-1
+ Update package to allow latest PEGJS versions (was locked to v0.7.x).
+ Fix bug preventing parsing errors from appearing for newer PEGJS. (Issue #9)

### v1.0.1 - 2014-Oct-30
+ Fix bug that prevented more than two subpaths from being returned.

### v1.0.0 - 2014-Oct-12
+ Changed return values to represent each unique path command as its own object,
  regardless of whether the markup merged them or not. Arguments for a command
  (e.g. `.x`) are no longer in a `.args` array of values, but are instead part
  of the command object itself.

### v0.0.4 - 2014-Oct-10
+ Unroll recursive grammar descriptions that could cause parsing a large path to overflow the stack.

### v0.0.3 - 2014-Oct-1
+ Fix bug that prevented parsing some valid documents.

### v0.0.2 - 2014-Oct-1
+ Fix parsing of numbers other than integers to work.
+ First `moveto` command is always absolute.
+ Additional coordinates after moveto are treated as lineto.

## License

This library is released under an MIT-style license. That generally means that you are free to do almost anything you want with it as long as you give a bit of credit where credit is due. See the LICENSE file included for the actual legal limitations.

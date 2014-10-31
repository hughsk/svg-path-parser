# svg-path-parser [![stable](http://hughsk.github.io/stability-badges/dist/stable.svg)](http://github.com/hughsk/stability-badges) #

An SVG path parser, originally built from the [PEG.js](http://pegjs.majda.cz/) grammar
specified [here](http://pastie.org/1036541), published as an NPM module.

Grammar originally written by [Gavin Kistner](http://github.com/Phrogz).

[![svg-path-parser](https://nodei.co/npm/svg-path-parser.png?mini=true)](https://nodei.co/npm/svg-path-parser)

## Usage ##

### `require('svg-path-parser')(d)` ###

Takes an SVG path string. The following code…

``` javascript
var parse = require('svg-path-parser');
var d='M3,7 5-6 L1,7 1e2-.4 m-10,10 l10,0  \
  V27 89 H23           v10 h10             \
  C33,43 38,47 43,47   c0,5 5,10 10,10     \
  S63,67 63,67         s-10,10 10,10       \
  Q50,50 73,57         q20,-5 0,-10        \
  T70,40               t0,-15              \
  A5,5 45 1,0 40,20    a5,5 20 0,1 -10-10  Z';
console.log(parse(d));
```

…will yield an array of commands that define the path, like so:

``` javascript
[
  { code:'M', command:'moveto', x:3, y:7 },
  { code:'L', command:'lineto', x:5, y:-6 },
  { code:'L', command:'lineto', x:1, y:7 },
  { code:'L', command:'lineto', x:100, y:-0.4 },
  { code:'m', command:'moveto', relative:true, x:-10, y:10 },
  { code:'l', command:'lineto', relative:true, x:10, y:0 },
  { code:'V', command:'vertical lineto', y:27 },
  { code:'V', command:'vertical lineto', y:89 },
  { code:'H', command:'horizontal lineto', x:23 },
  { code:'v', command:'vertical lineto', relative:true, y:10 },
  { code:'h', command:'horizontal lineto', relative:true, x:10 },
  { code:'C', command:'curveto', x1:33, y1:43, x2:38, y2:47, x:43, y:47 },
  { code:'c', command:'curveto', relative:true, x1:0, y1:5, x2:5, y2:10, x:10, y:10 },
  { code:'S', command:'smooth curveto', x2:63, y2:67, x:63, y:67 },
  { code:'s', command:'smooth curveto', relative:true, x2:-10, y2:10, x:10, y:10 },
  { code:'Q', command:'quadratic curveto', x1:50, y1:50, x:73, y:57 },
  { code:'q', command:'quadratic curveto', relative:true, x1:20, y1:-5, x:0, y:-10 },
  { code:'T', command:'smooth quadratic curveto', x:70, y:40 },
  { code:'t', command:'smooth quadratic curveto', relative:true, x:0, y:-15 },
  { code:'A', command:'elliptical arc', rx:5, ry:5, xAxisRotation:45, largeArc:true, sweep:false, x:40, y:20 },
  { code:'a', command:'elliptical arc', relative:true, rx:5, ry:5, xAxisRotation:20, largeArc:false, sweep:true, x:-10, y:-10 },
  { code:'Z', command:'closepath' }
]
```

## History

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
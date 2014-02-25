# svg-path-parser [![stable](http://hughsk.github.io/stability-badges/dist/stable.svg)](http://github.com/hughsk/stability-badges) #

An SVG path parser, built from the [PEG.js](http://pegjs.majda.cz/) grammar
specified [here](http://pastie.org/1036541), published as an NPM module.

Originally written by [Gavin Kistner](http://github.com/Phrogz).

[![svg-path-parser](https://nodei.co/npm/svg-path-parser.png?mini=true)](https://nodei.co/npm/svg-path-parser)

## Usage ##

### `require('svg-path-parser')(d)` ###

Takes an SVG path string. The following:

``` javascript
var parse = require('svg-path-parser')
var path = [
  'M-150,150'
, 'L200,100'
, 'H250 V170'
, 'Q350,90 375,150'
, 'T400,150'
, 'C500,100 575,300 560,150'
, 'S650,160 550,300'
, 'Z M500,200'
, 'A25,35 -80 1,1 450,220 Z'
].join(' ')

console.log(parse(path))
```

Should yield an array of commands that define the path, like so:

``` json
[
  {
    "command": "moveto",
    "relative": false,
    "args": [
      {
        "x": -150,
        "y": 150
      }
    ]
  },
  {
    "command": "lineto",
    "relative": false,
    "args": [
      {
        "x": 200,
        "y": 100
      }
    ]
  },
  {
    "command": "horizontal lineto",
    "relative": false,
    "args": [
      250
    ]
  },
  {
    "command": "vertical lineto",
    "relative": false,
    "args": [
      170
    ]
  },
  {
    "command": "quadratic curveto",
    "relative": false,
    "args": [
      {
        "x1": 350,
        "y1": 90,
        "x": 375,
        "y": 150
      }
    ]
  },
  {
    "command": "smooth quadratic curveto",
    "relative": false,
    "args": [
      {
        "x": 400,
        "y": 150
      }
    ]
  },
  {
    "command": "curveto",
    "relative": false,
    "args": [
      {
        "x1": 500,
        "y1": 100,
        "x2": 575,
        "y2": 300,
        "x": 560,
        "y": 150
      }
    ]
  },
  {
    "command": "smooth curveto",
    "relative": false,
    "args": [
      {
        "x2": 650,
        "y2": 160,
        "x": 550,
        "y": 300
      }
    ]
  },
  {
    "command": "closepath"
  },
  {
    "command": "moveto",
    "relative": false,
    "args": [
      {
        "x": 500,
        "y": 200
      }
    ]
  },
  {
    "command": "elliptical arc",
    "relative": false,
    "args": [
      {
        "rx": 25,
        "ry": 35,
        "xAxisRotation": -80,
        "largeArc": true,
        "sweep": true,
        "x": 450,
        "y": 220
      }
    ]
  },
  {
    "command": "closepath"
  }
]
```

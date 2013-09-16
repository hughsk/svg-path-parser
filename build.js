var peg  = require('pegjs')
var path = require('path')
var fs   = require('fs')

var parser = peg.buildParser(
  fs.readFileSync(path.resolve(__dirname, 'grammar.peg'), 'utf8')
)

console.log('module.exports = ' + parser.toSource())

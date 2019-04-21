#!/usr/bin/env node
let commander = require('commander')
let $ = require('meeko')
let Pack = require('./package.json')
let path = require('path')
let tools = $.requireAll(path.join(__dirname, '.', 'lib'))

commander
  .usage('[command] [options] <file ...>')
  .version(`[${$.c.g(Pack.version)}] Sky Framework`, '-v, --version')
// .option('-a, --aaa-bbb', 'commander.aaaBbb')
commander.command('init')
  .alias('i')
  .description('Init Sky Framework')
  .action(function (env, options) {
    console.log('do init')
  })
commander.command('dbscan [option]')
  .alias('db')
  .description('scan ' + $.c.g('Mysql JiaTui rules') + ' Default: 127.0.0.1/root/123456')
  .option('-c, --config <path>', 'defaults to ./config.js')
  .action(function (option, path) {
    // console.log(option, path.config)
    if (path.config) {
      tools.dbscan.index.scan(path.config)
    } else {
      tools.dbscan.index.scan()
    }
  })
commander.command('commentscan [option]')
  .alias('comment')
  .description('scan ' + $.c.g('Function Comment JiaTui rules'))
  // .option('-c, --config <path>', 'defaults to ./commentscan.json')
  .action(function (option, path) {
    // console.log(option, path.config)
    tools.commentscan.index(path.config)
  })
commander.command('swaggerscan [option]')
  .alias('swagger')
  .description('scan ' + $.c.g('Swagger JiaTui rules'))
  .option('-c, --config <path>', 'defaults to ./config.js')
  .action(function (option, path) {
    // $.log('swagger', path.config)
    if (path.config) {
      tools.swaggerscan.index.scan(path.config)
    } else {
      tools.swaggerscan.index.scan()
    }
  })
commander.command('history')
  .description('today history ')
  .action(function (option, path) {
    tools.todayhistory.index.scan()
  })
commander.parse(process.argv)

if (process.argv.length === 2) {
  console.log(`[${$.c.g(Pack.version)}] Sky framework: ${$.c.y('sky init')}`)
}

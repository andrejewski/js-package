#!/usr/bin/env node
var fs = require('fs')
var path = require('path')
var execSync = require('child_process').execSync
var pkg = require('../package')

var args = process.argv.slice(2)
var command = args[0]

function cmd (command) {
  log(command)
  try {
    execSync(command)
  } catch (error) {
    log('* copied only new files')
  }
}

function log (message) {
  process.stdout.write(message + '\n')
}

function main () {
  switch (command) {
    case 'init':
      var packageDir = path.dirname(__dirname) + '/'
      var destDir = args[1] || process.cwd()
      try {
        fs.readdirSync(destDir)
      } catch (error) {
        log('"' + destDir + '" is not a directory')
        return
      }
      cmd('cp -nR ' + packageDir + ' ' + destDir)
      log('run `git init`, `npm init`, and `npm install` to finish setting up the package')
      return
    default:
      log([
        pkg.name + ': ' + pkg.description,
        '',
        'Commands:',
        '  init [dir]     clone js-package into [dir], defaults to current directory'
      ].join('\n'))
  }
}

main()

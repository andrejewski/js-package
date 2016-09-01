#!/usr/bin/env node
var execSync = require('child_process').execSync;
var pkg = require('../package');

var args = process.argv.slice(2);
var command = args[0];

function log(message) {
  process.stdout.write(message);
}

switch (command) {
  case 'init':
    var dir = args[1] || '.';
    var url = pkg.repository.url.split('//').slice(1).join('//');
    var gitUrl = 'git://' + url;
    execSync('git clone --depth=1 --branch=master ' + gitUrl + ' ' +dir);
    execSync('rm -rf ./.git && git init');
    log('run `npm init` and `npm install` to finish setting up\n');
    return;
  default:
    log([
      pkg.name + ': ' + pkg.description,
      '',
      'Commands:',
      '  init [dir]     clone js-package into [dir], defaults to current directory',
      ''
    ].join('\n'));
}

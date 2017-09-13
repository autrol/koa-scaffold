#!/usr/bin/env node

const yargs = require('yargs');

var exec = require('child_process').exec;
var argv = yargs
    .default('name', 'server-scaffold')
    .argv;

console.log('creating....... \n');
// clone工程代码
exec('git clone https://github.com/autrol/server-scaffold.git ' + argv.name, function (error, stdout, stderr) {
    if (error) {
        console.log(error);
        return;
    }
    exec('cd ' + argv.name + ' && rm -rf .git');
    console.log('OK, Good luck!');
});

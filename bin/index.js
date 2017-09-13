#!/usr/bin/env node

var fse = require('fs-extra');
var program = require('commander');
var child_process = require('child_process');
var packageObj = require('../package.json');

var cwd = process.cwd();

program
    .version(packageObj.version)
    .usage('[command] <options ...>')
    .option('create <projectName>', '创建新项目', copyApp)
    .option('controller <controllerName>', '创建新的controller', copyController)
    .option('ct <controllerName>', '缩写创建新的controller', copyController)
    .option('model <modelName>', '缩写创建新的model', copyModel)
    .arguments('<cmd> [env]')
    .action(function (cmd, env) {
        if(['create','controller','ct','model'].indexOf(cmd) === -1){
            console.log('错误的命令行参数 输入 happyjs -h 查看所有命令行');
        }
    })
    .parse(process.argv);

function copyApp(projectName) {
    var projectPath = cwd + '/' + projectName;
    fse.copySync(__dirname + '/../template/app/',projectPath);
    child_process.execSync('npm install --registry=http://registry.npm.taobao.org',{
        cwd:projectPath
    });
    console.log('新建项目成功');
}

function copyController(controllerName){
    var controllerPath = cwd + '/app/controllers/'+ controllerName + '.js';
    fse.copySync(__dirname + '/../template/controller/index.js',controllerPath);
    console.log('创建controller成功,controller路径是: app/controllers/'+ controllerName + '.js');
}

function copyModel(modelName){
    var modelPath = cwd + '/app/models/'+ modelName + '.js';
    fse.copySync(__dirname + '/../template/model/index.js',modelPath);
    console.log('创建model成功,model路径是: app/models/'+ modelName + '.js');
}












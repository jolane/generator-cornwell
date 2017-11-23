/*jslint node: true */
"use strict";

var generator = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = generator.Base.extend({
	initializing: function() {
		var message = chalk.yellow('Cornwell EDM generator.');
		this.log(yosay(message));
	},
	prompting: function() {
		return this.prompt([
			{
				type: 'input',
				name: 'appname',
				message: 'What is the name of your project?',
				default: this.appname.replace(' ', '-')
			},
			{
				type: 'input',
				name: 'appdesc',
				message: 'What is the Description of your project?'
			},
			{
				type: 'input',
				name: 'mailersmtp',
				message: 'What is Cornwells Node Mailer SMTP?'
			},
			{
				type: 'input',
				name: 's3accesskey',
				message: 'What is the Cornwells s3 accessKeyId?'
			},
			{
				type: 'input',
				name: 's3secretAccessKey',
				message: 'What is the Cornwells s3 secretAccessKey?'
			},
			{
				type: 'input',
				name: 's3region',
				message: 'What is the Cornwells s3 region?',
				default: 'ap-southeast-2'
			}
		]).then(function(answers) {
			this.appname = answers.appname;
			this.appdesc = answers.appdesc;
			this.mailersmtp = answers.mailersmtp;
			this.s3accesskey = answers.s3accesskey;
			this.s3secretAccessKey = answers.s3secretAccessKey;
			this.s3region = answers.s3region;

		}.bind(this));
	},
	writing: function() {
		var destRoot = this.destinationRoot(),
			sourceRoot = this.sourceRoot(),
			templateContext = {
				appname: this.appname,
				appdesc: this.appdesc,
				mailersmtp: this.mailersmtp,
				s3accesskey: this.s3accesskey,
				s3secretAccessKey: this.s3secretAccessKey,
				s3region: this.s3region
			};

		this.fs.copy(sourceRoot + '/.gitignore', destRoot + '/.gitignore');
		this.fs.copy(sourceRoot + '/common-emails.txt', destRoot + '/common-emails.txt');
		this.fs.copyTpl(sourceRoot + '/package.json', destRoot + '/package.json', templateContext);
		this.fs.copyTpl(sourceRoot + '/README.md', destRoot + '/README.md', templateContext);
		this.directory(sourceRoot + '/src', destRoot + '/src');
		this.directory(sourceRoot + '/funcs', destRoot + '/funcs');
	},
	install: function() {
		this.npmInstall();
	}
});

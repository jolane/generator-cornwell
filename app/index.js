/*jslint node: true */
"use strict";

var generator = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = generator.Base.extend({
	initializing: function() {
		var message = chalk.yellow('Cornwell generator.');
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
				message: 'What is the description of your project?'
			},
			{
				type: 'input',
				name: 'authorname',
				message: 'Your name?',
				default: 'Jolane Synott'
			},
			{
				type: 'input',
				name: 'authoremail',
				message: 'Your email?',
				default: 'jolane.synott@cornwell.com.au'
			},
			{
				type: 'input',
				name: 'url',
				message: 'What is the finial URL? http://'
			},
			{
				type: 'input',
				name: 'gtmcode',
				message: 'What is the GTM code? (Leave blank to exclude)'
			},
			{
				type: 'input',
				name: 'gacode',
				message: 'What is the GA code? (Leave blank to exclude)'
			},
			{
				type: 'input',
				name: 'metatitle',
				message: 'What is the Meta Title?'
			},
			{
				type: 'input',
				name: 'metadesc',
				message: 'What is the Meta Description?'
			}
		]).then(function(answers) {
			this.appname = answers.appname;
			this.appdesc = answers.appdesc;
			this.gacode = answers.gacode;
			this.gtmcode = answers.gtmcode;
			this.metatitle = answers.metatitle;
			this.metadesc = answers.metadesc;
			this.metatitle = answers.metatitle;
			this.authoremail = answers.authoremail;
			this.authorname = answers.authorname;
			this.staging_url = answers.staging_url;
			this.url = answers.url;
		}.bind(this));
	},
	writing: function() {
		var destRoot = this.destinationRoot(),
			sourceRoot = this.sourceRoot(),
			templateContext = {
				appname: this.appname,
				appdesc: this.appdesc,
				gacode: this.gacode,
				gtmcode: this.gtmcode,
				metatitle: this.metatitle,
				metadesc: this.metadesc,
				authorname: this.authorname,
				authoremail: this.authoremail,
				staging_url: this.staging_url,
				url: this.url
			};

		this.fs.copyTpl(sourceRoot + '/package.json', destRoot + '/package.json', templateContext);
		this.fs.copyTpl(sourceRoot + '/README.md', destRoot + '/README.md', templateContext);
		this.fs.copyTpl(sourceRoot + '/_config.yml', destRoot + '/_config.yml', templateContext);
		this.fs.copy(sourceRoot + '/composer.json', destRoot + '/composer.json');
		this.fs.copy(sourceRoot + '/Gemfile', destRoot + '/Gemfile');
		this.fs.copy(sourceRoot + '/index.html', destRoot + '/index.html');

		this.fs.copy(sourceRoot + '/.editorconfig', destRoot + '/.editorconfig');
		this.fs.copy(sourceRoot + '/.babelrc', destRoot + '/.babelrc');
		this.fs.copy(sourceRoot + '/.jshintrc', destRoot + '/.jshintrc');
		this.fs.copy(sourceRoot + '/.jshintignore', destRoot + '/.jshintignore');
		this.fs.copy(sourceRoot + '/.stylintrc', destRoot + '/.stylintrc');
		this.fs.copy(sourceRoot + '/gitignore', destRoot + '/.gitignore');

		this.directory(sourceRoot + '/_assets', destRoot + '/_assets');
		this.directory(sourceRoot + '/_config', destRoot + '/_config');
		this.directory(sourceRoot + '/_layouts', destRoot + '/_layouts');
		this.directory(sourceRoot + '/_includes', destRoot + '/_includes');
		this.directory(sourceRoot + '/_data', destRoot + '/_data');
		this.directory(sourceRoot + '/_tests', destRoot + '/_tests');

	},
	install: function() {
		this.npmInstall();
		this.spawnCommand('bundle', ['install', '--local']);
	}
});

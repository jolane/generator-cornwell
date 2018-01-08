# Cornwell Brand Design generator

Yeoman generator that scaffolds out a front-end web app with NPM scripts.
There is a sub-generator for scaffolding EDMs.

## Features

* Static site generation with [Jekyll](http://jekyllrb.com/)
* Javascript compiled with [Webpack](https://webpack.js.org/)
* [ES2015 features](https://babeljs.io/docs/learn-es2015/) using [Babel](https://babeljs.io)
* [Stylus](http://stylus-lang.com/) complied automatically
* Built-in preview server with [BrowserSync](https://www.browsersync.io/)

## Getting Started

* Install Ruby & Jekyll
* Install: npm install --global yo generator-cornwell
* Run yo cornwell to scaffold your webapp
* Run `npm start` serve to preview and watch for changes
* Run `npm build` & `jekyll build` to build your webapp for production

# EDM sub-generator

## Feature

* EDM generation with [MJML](https://mjml.io//)
* Built-in preview server with [BrowserSync](https://www.browsersync.io/)
* Image hosting with [AWS S3](https://aws.amazon.com/s3/)
* Test email send with [Nodemailer](https://nodemailer.com/about/)

## Getting Started

* Install: npm install --global yo generator-cornwell
* Run yo cornwell:email to scaffold your EDM
* Follow on-screen prompts to fill SMPT & S3 details.
* Run `npm start` serve to preview and watch for changes.
* Run `npm mail -- email@email.com` send a test email.
* Run `npm build` to build EDM to `/build/dist` directory.

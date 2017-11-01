
var nodemailer = require('nodemailer');
var fs = require("fs");
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('<%= mailersmtp %>');


fs.readFile("dist/deploy/index.html", "utf-8", function(err, data) {


	var mailOptions = {
		from: '"Cornwell Developer" <developer@cornwell.com.au>', // sender address
		subject: 'Cornwell Test Email', // Subject line
		text: '', // plaintext body
		html: data
	};

	// Add email addresses passed in args
	var args = process.argv.slice(2);
	for (var i = 0; i < args.length; i++) {
		mailOptions.to = mailOptions.to + ',' + args[i];
	}
	if(args.length < 1) {
		mailOptions.to = 'developer@cornwell.com.au';
	}

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('------ COMPLETE: email sent ------');
	});
});
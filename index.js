var express = require('express');
let app = express();
var mailer = require("nodemailer");
var hbs = require('nodemailer-express-handlebars');
var exphbs = require('express-handlebars');

const RECEIVER_EMAIL = "receiveremail@gmail.com";
const SENDER_EMAIL = "senderemail@gmail.com"; //Change this to email address from which you want to send email.

var transporter = mailer.createTransport({
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  requireTLS: true,
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

transporter.use('compile', hbs({viewEngine: exphbs, viewPath: __dirname + '/views'}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/sendemail/:applicantEmail', function(req, res){

	let applicantEmail = req.params.applicantEmail

	// setup e-mail data with unicode symbols
	let mailOptions = {
	    to: RECEIVER_EMAIL, // receiver email address
	    from: SENDER_EMAIL,
	    subject: 'Hey, Someone just reached step 3', // Subject line
	    template: 'email',
	    context : {
	    	applicantEmail : applicantEmail
	    }
	};

	// Sending email
	transporter.sendMail(mailOptions, function(err) {
		if (err) 
		{
			console.log(err);
			// res.send("There was an error sending email");
			// return;
		}
	});
	res.send("Email Sent");
	return;
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
## This is a simple example about using Gmail email in express.

In order to use this code:

- Clone the repository
- Run `npm install`
- Change `RECEIVER_EMAIL` and `SENDER_EMAIL` in `index.js`
- Add credentials of your gmail account on line 17 and 18 in place of `youremail@gmail.com` and `yourpassword`. 

````
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

`````

Note: You need to turn on access to less secure apps in GMail. Otherwise this will throw error. Read this to understand how to use [nodemailer using Gmail](https://nodemailer.com/using-gmail/);
MentiontoSMS
============

Requirements:

- A server running Node.JS
- The following Node.JS packages: Socket.IO and nodemailer
- A cell carrier that has a mail to sms gateway http://en.wikipedia.org/wiki/List_of_SMS_gateways
- A Plug.DJ account to run the client

Setting it up:

Log in to your server and create or cd to the directory that you want to keep the server file in for this app

Create a new file called mail.js or something similar

Paste the contents of the server.js file into your mail.js file
        
        ```javascript
	//Server
	var nodemailer = require('nodemailer');
	var io = require('socket.io').listen(1337);

	var transport = nodemailer.createTransport("SMTP", {
	service: "Gmail",
	auth: {
	user: "derpthebass@gmail.com",
	pass: "hondafan2"
	}
	});

	io.sockets.on('connection', function(socket){
	socket.on('smsMention', function(subject, msg){
	var mailOptions = {
	from: "DerpTheBass",
	to: "4125233816@vtext.com",
	subject: subject,
	text: msg
	}
	smtpTransport.sendMail(mailOptions, function(error, response){
	if(error){
	console.log(error);
	}else{
	console.log('Message sent: '+response.message);
	}
	});
	});
	});```

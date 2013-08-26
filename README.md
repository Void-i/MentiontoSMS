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
var io = require('socket.io').listen(anyport);

var transport = nodemailer.createTransport("SMTP", {
service: "Gmail",
auth: {
user: "username@gmail.com",
pass: "password"
}
});

io.sockets.on('connection', function(socket){
socket.on('smsMention', function(subject, msg){
var mailOptions = {
from: "<anyone>",//This part really doesn't matter so put whatever you want
to: "<your cell number>@vtext.com",//If you had Verizon you would use this, otherwise consult the 3rd requirement
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
});
```

If you are using gmail (which I recommend) you are most likely going to have to use https://accounts.google.com/DisplayUnlockCaptcha
on your account.

now you can type ```node mail.js``` and you will have the server started

=====

Next you are going to want to start the client

You can copy and paste the client.js into your browser's console but you are probably going to want to incorporate it into your own script or load it from a bookmarklet, etc.

```javascript
//Client
var client = $('<link>');
client.attr("href", "http://cdn.socket.io/stable/socket.io.js")
$("head").append(client);

	var socket = io.connect('<your domain/ip:port you used for the server');

smsNotifications = true;
API.on(API.CHAT_COMMAND, function(data){
	if(data == "/sms") smsNotifications = !smsNotifications;
});

socket.on('connect', function(){
		API.on(API.CHAT, function(data){
		if(data.type == "mention" && smsNotifications === true){
		socket.emit('smsMention', data.from, data.message);
		}		
	});
});
```

You are now ready to go! If you are mentioned you will recieve a text message containing the sender and the message.

If you have any questions or problems you can message me.

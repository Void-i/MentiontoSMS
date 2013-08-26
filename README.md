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
service: "Gmail",//It is easiest to use gmail as far as I have found but you will probably need to do this on the account you want to use https://accounts.google.com/DisplayUnlockCaptcha
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
});```

now you can type ```node mail.js``` and you will have the server started


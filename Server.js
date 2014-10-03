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

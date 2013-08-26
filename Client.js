//Client
var client = $('<link>');
client.attr("href", "http://cdn.socket.io/stable/socket.io.js")
$("head").append(client);

	var socket = io.connect('http://playmc.pw:1337');

smsNotifications = true;
API.on(API.CHAT_COMMAND, function(data){
	if(data == "/sms") smsNotifications = !smsNotifications;
});

socket.on('connect', function(){
		API.on(API.CHAT, function(data){
		if(data.type == "mention" && smsNotifications === true){
 		msg = data.message.replace(/&#39;/g, "'");
		socket.emit('smsMention', data.from, msg);
		}		
	});
});

//Client
var client = $('<link />', {href: 'http://cdn.socket.io/stable/socket.io.js'});
$("head").append(client);

var socket = io.connect('<your domain/ip:port you used for the server');

function stripHTML(data){
    var div = document.createElement('DIV');
    div.innerHTML = data;
    return div.textContent || div.innerText || "{EMOJI}";
};

smsNotifications = true;
API.on(API.CHAT_COMMAND, function(data){
    if(data == "/sms") smsNotifications = !smsNotifications;
});

socket.on('connect', function(){
    API.on(API.CHAT, function(data){
        if(data.type == "mention" && smsNotifications === true){
            socket.emit('smsMention', data.un, stripHTML(data.message));
        }       
    });
});

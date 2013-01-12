$(document).ready(function(){	
    connect();
});

function connect() {
	var socket = io.connect('http://176.31.108.17:1337',{'reconnection delay':5000,'auto connect':              true,'connect timeout':           5000, 'reconnect':                 true});
	if (socket == null) {
		$('#bodyToilet').css('background-color', 'green');
	}
    var currentStatus = false;	
	socket.on('connecting', function (transport) {
		show("Trying to connect using to the WWWC");
	});

	socket.on('disconnect', function () {
	  show("There is a socket problem, you have been disconnected");
	});

	socket.on('reconnecting', function (delay, attempt) {
	 // show('reconnecting, attempt #' + attempt);
	});

	socket.on('reconnect', function () {
	  show('I am reconnected');
	});

    socket.on('status', function (data) {
        if (data.status) {
            $('#bodyToilet').css('background-color', 'green');
            chrome.browserAction.setIcon({
                path: 'img/green.png'
            });
            notification.di
        } else {
            $('#bodyToilet').css('background-color', 'red');
            chrome.browserAction.setIcon({
                path: 'img/red.png'
            });
        }
    });
    socket.on('message', function(data) {
        show(data.message);
    });
}
function show(message) {
    var notification = webkitNotifications.createNotification(
        'https://fbcdn-photos-a.akamaihd.net/photos-ak-snc7/v85006/239/364409770278191/app_1_364409770278191_96446824.gif',  // icon url - can be relative
        'WWWC NEWS!',  // notification title
        message  // notification body text
        );
    notification.show();    
    setTimeout(function(){
        notification.cancel();
    }, '5000');

}
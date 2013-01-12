var background = {

    ip: "localhost",

    init: function () {

        this.socketConnect();

        console.log("Main initiated: ", background);

    },

    socketConnect: function () {

        this.socket = io.connect("http://" + this.ip + ":8080");

        this.bindSocketEvents();

    },

    bindSocketEvents: function () {

        this.socket.on("message", function (data) {

            webkitNotifications.createNotification(null, "Message", data.message).show();

            console.log("Message: ", data.message);

        });

        this.socket.on("brew", function (data) {

            webkitNotifications.createNotification(null, "Brew Time!", data.message).show();

        });

    }

};

$(document).ready(function () {

    console.log("Hello World!");

    background.init();

});
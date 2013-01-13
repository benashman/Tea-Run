var background = {

    ip: "localhost",

    user: (localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : false,

    users: {},

    popupOpen: false,

    init: function () {

        this.socketConnect();

        console.log("Main initiated: ", background);

    },

    socketConnect: function () {

        this.socket = io.connect("http://" + this.ip + ":8080");

        this.bindSocketEvents();

        if (this.user !== false) {

            console.log("Registering with server: ", this.user);

            this.socket.emit("registration", this.user);

        }

    },

    bindSocketEvents: function () {

        var self = this;

        self.socket.on("message", function (data) {

            console.log("Message: ", data.message);

        });

        self.socket.on("brew", function (data) {

            switch (data.type) {

                case "request":

                    self.teaMaker = data.user;

                    webkitNotifications.createHTMLNotification("notification.html").show();

                break;

                case "response":

                    if (self.popupOpen === true) {

                        self.popup.brewResponse(data);

                    }

                break;

            }

        });

        self.socket.on("users", function (data) {

            console.log("Background has received users: ", data);

            self.users = data;

            // if popup is open, add users to view

            if (self.popupOpen === true) {

                self.popup.loadView("index", self.getUsersArray());

            }

        });

        self.socket.on("addUser", function (data) {

            self.users[data.username] = data;

            // if popup open, add user to view

            if (self.popupOpen === true) {

                // self.popup.addUser(data);

            }

        });

        self.socket.on("removeUser", function (data){

            delete self.users[data.username];

            // if popup open, remove user from view

            if (self.popupOpen === true) {

                // self.popup.removeUser(data);

            }

        });

    },

    getUsersArray: function () {

        var users = [];

        for (var i in this.users) {

            users.push(this.users[i]);

        }

        return {
            users: users
        };

    },

    setPopupOpen: function (popup) {

        this.popupOpen = true;

        this.popup = popup;

        console.log("Popup opened.");

    },

    setPopupClosed: function () {

        this.popupOpen = false;

        delete this.popup;

        console.log("Popup closed.");

    }

};

$(document).ready(function () {

    console.log("Hello World!");

    background.init();

});
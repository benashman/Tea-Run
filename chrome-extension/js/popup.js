var popup = {

    templates: Handlebars.templates,

    init: function () {

        this.socket = chrome.extension.getBackgroundPage().background.socket;

        this.bindSocketEvents();

        this.requestContent("users");

        console.log("Popup loaded: ", popup);

    },

    bindViewEvents: function (view) {

        var self = this;

        switch (view) {

            case "index":

                $("#brew-button").on("click", function (e) {

                    e.preventDefault();

                    self.socket.emit("brew", {

                        message: "Saul is making a brew!"

                    });

                    self.loadView("waiting", {users: self.users});

                    return false;

                });

            break;

            case "waiting":

                // blah

            break;

        }

    },

    bindSocketEvents: function () {

        var self = this;

        self.socket.on("content", function (data) {

            switch (data.type) {

                case "users":

                    console.log("Users: ", data.users);

                    var users = [];

                    for (var i in data.users) {

                        users.push(data.users[i]);

                    }

                    self.users = users;

                    self.loadView("index", {users: self.users});

                break;

            }

        });

    },

    requestContent: function (type) {

        this.socket.emit("content", {

            type: type

        });

    },

    loadView: function (template, context) {

        var html = this.templates[template](context);

        console.log(html);

        switch (template) {

            case "index":

                $("#content").html(html);

            break;

            case "waiting":

                $("#content").html(html);

            break;

        }

        this.bindViewEvents(template);

    }

};

$(document).ready(function () {

    console.log("Hello World!");

    popup.init();

});
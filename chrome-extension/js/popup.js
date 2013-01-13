var popup = {

    background: chrome.extension.getBackgroundPage().background,

    templates: Handlebars.templates,

    reset: false,

    init: function () {

        var self = this;

        this.socket = this.background.socket;

        this.user = this.background.user;

        if (this.user === false || this.reset === true) {

            console.log("Resetting local storage.");

            localStorage.clear();

            this.loadView("options", {});

        } else {

            this.loadView("index", this.background.getUsersArray());

        }

        this.background.setPopupOpen(this);

        $(window).unload(function () {

            self.background.setPopupClosed();

        });

        console.log("Popup loaded: ", popup);

    },

    bindViewEvents: function (view) {

        var self = this;

        switch (view) {

            case "options":

                $("#options").on("submit", function (e) {

                    e.preventDefault();

                    var $this = $(this),
                        name = $this.find("#name").val(),
                        milk = $this.find("#milk").prop("checked"),
                        sugars = $this.find("#sugars").val(),
                        user;

                    user = {

                        username: name.toLowerCase(),

                        name: name,

                        preferences: {

                            milk: milk,

                            sugars: sugars

                        }

                    };

                    self.user = user;

                    self.background.user = user;

                    localStorage.setItem("user", JSON.stringify(user));

                    self.socket.emit("registration", self.user);

                    return false;

                })

            break;

            case "index":

                $("#brew-button").on("click", function (e) {

                    e.preventDefault();

                    self.socket.emit("brew", {

                        type: "request",

                        user: self.user

                    });

                    self.loadView("waiting", self.background.getUsersArray());

                    return false;

                });

            break;

            case "waiting":

                (function decrement () {

                    timeout = setTimeout(function () {

                        var seconds = parseInt($('#time').text(), 10);

                        if (seconds > 1) {

                            seconds--;

                            $('#time').text(seconds);

                            decrement();

                        } else {

                            self.goMakeTheTea();

                        }

                    }, 1000);

                })();

            break;

        }

    },

    loadView: function (template, context) {

        var html = this.templates[template](context);

        $("#content").html(html);

        this.bindViewEvents(template);

        console.log("Loading view: ", template, context);

    },

    addUser: function (data) {

        var html = this.templates.user(data);

        $('#brew-mates').append(html);

    },

    removeUser: function (data) {

        $("#" + data.username).remove();

    },

    brewResponse: function (data) {

        var responseClass = (data.value) ? 'yes' : 'no';

        $('#' + data.user.username).addClass(responseClass);

    },

    goMakeTheTea: function () {

        $(".brewer").each(function () {

            var $this = $(this);

            if (($this.hasClass("no") || $this.hasClass("yes")) === false) {

                $this.addClass("no");

            }

        });

        $(".expires-in").text("Now go make the tea!");

    }

};

$(document).ready(function () {

    console.log("Hello World!");

    popup.init();

    Handlebars.registerHelper("toLowerCase", function (value) {

        return value.toLowerCase();

    });

    Handlebars.registerHelper("toLowerCase", function (value) {

        return value.toLowerCase();

    });

});
var notification = {

    user: JSON.parse(localStorage.getItem("user")),

    socket: chrome.extension.getBackgroundPage().background.socket,

    teaMaker: chrome.extension.getBackgroundPage().background.teaMaker,

    templates: Handlebars.templates,

    init: function () {

        this.loadView("notification", this.teaMaker);

        console.log("Notification loaded: ", notification);

    },

    bindViewEvents: function (view) {

        if (view === "notification") {

            var self = this;

            $(".response").on("click", function (e) {

                e.preventDefault();

                self.socket.emit("brew", {

                    type: "response",

                    user: self.user,

                    value: ($(this).attr("id") === "yes") ? true : false

                });

                window.close();

                return false;

            });

        }

    },

    loadView: function (template, context) {

        var html = this.templates[template](context);

        $("#content").html(html);

        this.bindViewEvents(template);

    }

};

$(document).ready(function () {

    console.log("Hello World!");

    notification.init();

});
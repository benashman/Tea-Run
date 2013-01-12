var popup = {

    init: function () {

        this.bindEvents();

        console.log("Popup loaded: ", popup);

    },

    bindEvents: function () {

        $("#brew-button").on("click", function (e) {

            e.preventDefault();

            background.socket.emit("brew", {

                message: "Saul is making a brew!"

            });

            return false;

        });

    }

};

var background = chrome.extension.getBackgroundPage().background;

$(document).ready(function () {

    console.log("Hello World!");

    popup.init();

});
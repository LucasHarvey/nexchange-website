/* global Resources,MessageCode,Modal */
var app = app || {
    startup: [],
    afterStartup: []
};

app.contact = {

    requestSuccess: function(data) {

        // Enable the form
        document.getElementById("submitRequest").disabled = false;
        document.getElementById('userData').addEventListener('submit', app.contact.sendRequest);

        new Modal("Message Sent", MessageCode[data.payload.messageCode],
        {text: "Okay"},
        false,
        null).show();
    },

    requestFailure: function(data) {

        // Enable the form
        document.getElementById("submitRequest").disabled = false;
        document.getElementById('userData').addEventListener('submit', app.contact.sendRequest);

        app.handleFailure(data);
        return;
    },

    validateEmail: function() {
        let email = document.getElementById('email').value;

        if (!email.validEmail()) {
            app.handleFailure({
                messageCode: "EmailNotValid"
            });
            return false;
        }
        return true;
    },

    verifyName: function(name) {
        return (/^[A-Za-z\-\s]+$/g.test(name));
    },

    sendRequest: function(event) {
        event.preventDefault();

        if (!app.contact.validateEmail()) {
            return;
        }

        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var email = document.getElementById('email').value;
        var subject = document.getElementById("subject").value;
        var message = document.getElementById("message").value;


        if (!firstName) {
            app.handleFailure({
                messageCode: "MissingArgumentFirstName"
            });
            return;
        }
        if (!lastName) {
            app.handleFailure({
                messageCode: "MissingArgumentLastName"
            });
            return;
        }

        if(!email){
            app.handleFailure({
                messageCode: "MissingArgumentEmail"
            })
            return;
        }

        if(!subject){
            app.handleFailure({
                messageCode: "MissingArgumentSubject"
            })
            return;
        }

        if(!message){
            app.handleFailure({
                messageCode: "MissingArgumentMessage"
            })
            return;
        }

        if (!this.verifyName(firstName + " " + lastName)) {
            app.handleFailure({
                messageCode: "NameNotValid"
            });
            return;
        }

        // Disable the form
        document.getElementById("submitRequest").disabled = true;
        document.getElementById('userData').removeEventListener('submit', app.contact.sendRequest);

        Resources.Contact.POST(firstName, lastName, email, subject, message, this.requestSuccess, this.requestFailure);
    },

};

app.startup.push(function contactStartup() {
    app.contact.sendRequest = app.contact.sendRequest.bind(app.contact);
    document.getElementById('userData').addEventListener('submit', app.contact.sendRequest);
});

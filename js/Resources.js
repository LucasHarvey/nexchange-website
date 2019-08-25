/* global app */
let Resources = {
    Contact: {
        location: "v1/contact.php",
        POST: function(firstName, lastName, email, subject, message, successCallback, failureCallback) {
            let data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                subject: subject,
                message: message
            };
            return app.post(Resources.Contact, data, successCallback, failureCallback);
        }
    }
};

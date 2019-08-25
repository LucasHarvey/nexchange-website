function MessageCode(code){
    let MessageCode_Codes = {
        MessageCodeNotFound: "The message code translation was not found. Contact the Access Centre if this problem persists.",
        UnknownResourceMethod: "The request method doesn't exist on the server. Contact the Access Centre if this problem persists.",
        UnknownServerError: "A server error occured. Please contact the Access Centre if this problem persists.",
        InternalServerError: "An unknown server error occurred. Please contact the Access Centre if this problem persists.",
        JSONParseException: "Unable to parse a response from the server. Please contact the Access Centre if this problem persists.",
        MalformedBody: "The request body was not formed properly. Contact the Access Centre if this problem persists.",
        RequestTimedout: "A request took too long to process and has timed out. Please ensure that you have internet connectivity.",
        NoInternet: "A request could not be sent. Please ensure that you have internet connectivity.",
        PopUpBlocked: "A new window was blocked. Please ensure that pop-ups are allowed in your browser settings.",
        StartupError: "An error occurred during startup of a component.",
        KeyNotFound: "Malformed request body.",

        MissingArgument: "An argument is missing from the request. Make sure all fields were entered properly.",

        // Contact error codes
        MissingArgumentFirstName: "First name was left empty.",
        MissingArgumentLastName: "Last name was left empty.",
        NameNotValid: "The name is not valid",
        MissingArgumentEmail: "Email was left empty.",
        EmailNotValid: "The email address is not valid.",
        MissingArgumentSubject: "Subject was left empty.",
        MissingArgumentMessage: "Message was left empty.",
        InfoRequestSent: "The message was sent successfully.",

        DatabaseError: "Error executing query...",
        DatabasePrepError: "Error preparing database query...",
        DatabaseConnectError: "Error occurred while connecting to the database.",
        DatabaseExecuteError: "Unable to query database.",
        DatabaseSelectError: "Error occurred while selecting from the database.",
        DatabaseInsertError: "Error occurred while inserting into the database.",
        DatabaseDeleteError: "Error occurred while deleting from the database.",
        DatabaseUpdateError: "Error occurred while updating an entry from the database.",
        DatabaseDuplicationError: "This entry already exists in the database.",
        DatabaseRollbackError: "A database error occurred. Contact the Access Centre if this persists.",
        DatabaseCommitError: "A database error occurred. Try again. Contact the Access Centre if this persists.",
    };

    if(!MessageCode_Codes.hasOwnProperty(code)){
        if(window.app){
            window.app.logUi("MessageCode not found! Code: '"+code+"'");
            return MessageCode_Codes["MessageCodeNotFound"];
        }
    }
    return MessageCode_Codes[code];
}

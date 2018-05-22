<?php

include_once("./_EMAIL_TASKS/_generic_email.php");

function request_email($conn, $firstName, $lastName, $email, $subject, $message){

    $emailMessage = "New Request from $firstName $lastName:\r\n$message\r\nReply at the following email address: $email";

    $to = "lucas.harvey10@gmail.com";

    return send_email($conn, $to, $subject, $emailMessage, true);
}


?>

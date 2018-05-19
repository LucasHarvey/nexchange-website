<?php

$conn = database_connect();

requiredParams($conn, $_JSON, array("firstName", "lastName", "email", "subject", "message"));

$first_name = $_JSON["firstName"];
$last_name = $_JSON["lastName"];
$email = $_JSON['email'];
$subject = $_JSON['subject'];
$message = $_JSON['message'];
$ip = $_SERVER['REMOTE_ADDR']?:($_SERVER['HTTP_X_FORWARDED_FOR']?:$_SERVER['HTTP_CLIENT_IP']);

validateEmail($email);

validateName($first_name . ' ' . $last_name);

$insertParams = array($first_name, $last_name, $email, $subject, $message, $ip);

database_insert($conn, "INSERT INTO messages (first_name, last_name, email, subject, message, ip_address) VALUES (?,?,?,?,?)", "sssss", $insertParams);

include_once("./_EMAIL_TASKS/notify_request_task.php");
$emailSent = request_email($conn, $first_name, $last_name, $email, $subject, $message);

echoSuccess($conn, array(
    "emailSent" => $emailSent,
    "firstName" => $first_name,
    "lastName" => $last_name,
    "messageCode" => "RequestSent"
), 201);

function validateEmail($email){
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echoError($conn, 400, "EmailNotValid");
    }
    return;
}

function validateName($name){
    if(preg_match("[0-9]", $name) === 1){
        echoError($conn, 400, "NameNotValid");
    }
    return;
}

?>

<?php
function send_email($conn, $to, $subject, $message){
    $headers = "From: no-reply.nexchange@johnabbott.qc.ca\r\nContent-type: text/plain\r\n";

    if(mail($to, $subject, $message, $headers)){
        return true;
    }
    return false;
}
?>

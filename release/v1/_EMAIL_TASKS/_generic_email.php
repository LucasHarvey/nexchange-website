<?php
function send_email($conn, $to, $subject, $message, $async=false){
    $headers = "From: no-reply.nexchange@johnabbott.qc.ca\r\nContent-type: text/plain\r\n";

    if(!$async){
      if(mail($to, $subject, $message, $headers)){
          return true;
      }
      return false;
    } else {
      execInBackground("php _EMAIL_TASKS/_background_email.php $to $subject $message");
    }
}

function execInBackground($cmd) {
    exec($cmd . " > /dev/null &");
}
?>

<?php

include_once "_generics.php";

if ($_SERVER["REQUEST_METHOD"] == "POST"){
  include_once "Contact/contact_POST.php";
} else {
  echoError(null, 404, "UnknownResourceMethod");
}

?>

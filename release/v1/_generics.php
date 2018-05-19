<?php
include_once "_globals.php";
include_once "_overrides.php";

//Error handler helpers
include_once "_errorHandlers.php"; //Should always be first thing.

//Convert the request body to JSON if the content type is set to json
if($_SERVER["REQUEST_METHOD"] != "GET"){
    if(in_array("CONTENT_TYPE", array_keys($_SERVER)) && $_SERVER["CONTENT_TYPE"] == "application/json"){
        $_JSON = json_decode(file_get_contents('php://input'), true);
        if($_JSON == null){
            $_JSON = array();
        }
    }
}

//We will be outputting json.
header('Content-type: application/json');

// Database helper
include_once "_database.php";

//Make sure that the json obj contains all parameters in paramsArray
function requiredParams($conn, $json, $paramsArray){
    foreach($paramsArray as $key){
        if(!in_array($key, array_keys($json))){
            echoError($conn, 400, "MissingArgument".ucfirst($key));
        }
    }
}

function generateWhereStatement($conn, $allowedProps, $changesKeysRemap, $columnWhereClause, $props){

    $searchValues = array();
    foreach($props as $key => $value ){
        if($value == ""){
            continue;
        }
        if(!in_array($key, $allowedProps)){
            echoError($conn, 400, "KeyNotFound", "Key: '".$key."' was not found.");
        }
        if(in_array($key, array_keys($changesKeysRemap))){
            $key = $changesKeysRemap[$key];
            if($key == NULL) continue;
        }
        $searchValues[$key] = $value;
    }

    $where = "";
    $insertVals = array();
    if(!empty($searchValues)){
        $cols = array();
        $colsOperator = array();

        foreach ($searchValues as $k=>$value) {
            array_push($cols, $k);
            array_push($colsOperator, " ".$columnWhereClause[$k]." ");
        }

        $cols = array_map(function($x) use (&$colsOperator) {
            return $x . array_shift($colsOperator) . '?';
        }, $cols);
        $where = " WHERE ".implode(" AND ", $cols);
    }

    return array($where, $searchValues);
}

?>

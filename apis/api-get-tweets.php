<?php
session_start();
if( !isset($_SESSION['id']) ) {
    sendError('user not authenticated', __LINE__ ); 
}
    
if( strlen($_SESSION['id']) !== 13 ) {
    sendError('id not valid', __LINE__ ); 
}

if( empty($_GET['userId']) ){
    sendError('user id missing', __LINE__ ); 
}

if( $_SESSION['id'] !== $_GET['userId'] ){
    sendError('you are not authorised', __LINE__ ); 
}

$sUsers = file_get_contents(__DIR__ . '/../private/users.txt');
$aUsers = json_decode($sUsers);

foreach( $aUsers as $jUser){
    if( $_SESSION['id'] === $jUser->id){
        echo '{"status":1, "tweets":'.json_encode($jUser->tweets).'}';
        exit;
    }
}

function sendError($sMessage, $iLine){
    echo '{"status":0, "message":"'.$sMessage.'", "line":'.$iLine.'}';
    exit;
}
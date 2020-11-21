<?php
session_start();

if( !$_POST ){ header('Location: login.php'); }

if( empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
    sendError('Email is not valid', __LINE__);
}
if( empty($_POST['password']) || strlen($_POST['password']) < 5 || strlen($_POST['password']) > 20){
    sendError('Password is not valid', __LINE__);
}

$sUsers = file_get_contents(__DIR__ . '/../private/users.txt');
$aUsers = json_decode($sUsers);

$iTotalUsers = count($aUsers);

foreach( $aUsers as $jUser ){
    if( $_POST['email'] == $jUser->email && password_verify($_POST['password'], $jUser->password) ){
        $_SESSION['id'] = $jUser->id;
        echo '{"status":1,"msg":"user logged in","userId":"'.$jUser->id.'"}';
        exit;
    }

    if( $iTotalUsers == 1 ){
        sendError('Incorrect credentials', __LINE__);
    }
    $iTotalUsers--;
}

function sendError($sMessage, $iLine){
    echo '{"status":0, "message":"'.$sMessage.'", "line":'.$iLine.'}';
    exit;
}
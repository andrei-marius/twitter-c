<?php
try{
    if(!$_POST){ header('Location: signup.php'); }

    if(empty($_POST['email'])){ sendError(400,'Missing email',__LINE__); }
    if(!filter_var( $_POST['email'], FILTER_VALIDATE_EMAIL)){ sendError(400,'Email is not valid',__LINE__); }
    if(empty($_POST['username'])){ sendError(400,'Missing username',__LINE__); }
    if(strlen($_POST['username']) < 3){ sendError(400,'Username must be longer than 3 characters',__LINE__); }
    if(strlen($_POST['username']) > 20 ){ sendError(400,'Username must not be longer than 20 characters',__LINE__); }
    if(empty($_POST['password'])){ sendError(400,'Missing password',__LINE__); }
    if(strlen($_POST['password']) < 5){ sendError(400,'Password must be at least 5 characters long',__LINE__); }
    if(strlen($_POST['password']) > 100 ){ sendError(400,'Password must not be longer than 100 characters',__LINE__); }

    require_once(__DIR__.'../../private/db.php');

    $q = $db->prepare('SELECT * FROM twitter.users WHERE sEmail = :email LIMIT 1');
    $q->bindValue(':email', $_POST['email']);
    $q->execute();
    $row = $q->fetch();
    if( $row ){
        sendError(400,'Email already registered',__LINE__);
    }

    $q = $db->prepare('SELECT * FROM twitter.users WHERE sUserName = :username LIMIT 1');
    $q->bindValue(':username', $_POST['username']);
    $q->execute();
    $row = $q->fetch();
    if( $row ){
        sendError(400,'Username already registered',__LINE__);
    }

    $hashedpw = password_hash( $_POST['password'], PASSWORD_DEFAULT );

    $q = $db->prepare('INSERT INTO twitter.users VALUES (:iId, :sEmail, :sUserName, :sPassword)');
    $q->bindValue(':iId', null);
    $q->bindValue(':sEmail', $_POST['email']);
    $q->bindValue(':sPassword', $hashedpw);
    $q->bindValue(':sUserName', $_POST['username']);
    $q->execute();
    $id = $db->lastInsertId();
    http_response_code(200);
    header('Content-Type: application/json');
    echo '{"status":1,"message":"Account created. You can now log in.","userId":'.$id.'}';
    exit;
}catch(PDOException $ex){
    sendError(500,'System under maintainance',__LINE__);
}

function sendError($iErrorCode, $sMessage, $iLine){
  http_response_code($iErrorCode);
  header('Content-Type: application/json');
  echo '{"status":"0","message":"'.$sMessage.'","line":"'.$iLine.'"}';
  exit;
}
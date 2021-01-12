<?php
try{
    if(!$_POST){ header('Location: login.php'); }

    if(empty($_POST['email'])){ sendError(400,'Missing email',__LINE__); }
    if(empty($_POST['password'])){ sendError(400,'Missing password',__LINE__); }

    require_once( __DIR__.'../../private/db.php' );

    $q = $db->prepare('SELECT * FROM twitter.users WHERE sEmail = :sEmail LIMIT 1');
    $q->bindValue(':sEmail', $_POST['email']);
    $q->execute();
    $row = $q->fetch();
    if( !$row ){
      sendError(401,'Incorrect email',__LINE__);
    }
  
    if(password_verify($_POST['password'], $row[3])){
      session_start();
      $_SESSION['userId'] = $row[0];
      $_SESSION['email'] = $row[1];
      $_SESSION['userName'] = $row[2];
      header('Content-Type: application/json');
      echo '{"status":1,"message":"user logged in","userId":'.$_SESSION['userId'].'}';
      exit;
    }else{
      sendError(401,'Incorrect password',__LINE__);
    }
}catch(PDOException $ex){
    sendError(500,'System under maintainance',__LINE__);
}

function sendError($iResponseCode, $sMessage, $iLine){
    http_response_code($iResponseCode);
    header('Content-Type: application/json');
    echo '{"message":"'.$sMessage.'","line":"'.$iLine.'"}';
    exit;
}
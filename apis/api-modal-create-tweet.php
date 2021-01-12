<?php 
try{  
    session_start();
    if( !$_SESSION ){ sendError(401,'User is not authenticated',__LINE__ ); }
    if(empty($_POST['modalTweetMessage'])){ sendError(400,'Missing tweet message',__LINE__); }
    if(strlen($_POST['modalTweetMessage']) < 1){ sendError(400,'Tweet message is not long enough',__LINE__); }
    if(strlen($_POST['modalTweetMessage']) > 140){ sendError(400,'Tweet message is too long',__LINE__); }  
    
    require_once(__DIR__.'../../private/db.php');

    $q = $db->prepare('INSERT INTO twitter.tweets VALUES (:iId, :iUserIdFk, :sTweet, NOW())');
    $q->bindValue(':iId', null);
    $q->bindValue(':iUserIdFk', $_SESSION['userId']);
    $q->bindValue(':sTweet', $_POST['modalTweetMessage']);
    $q->execute();
    $id = $db->lastInsertId();
    http_response_code(200);
    header('Content-Type: application/json');
    echo '{"status":1,"message":"tweet created","tweetId":'.$id.',"msg":"'.$_POST['modalTweetMessage'].'","userId":'.$_SESSION['userId'].',"userName":"'.$_SESSION['userName'].'"}';
    exit;
}catch(PDOException $ex){
    sendError(500,'System under maintainance',__LINE__);
}

function sendError($iErrorCode, $sMessage, $iLine){
    http_response_code($iErrorCode);
    header('Content-Type: application/json');
    echo '{"message":"'.$sMessage.'", "line":"'.$iLine.'"}';
    exit;
}
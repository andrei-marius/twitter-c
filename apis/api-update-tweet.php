<?php
try{
    session_start();
    if( !$_SESSION ){ sendError(401,'User is not authenticated',__LINE__ ); }
    
    require_once(__DIR__.'../../private/db.php');

    $q = $db->prepare('UPDATE tweets SET sTweet = :newTweetMsg WHERE iId = :tweetId');
    $q->bindValue(':newTweetMsg', $_POST['newTweetMessage']);
    $q->bindValue(':tweetId', $_POST['tweetId']);
    $q->execute();
    if( $q->rowCount() == 0 ){
        sendError(500,'no data',__LINE__);
    }
    http_response_code(200);
    header('Content-Type: application/json');
    echo '{"status":"1","message":"tweet updated","tweetId":"'.$_POST['tweetId'].'"}';
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
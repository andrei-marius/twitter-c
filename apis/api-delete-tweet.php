<?php
    session_start();
    if( !isset($_SESSION['id']) ){
        sendError('user not authenticated', __LINE__ );
    }
    
    if( empty($_POST['userId']) ){
        sendError('tweet user id missing', __LINE__ ); 
    }

    if( empty($_POST['tweetId']) ){
        sendError('tweet id missing', __LINE__ ); 
    }

    if( $_SESSION['id'] !== $_POST['userId'] ){
        sendError('you are not authorised', __LINE__ ); 
    }
    
    $sUsers = file_get_contents(__DIR__ . '/../private/users.txt');
    $aUsers = json_decode($sUsers);
    
    foreach( $aUsers as $jUser){
        if( $_SESSION['id'] == $jUser->id ){
            $aTweets = $jUser->tweets;

            foreach( $aTweets as $iIndex => $jTweet ){
                if( $_POST['tweetId'] == $jTweet->tweetId){
                    array_splice($jUser->tweets, $iIndex, 1);
                    $sUsers = json_encode($aUsers);
                    file_put_contents(__DIR__ . '/../private/users.txt', $sUsers);
                    echo '{"status":1, "id":"' . $jTweet->tweetId . '", "message":"tweet has been deleted"}';
                    exit;
                }
                if( $iIndex === count($aTweets) - 1 ){
                    sendError('No tweet with this id', __LINE__);
                }
            }
        }
    }

function sendError($sMessage, $iLine){
    echo '{"status":0, "message":"'.$sMessage.'", "line":'.$iLine.'}';
    exit;
}
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

    if( empty($_POST['newTweetMessage']) ){
        sendError('tweet message missing', __LINE__);
    }

    if( strlen($_POST['newTweetMessage']) < 1 ){
        sendError('tweet message not long enough', __LINE__);

    }

    if( strlen($_POST['newTweetMessage']) > 140 ){
        sendError('tweet message too long', __LINE__);
    }

    $sUsers = file_get_contents(__DIR__ . '/../private/users.txt');
    $aUsers = json_decode($sUsers);

    foreach( $aUsers as $jUser){
        if( $_SESSION['id'] == $jUser->id ){
            $aTweets = $jUser->tweets;
            
            foreach( $aTweets as $iIndex => $jTweet){
                if( $_POST['tweetId'] == $jTweet->tweetId){
                    $jTweet->message = $_POST['newTweetMessage'];
                    $sUsers = json_encode($aUsers);
                    file_put_contents(__DIR__ . '/../private/users.txt', $sUsers);
                    echo '{"status":1, "id":"' . $jTweet->tweetId . '", "message":"tweet has been updated"}';
                    exit;
                }
                if( $iIndex === count($aTweets) - 1 ){
                    sendError('no tweet with this id', __LINE__);
                }
            }
        }
    }

function sendError($sMessage, $iLine){
    echo '{"status":0, "message":"'.$sMessage.'", "line":'.$iLine.'}';
    exit;
}
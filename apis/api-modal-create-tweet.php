<?php    
    session_start();
    if( !$_SESSION ){
        sendError('user is not authenticated', __LINE__ ); 
    }

    if( empty($_POST['modalTweetMessage']) ){
        sendError('tweet message missing', __LINE__);
    }

    if( strlen($_POST['modalTweetMessage']) < 1 ){
        sendError('tweet message not long enough', __LINE__);

    }
    if( strlen($_POST['modalTweetMessage']) > 140 ){
        sendError('tweet message too long', __LINE__);
    }

    $jTweet = new stdClass();
    $jTweet->userId = $_SESSION['id'];
    $jTweet->tweetId = uniqid();
    $jTweet->message = $_POST['modalTweetMessage'];

    $sUsers = file_get_contents(__DIR__ . '/../private/users.txt');
    $aUsers = json_decode($sUsers);  

    foreach($aUsers as $aUser){
        if( $_SESSION['id'] == $aUser->id ){
            array_unshift($aUser->tweets, $jTweet);
            $sUsers = json_encode($aUsers);
            file_put_contents(__DIR__ . '/../private/users.txt', $sUsers);
            echo '{"status":1, "tweet":'.json_encode($jTweet).'}';
            exit;
        }
    }  

function sendError($sMessage, $iLine){
    echo '{"status":0, "message":"'.$sMessage.'", "line":'.$iLine.'}';
    exit;
}




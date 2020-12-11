<?php
try{
    session_start();
    if( !$_SESSION ){ sendError(401,'User is not authenticated',__LINE__ ); }

    require_once(__DIR__.'../../private/db.php');

    $q = $db->prepare('SELECT * FROM tweets where iUserIdFk = :userId ORDER BY dCreated DESC');
    $q->bindValue(':userId', $_SESSION['userId']);
    $q->execute();
    $aRows = $q->fetchAll();
    if( $aRows ){
        $aRows = array_map(function($aRow){
            return array(
                'id' => $aRow['0'],
                'userId' => $aRow['1'],
                'msg' => $aRow['2']
            );
        }, $aRows);
    header('Content-Type: application/json');
    echo '{"status":"1","message":"tweets loaded","tweets":'.json_encode($aRows).',"userName":"'.$_SESSION['userName'].'"}';
  }else{
    sendError(500,'no data',__LINE__);
  }
  exit;  
}catch(PDOException $ex){
    sendError(500,'System under maintainance',__LINE__);
}

function sendError($iErrorCode, $sMessage, $iLine){
    http_response_code($iErrorCode);
    header('Content-Type: application/json');
    echo '{"message":"'.$sMessage.'","line":"'.$iLine.'"}';
    exit;
  }
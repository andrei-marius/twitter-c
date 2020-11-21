<?php
if( !$_POST ){ header('Location: signup.php'); }

if( empty($_POST['email']) || !filter_var( $_POST['email'], FILTER_VALIDATE_EMAIL)){
  sendError('Email is not valid', __LINE__);
} 

if( empty($_POST['password'])){
  sendError('Password is not valid', __LINE__);
}

if( strlen($_POST['password']) < 5){
  sendError('Password must be longer than 5 characters', __LINE__);
}

if( strlen($_POST['password']) > 20 ){
  sendError('Password must not be longer than 20 characters', __LINE__);
}

$sUsers = file_get_contents(__DIR__ . '/../private/users.txt');
$aUsers = json_decode($sUsers);

foreach( $aUsers as $jUser ){
  if( $_POST['email'] == $jUser->email ){
    sendError('Email has already been used', __LINE__);
  }
}

$hashed_password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$aTweets = [];
$jUser = new stdClass();
$jUser->id = uniqid();
$jUser->email = $_POST['email'];
$jUser->password = $hashed_password;
$jUser->tweets = $aTweets;
array_push($aUsers, $jUser);
file_put_contents(__DIR__ . '/../private/users.txt', json_encode($aUsers));
echo '{"status":1,"msg":"user signed up"}';

function sendError($sMessage, $iLine){
  echo '{"status":0, "message":"'.$sMessage.'", "line":'.$iLine.'}';
  exit;
}
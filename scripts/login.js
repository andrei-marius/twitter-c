"use strict";

function checkIfLogged(){
    if( localStorage.getItem('userID') !== null ){
        window.location = 'home.php'
    } 
}

window.onload = checkIfLogged;

async function logIn(){
    try{
        const formData = new FormData(document.querySelector("#loginForm"))

        const options = {
            method: 'POST',
            body: formData
        }

        const connection = await fetch('apis/api-login.php', options)
        const data = await connection.json()

        if(data.status === 1){
            localStorage.setItem("userID", data.userId)
            window.location = 'home.php'
        }else{
            document.querySelector('#error').textContent = data.message
        }
    }
    catch(err){
      console.log(err)
    }
}
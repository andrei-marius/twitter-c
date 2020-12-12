"use strict";

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
            window.location.replace('home.php')           
        }else{
            document.querySelector('#error').textContent = data.message
        }
    }
    catch(err){
      console.log(err)
    }
}
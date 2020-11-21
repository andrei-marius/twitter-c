"use script";

function checkIfLogged(){
    if( localStorage.getItem('userID') !== null ){
        window.location = 'home.php'
    } 
}

window.onload = checkIfLogged;

async function signUp(){
    try{
        const formData = new FormData(document.querySelector("#signupForm"))

        const options = {
            method: 'POST',
            body: formData
        }

        const connection = await fetch('apis/api-signup.php', options)
        const data = await connection.json()

        if(data.status === 1){
            window.location = 'login.php'
        }else{
            document.querySelector('#error').textContent = data.message
        }
    }
    catch(err){
      console.log(err)
    }
}
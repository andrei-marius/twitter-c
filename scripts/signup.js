"use script";

async function signUp(){
    try{
        const formData = new FormData(document.querySelector("#signupForm"))

        const options = {
            method: 'POST',
            body: formData
        }

        const connection = await fetch('apis/api-signup.php', options)
        const data = await connection.json()

        if(data.status === '1'){
            document.querySelector('#error').textContent = ''
            document.querySelector('#success').textContent = data.message
            document.querySelector("#signupForm").reset()
        }else{
            document.querySelector('#error').textContent = data.message  
        }
    }
    catch(err){
      console.log(err)
    }
}
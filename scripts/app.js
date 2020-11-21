"use strict";

function showPage(elem, pageId){
    document.querySelectorAll('.subpage').forEach( item => {
      item.style.display = "none"
    })
    document.querySelector('.link.active').classList.remove('active')
    elem.classList.add('active')
    document.getElementById(pageId).style.display = "grid"
  }

function checkTyping(){
  const tweetValue = document.querySelector('#tweetForm').elements.tweetMessage.value
  
  if( tweetValue.length > 0 ){
    document.querySelector('#tweetBtn').disabled = false
    document.querySelector('#tweetBtn').style.opacity = '1'
    document.querySelector('#tweetBtn').style.cursor = 'pointer'
  } else{
    document.querySelector('#tweetBtn').disabled = true
    document.querySelector('#tweetBtn').style.opacity = '0.5'
    document.querySelector('#tweetBtn').style.cursor = 'initial'
  }
}

function modalCheckTyping(){
  const tweetValue = document.querySelector('#modalTweetForm').elements.modalTweetMessage.value
  
  if( tweetValue.length > 0 ){
    document.querySelector('#modalTweetBtn').disabled = false
    document.querySelector('#modalTweetBtn').style.opacity = '1'
    document.querySelector('#modalTweetBtn').style.cursor = 'pointer'
  } else{
    document.querySelector('#modalTweetBtn').disabled = true
    document.querySelector('#modalTweetBtn').style.opacity = '0.5'
    document.querySelector('#modalTweetBtn').style.cursor = 'initial'
  }
}

const popup = document.getElementById("logOutPopup");

document.querySelector('#account').addEventListener('click', function(){
  // popup.style.display = "block"
  popup.classList.toggle("show")
  document.querySelector('#account').classList.toggle("account-background");
})

// window.onclick = function(event){
//   if(event.target == popup){
//     popup.style.display = "none"
//   }
// }

const modal = document.getElementById("tweetModal")
const openModalBtn = document.getElementById("open-modal-btn")
const closeModalBtn = document.getElementsByClassName("close")[0]

openModalBtn.addEventListener('click', function(){
  modal.style.display = "block"
})

closeModalBtn.addEventListener('click', function(){
  modal.style.display = "none"
})

window.onclick = function(event){
  if(event.target == modal){
    modal.style.display = "none"
  }
}

async function getTweets(){
  try{
    const connection = await fetch('apis/api-get-tweets.php?userId=' + localStorage.getItem('userID'))
    const data = await connection.json()

    if(data.status === 1){
      data.tweets.forEach(function(tweet){
        const divTweet = `<div class='tweet' id='${tweet.tweetId}'>
          <div class='tweet-column1'>
            <div class='picture'></div>
          </div>   
          <div class='tweet-column2'>
            <div class='tweet-row1'>
              <p><strong>Name</strong></p>
              <p>@at</p>
              <button class="editBtn" onclick="editTweet('${tweet.tweetId}'); return false">Edit</button>
              <button class="deleteBtn" onclick="removeTweet('${tweet.userId}', '${tweet.tweetId}'); return false">Delete</button>
              <button class="updateBtn" onclick="updateTweet('${tweet.userId}', '${tweet.tweetId}'); return false">Update</button>    
              <button class="cancelBtn" onclick="cancelEdit('${tweet.tweetId}'); return false">Cancel</button> 
              <div class='arrow'>
                <svg viewBox='0 0 24 24' class='r-hkyrab r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr'><g><path d='M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z'></path></g></svg>
              </div>
            </div>
            <div class='tweet-row2'>
              <div class="tweetMessage">${tweet.message}</div>
              <input class="newTweetMessage" name="newTweetMessage" type="text" value="${tweet.message}">
            </div>
            <div class='tweet-row3'>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z'></path></g></svg>
              </div>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z'></path></g></svg>
              </div>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z'></path></g></svg>
              </div>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z'></path><path d='M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z'></path></g></svg>
              </div>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M12 22c-.414 0-.75-.336-.75-.75V2.75c0-.414.336-.75.75-.75s.75.336.75.75v18.5c0 .414-.336.75-.75.75zm5.14 0c-.415 0-.75-.336-.75-.75V7.89c0-.415.335-.75.75-.75s.75.335.75.75v13.36c0 .414-.337.75-.75.75zM6.86 22c-.413 0-.75-.336-.75-.75V10.973c0-.414.337-.75.75-.75s.75.336.75.75V21.25c0 .414-.335.75-.75.75z'></path></g></svg>
              </div>
            </div>
          </div>
      </div>`

      document.querySelector("#tweets").insertAdjacentHTML('beforeend', divTweet)
      })
    }else{
      console.log(data.message)
    }
  }
  catch(err){
    console.log(err)
  }
}
window.onload = getTweets()

document.querySelector('#tweetBtn').addEventListener('click', addTweet)
document.querySelector('#modalTweetBtn').addEventListener('click', modalAddTweet)

async function addTweet(){
  const formData = new FormData(document.querySelector('#tweetForm'))

  try{
    const options = {
      method: 'POST',
      body: formData
    }
  
    const connection = await fetch('apis/api-create-tweet.php', options)
    const data = await connection.json()

    if(data.status === 1){
      document.querySelector('#tweetMessage').value = ''
      checkTyping()

      const { tweet } = data

      const divTweet = `<div class='tweet new' id='${tweet.tweetId}'>
          <div class='tweet-column1'>
            <div class='picture'></div>
          </div>   
          <div class='tweet-column2'>
            <div class='tweet-row1'>
              <p><strong>Name</strong></p>
              <p>@at</p>
              <button class="editBtn" onclick="editTweet('${tweet.tweetId}'); return false">Edit</button>
              <button class="deleteBtn" onclick="removeTweet('${tweet.userId}', '${tweet.tweetId}'); return false">Delete</button>
              <button class="updateBtn" onclick="updateTweet('${tweet.userId}', '${tweet.tweetId}'); return false">Update</button>    
              <button class="cancelBtn" onclick="cancelEdit('${tweet.tweetId}'); return false">Cancel</button> 
              <div class='arrow'>
                <svg viewBox='0 0 24 24' class='r-hkyrab r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr'><g><path d='M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z'></path></g></svg>
              </div>
            </div>
            <div class='tweet-row2'>
              <div class="tweetMessage">${tweet.message}</div>
              <input class="newTweetMessage" name="newTweetMessage" type="text" value="${tweet.message}">
            </div>
            <div class='tweet-row3'>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z'></path></g></svg>
              </div>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z'></path></g></svg>
              </div>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z'></path></g></svg>
              </div>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z'></path><path d='M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z'></path></g></svg>
              </div>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M12 22c-.414 0-.75-.336-.75-.75V2.75c0-.414.336-.75.75-.75s.75.336.75.75v18.5c0 .414-.336.75-.75.75zm5.14 0c-.415 0-.75-.336-.75-.75V7.89c0-.415.335-.75.75-.75s.75.335.75.75v13.36c0 .414-.337.75-.75.75zM6.86 22c-.413 0-.75-.336-.75-.75V10.973c0-.414.337-.75.75-.75s.75.336.75.75V21.25c0 .414-.335.75-.75.75z'></path></g></svg>
              </div>
            </div>
          </div>
      </div>`

      document.querySelector("#tweets").insertAdjacentHTML('afterbegin', divTweet)

      fadeIn(document.querySelector(".tweet.new"))
    }else{
      console.log(data.message)
    }
  }
  catch(err){
    console.log(err)
  }
}

async function modalAddTweet(){
  const formData = new FormData(document.querySelector('#modalTweetForm'))

  try{
    const options = {
      method: 'POST',
      body: formData
    }
  
    const connection = await fetch('apis/api-modal-create-tweet.php', options)
    const data = await connection.json()

    if(data.status === 1){
      document.querySelector('#modalTweetMessage').value = ''
      modalCheckTyping()
      modal.style.display = "none"

      const { tweet } = data

      const divTweet = `<div class='tweet new' id='${tweet.tweetId}'>
          <div class='tweet-column1'>
            <div class='picture'></div>
          </div>   
          <div class='tweet-column2'>
            <div class='tweet-row1'>
              <p><strong>Name</strong></p>
              <p>@at</p>
              <button class="editBtn" onclick="editTweet('${tweet.tweetId}'); return false">Edit</button>
              <button class="deleteBtn" onclick="removeTweet('${tweet.userId}', '${tweet.tweetId}'); return false">Delete</button>
              <button class="updateBtn" onclick="updateTweet('${tweet.userId}', '${tweet.tweetId}'); return false">Update</button>    
              <button class="cancelBtn" onclick="cancelEdit('${tweet.tweetId}'); return false">Cancel</button> 
              <div class='arrow'>
                <svg viewBox='0 0 24 24' class='r-hkyrab r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr'><g><path d='M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z'></path></g></svg>
              </div>
            </div>
            <div class='tweet-row2'>
              <div class="tweetMessage">${tweet.message}</div>
              <input class="newTweetMessage" name="newTweetMessage" type="text" value="${tweet.message}">
            </div>
            <div class='tweet-row3'>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z'></path></g></svg>
              </div>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z'></path></g></svg>
              </div>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z'></path></g></svg>
              </div>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z'></path><path d='M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z'></path></g></svg>
              </div>
              <div>
                <svg viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'><g><path d='M12 22c-.414 0-.75-.336-.75-.75V2.75c0-.414.336-.75.75-.75s.75.336.75.75v18.5c0 .414-.336.75-.75.75zm5.14 0c-.415 0-.75-.336-.75-.75V7.89c0-.415.335-.75.75-.75s.75.335.75.75v13.36c0 .414-.337.75-.75.75zM6.86 22c-.413 0-.75-.336-.75-.75V10.973c0-.414.337-.75.75-.75s.75.336.75.75V21.25c0 .414-.335.75-.75.75z'></path></g></svg>
              </div>
            </div>
          </div>
      </div>`

      document.querySelector("#tweets").insertAdjacentHTML('afterbegin', divTweet)

      fadeIn(document.querySelector(".tweet.new"))
    }else{
      console.log(data.message)
    }
  }
  catch(err){
    console.log(err)
  }
}

async function removeTweet(userId, tweetId){
  try{
    const formData = new FormData()
    formData.append('tweetId', tweetId)
    formData.append('userId', userId)

    const options = {
      method: 'POST',
      body: formData
    }
  
    const connection = await fetch('apis/api-delete-tweet.php', options)
    const data = await connection.json()

    if( data.status === 1 ){
      document.getElementById(`${tweetId}`).remove()
    }else{
      console.log(data.message)
    }
  }
  catch(err){
    console.log(err)
  }
}

function editTweet(tweetId){
  const rootElement = document.getElementById(`${tweetId}`)
  rootElement.querySelector('.newTweetMessage').value = rootElement.querySelector('.tweetMessage').textContent
  rootElement.querySelector('.tweetMessage').style.display = 'none'
  rootElement.querySelector('.newTweetMessage').style.display = 'block'
  rootElement.querySelector('.updateBtn').style.display = 'block'
  rootElement.querySelector('.editBtn').style.display = 'none'
  rootElement.querySelector('.deleteBtn').style.display = 'none'
  rootElement.querySelector('.cancelBtn').style.display = 'block'
  
}

function cancelEdit(tweetId){
  const rootElement = document.getElementById(`${tweetId}`)
  rootElement.querySelector('.newTweetMessage').value = rootElement.querySelector('.tweetMessage').textContent
  rootElement.querySelector('.tweetMessage').style.display = 'block'
  rootElement.querySelector('.newTweetMessage').style.display = 'none'
  rootElement.querySelector('.updateBtn').style.display = 'none'
  rootElement.querySelector('.editBtn').style.display = 'block'
  rootElement.querySelector('.deleteBtn').style.display = 'block'
  rootElement.querySelector('.cancelBtn').style.display = 'none'
}

async function updateTweet(userId, tweetId){
  try{
    const newInputValue = document.getElementById(`${tweetId}`).querySelector('.newTweetMessage').value
    const formData = new FormData()
    formData.append('tweetId', tweetId)
    formData.append('userId', userId)
    formData.append('newTweetMessage', newInputValue)

    const options = {
      method: 'POST',
      body: formData
    }
  
    const connection = await fetch('apis/api-update-tweet.php', options)
    const data = await connection.json()

    if( data.status === 1 ){
      cancelEdit(tweetId)
      const rootElement = document.getElementById(`${tweetId}`)
      rootElement.querySelector('.tweetMessage').textContent = newInputValue
    }else{
      console.log(data.message)
    }
  }
  catch(err){
    console.log(err)
  }
}

document.querySelector('#logOutPopup').addEventListener('click', logOut)

async function logOut(){
  try{
    const connection = await fetch('apis/api-logout.php')
    const data = await connection.json()

    if(data){
      localStorage.clear()
      window.location = 'login.php'
    }

  }
  catch(err){
    console.log(err)
  }
}

function fadeIn(element){
  let op = 0.1  // initial opacity
  let timer = setInterval(function(){
    if(op >= 1){
      clearInterval(timer)
    }
    element.style.opacity = op
    element.style.filter = 'alpha(opacity=' + op * 100 + ")"
    op += op * 0.1
  }, 15)
}
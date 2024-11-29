// references
let list = document.querySelector('.chat-list');
let newChat = document.querySelector('.new-chat');
let newName = document.querySelector('.new-name');
let msg = document.querySelector('.update-msg');
let room = document.querySelector('.chat-rooms')
// add new chat to the database with the form

newChat.addEventListener('submit',e=>{
      e.preventDefault();
      let chat = newChat.message.value.trim();
      chatroom.addChats(chat).then()
      .catch(err=>{console.log(err);})

      newChat.reset();
})


// update username

newName.addEventListener('submit', e=>{
      e.preventDefault();
      // update name via the chatromm class
      let user= newName.name.value.trim();
      chatroom.updateUsername(user)
       //reset form
       newName.reset(); 
      //  show then hide the update message
      msg.innerText = `your username was updated to ${user}`;

      setTimeout(()=>{
            msg.innerText = ''
      },3000)

      
})


// update rooms

room.addEventListener('click', (e)=>{
      if(e.target.tagName=== 'BUTTON'){
            let currentRoom = e.target.getAttribute('id');
            // clear current chat
            chatui.clear();

            // update room

            chatroom.updateRoom(currentRoom);
            chatroom.getChats(chat=>{
                  chatui.render(chat)
            })

            
      }
})


// check local storage for a name

let username = localStorage.username ? localStorage.username : 'anon'


// class instances
let chatui = new ChatUi(list)
let chatroom = new Chatroom('general', username);

chatroom.getChats((data)=>{chatui.render(data)});


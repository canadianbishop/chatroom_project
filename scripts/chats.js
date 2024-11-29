// add a new chat document 
// set up a realtime event listenter to get chats
// update username
// update room

class Chatroom{
      constructor(room, username){
            this.room = room;
            this.username = username;
            this.chats = db.collection('my_chats');
            this.unsub;
      }
      async addChats(message){
            let now = new Date();
            let chat ={
                  message: message,
                  room : this.room,
                  username : this.username,
                  created_at : firebase.firestore.Timestamp.fromDate(now)
            };
            // sending chat
            let response = await this.chats.add(chat);
            return response;
      }

      getChats(callback){
           this.unsub =  this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot=>{
                  snapshot.docChanges().forEach(change=>{
                        if(change.type==='added'){
                              let chats = change.doc.data();
                              // inject data to the dom
                              callback(chats)
                        }
                  });
                  
            })
      }

      updateUsername(username){
            this.username = username;
            localStorage.setItem('username', username);
      }

      updateRoom(room){
            this.room = room;
            // console.log('room updated');
            if(this.unsub){
            this.unsub();
            }
            
      }
}



// chatroom.addChats('this is testing')
// .then(()=>{console.log('new chat added');})
// .catch(err=>{console.log(err);})





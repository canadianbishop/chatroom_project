// render chats to the dom
// clear chats from the dom when room changes

class ChatUi{
      constructor(list){
            this.list = list;
      }
      render(data){
            let when = dateFns.distanceInWordsToNow(data.created_at.toDate(),{
                  addSuffix: true
            })
            let html = `<li class="list-group-item">
            <span class ="username">${data.username}</span>
            <span class = "message">${data.message}</span>
            <div class ="time">${when}</div>
            
            </li> 
            `
            this.list.innerHTML += html;
      }

      clear(){
            this.list.innerHTML = '';
      }
}
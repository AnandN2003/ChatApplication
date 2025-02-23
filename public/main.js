//client side

const socket = io();

const clienttotal = document.getElementById("client-total");

socket.on("clients-total",(data)=>{
    clienttotal.innerText = `Total Clients : ${data}`
})

const messagecontainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageform = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

messageform.addEventListener('submit',(e)=>{
    e.preventDefault();
    sendmessage();
})
function sendmessage(){
    const data = {
        name : nameInput.value,
        message : messageInput.value,
        dateTime: new Date()
    };
    console.log("sending data:",data);
    socket.emit('userdata',data);
    addMessageToUi(true,data);
    messageInput.value = '';
}

socket.on('chat-message',(data)=>{
    console.log(data);
    addMessageToUi(false,data);
})

function addMessageToUi(isOwnMessage,data){
    const element = `
        <li class="${isOwnMessage? "message-right":"message-left"}">
          <p class="message">
            ${data.message}
            <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
          </p>
        </li>`;

    messagecontainer.innerHTML += element;
}

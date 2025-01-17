const socket = io();

const clienttotal = document.getElementById("client-total");

socket.on("clients-total",(data)=>{
    clienttotal.innerText = `Total Clients : ${data}`
})
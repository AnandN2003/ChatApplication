const express = require("express");
const app = express();
const path = require("path");
const PORT = 4000;
const server = app.listen(PORT,()=>{
    console.log(`✌chat server running on port ${PORT}`);
});

const io = require("socket.io")(server);

let socketsconnected = new Set();

app.use(express.static(path.join(__dirname,'public')));

io.on("connection",onConnected);

function onConnected(socket){
    console.log(socket.id);
    socketsconnected.add(socket.id);

    io.emit('clients-total',socketsconnected.size);

    socket.on("disconnect",()=>{
        console.log("socket disconnected",socket.id);
        socketsconnected.delete(socket.id);
        io.emit('clients-total',socketsconnected.size);
    })
}

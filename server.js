// import express
const express = require("express");

// already provioded by node
const http = require("http");
// import socket.io
const socketIO = require("socket.io");
const PORT = process.env.PORT || 8000;



// create express server
const expressServer = express();
expressServer.use((req,res,next)=>{
    console.log("hey --> This is a middleware");
    
    res.data = "heyy"
    next();
    
});


// body:"{obj"


// Modify express server to http
const httpServer = http.createServer(expressServer);


// console.log(socketIO);
const SocketServer = socketIO.Server;

// create an object of SocketServer required to create io
const io = new SocketServer(httpServer);
// console.log(io)
// httpServer.use()
//when ever we create the connection we get the socket
//when browser connects to the server,it performs connection event

io.on("connection", (socket) => {
console.log(socket.id);
socket.on("message event",(data)=>{
    io.emit("message event",data)
    
})
})

expressServer.use((express.static("./public")));

expressServer.listen(PORT, () => {
    console.log(`server has build sucessfully and listening to PORT ${PORT}`);
})
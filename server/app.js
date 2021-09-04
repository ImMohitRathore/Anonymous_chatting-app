const express = require("express");
const cors = require("cors");
const http = require("http");
const SocketIO = require("socket.io");


const app = express();

app.get("/",(req ,res)=>{
res.send("hello from the server site ")
})

const userr =[{}] ;

app.use(cors());

const server = http.createServer(app);




const socketed = SocketIO(server)



socketed.on("connection",(socket)=>{
    console.log("connecteddd");
    
    
    socket.on("join",(user)=>{
        userr[socket.id] = user;
    console.log(`${user} has joined`);
    socket.broadcast.emit("userJoined",{User:"Admin", message:`${userr[socket.id]} has joined`})
    socket.emit("welcome",{User:"Admin" , message:`welcome to the chat , ${userr[socket.id]}`})

    socket.on("finalmes",(message , id  , User)=>{
        

        socketed.emit("sendmessage",{ id , User , message})
        })
    })

    
    
    
    socket.on("disconnect",( )=>{
        socket.broadcast.emit("e",{ User:"Admin", message:`${userr[socket.id]} is left the chat`})
        console.log(`${userr[socket.id]}is left the chat`);  
    })


    
})

 const PORT = process.env.PORT;
server.listen(PORT , ()=>{
    console.log(`server is listening port ${PORT} `);
})
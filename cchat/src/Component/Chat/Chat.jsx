import React, { useEffect, useState } from 'react'
import "../Chat/Chat.css"
import {User} from "../Home/Home"
import SocketIO from "socket.io-client";
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';

const ENDPOINT = "http://localhost:5000/"



let socket;

const Chat = () => {
    const [id , setid]= useState()
    const [messages ,setmessages ]= useState([])

    const send =()=>{
        const message = document.getElementById("chatinput").value;
        socket.emit("finalmes",{message ,id , User});
       document.getElementById("chatinput").value="";
        
    } 

    useEffect(()=>{
         socket = SocketIO(ENDPOINT , { transports:['websocket']})
        socket.on("connect",()=>{
            
            setid(socket.id)
        })
        socket.emit("join",(User))

        socket.on("welcome",(data)=>{
             console.log(data.main , data.message);
             setmessages([...messages , data])
        })

        socket.on("userJoined",(data)=>{
            console.log(data.main , data.message);
            setmessages([...messages , data])
       }) 
       
       socket.on("e",(data)=>{
        console.log(data.main);
        setmessages([...messages , data])
       })
       
       return()=>{
           
           
           socket.emit("disconnect");
           
           socket.off();
           
       }

     
       
    },[])


    useEffect(()=>{
        socket.on("sendmessage",( data)=>{
                // console.log(  message);
                setmessages([...messages , data.message])
                return()=>{
                    socket.off()
                }
        })
    },[messages])
    
    return (
        <>
           <div className="chatmain">
               <div className="chat_card">
                   <div className="header">
                       <h1>SECRET CHAT !!!</h1>

                     <a href="/"> <button  ><i class="zmdi zmdi-close"></i></button></a>
                   </div>
                   <ScrollToBottom className="chat_box">
                   {
                       messages.map((item , index )=>
                           
                    
                           <Message user = {item.id===id? ``:item.User} message={  item.message} classs={item.id ===id? "right" : "left"}  />
                           
                    ) 
                }
                   </ScrollToBottom>
                   <div className="inputbox">
                       <input onKeyPress={(e)=>{
                                if(e.key==="Enter"){send()}
                       }} type="text" id="chatinput" />
                       <button onClick={send}> <i class="zmdi zmdi-mail-send"></i></button>
                   </div>
               </div>
           </div>
        </>
    )
}

export default Chat

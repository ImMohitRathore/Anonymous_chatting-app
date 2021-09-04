import React from 'react'
import "./Message.css"


const Message = ({ user,message, classs}) => {

     if(user){

        return (
            <div className= {`mbox ${classs}`} >
               <p>{`${user}: ${message}` }</p> 
               
            </div>
        )
    }else{
        return (
            <div className= {`mbox ${classs}`}>
               <p>{`you : ${message}` }</p> 
             
            </div>
        ) }
}


export default Message

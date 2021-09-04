import React from 'react'
import { Switch ,   Route} from "react-router-dom"
import Home from "./Component/Home/Home"
import Chat from "./Component/Chat/Chat"
// import SocketIO from "socket.io-client";
// const ENDPOINT = "http://localhost:5000/"
// const socket = SocketIO(ENDPOINT , { transports:['websocket']})

const App = () => {
 
  return (
    <>
    
      <Switch>
       <Route path="/" exact component = {Home} />
       <Route path ="/chat" component = {Chat} />

      </Switch>
    </>
  )
}

export default App


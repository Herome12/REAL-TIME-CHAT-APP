
import React, { useEffect } from 'react'
import {io} from "socket.io-client"

function App() {

  const socket = io("http://localhost:8000",{withCredentials:true})
  useEffect(() => {
   socket.on("connect",()=>{
    console.log("connected successfully"+socket.id)

    socket.on("Welcome",(m)=>{
      console.log(m)
    })
   })
  }, [socket])
  
  return (
  <>
  </>

   
  ); 
}

export default App;

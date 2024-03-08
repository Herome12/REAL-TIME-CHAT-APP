import React, { useState,useEffect, useMemo } from "react";
import TextField from "@mui/material/TextField";
import "./chat.css";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
 

const Chat = () => {
  const [message, setmessage] = useState("");
  const [Messages, setMessages] = useState([])
  const [directMessage, setdirectMessage] = useState([])


 
   const socket = useMemo(() => io("http://localhost:8000"), [])

   useEffect(() => {
      socket.on("connect",()=>{
        console.log("user connected successfully",socket.id)

        socket.on("Welcome",(d)=>{
          console.log(d)
        })
        socket.on("recieve-message",(data)=>{
          console.log(data)
          setMessages((Messages)=>[...Messages,data])
        })
        socket.on("recieve",(data)=>{
          console.log(data)
          setdirectMessage((directMessage)=>[...directMessage,data])
        })
        
      })
      
   
    
   }, [socket])
   

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit("message",message)
    
    setmessage("")
    
  };

  return (
    <>
    <div className="container">

    
      <form onSubmit={handleSubmit}>
      <Stack>
      
          
          {Messages.map((value,index)=>(
             <Typography  className="message" key={index}><div>{value}</div></Typography>
          )
              
          )}
          {
            directMessage.map((value,index)=>(
              <Typography className="directMessage" key={index}><div>{value}</div></Typography>
            ))
          }
        
        </Stack>
        
        <TextField
          id="outlined-basic"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          label="Outlined"
          variant="outlined"
        />
        <div>
          <Button variant="contained" type="submit">
            Send
          </Button>
        </div>
        
      
        
      </form>
      </div>
    </>
  );
};

export default Chat;
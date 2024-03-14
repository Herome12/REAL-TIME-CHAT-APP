import React, { useState, useEffect, useMemo } from "react";
import TextField from "@mui/material/TextField";
import "./chat.css";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../action/UserAction";
import Users from "./Users";
import NoChatSelected from "../layout/Nochat";
import Message from "./Message.js"

const Chat = () => {
  const chatEmpty = false;
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [directMessage, setDirectMessage] = useState([]);
  const { users } = useSelector((state) => state.AllUsers);
  const socket = useMemo(() => io("http://localhost:8000"), []);

  useEffect(() => {
    dispatch(getAllUsers());
    socket.on("connect", () => {
      console.log("user connected successfully", socket.id);

      socket.on("Welcome", (d) => {
        console.log(d);
      });
      socket.on("recieve-message", (data) => {
        console.log(data);
        setMessages((messages) => [...messages, data]);
      });
      socket.on("recieve", (data) => {
        console.log(data);
        setDirectMessage((directMessage) => [...directMessage, data]);
      });
    });
  }, [socket, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <>
    <div className="world">
    <div className="User">
      {
        users&&  users.map((user,index)=>(
          <Users user = {user} key={index}/>
        ))
      }
      
    </div>
    <div className="rightMessage">
      <form >
        <TextField className="Textfield"/>
      </form>
    </div>
   
    </div>

    </>
  );
};

export default Chat;

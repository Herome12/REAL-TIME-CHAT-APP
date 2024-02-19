const express = require("express")
const {createServer} = require("http");
const {Server} = require("socket.io")
const cors = require("cors")
const app = require("./app")
const userData = require("./database")


 

 

const server = createServer(app) 
const io =  new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"],
    credentials:true,
  }
});

app.use(
  cors({
    origin:"http://localhost:3000",
    methods:["GET","POST"],
    credentials:true,
  })
)

//connection to database 
userData();

io.on("connection",(socket)=>{
  console.log(`connected successfull ${socket.id}`)

  socket.broadcast.emit("Welcome",`Welcome to the server:${socket.id}`)
})
  
app.get("/",(req,res)=>{
    res.send("socket") 
})

//server
server.listen(process.env.PORT,()=>{
    console.log(`connected successfully${process.env.PORT}`)
})


module.exports = app;
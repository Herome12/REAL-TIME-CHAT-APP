
import React, { useEffect } from 'react'
import {io} from "socket.io-client"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Header from './Components/Header/Header'
import Home from "./Components/Home/Home"
import SignIn from './Components/User/SignIn'

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
  <Router>
    <Header/>
    <Routes>
      <Route exact path='/' Component={Home}/>
      <Route exact path='/login' Component={SignIn}/>
      

      
    </Routes>
  </Router>

  </>

   
  ); 
}

export default App;


import React, { useEffect } from 'react'
import {io} from "socket.io-client"
import {BrowserRouter as Router,Routes,Route, useSearchParams} from "react-router-dom"
import Header from './Components/Header/Header'
import Home from "./Components/Home/Home"
import SignIn from './Components/User/SignIn'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadUser } from './action/UserAction'


function App() {

  const dispatch= useDispatch();
  
  //use Selector 
  const {user} = useSelector((state)=>state.load)

  const socket = io("http://localhost:8000",{withCredentials:true})
  useEffect(() => {

    //load user action deployment 
    dispatch(loadUser())

     
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

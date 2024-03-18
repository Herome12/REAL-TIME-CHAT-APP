
import React, { useEffect,useState } from 'react'
import {io} from "socket.io-client"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"


import SignIn from './Components/User/SignIn'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadUser } from './action/UserAction'
import Users from './Components/Home/Users'



 


function App() {

  const dispatch= useDispatch();

  //use Selector 
  const {user} = useSelector((state)=>state.load)

  const socket = io("http://localhost:8000",{withCredentials:true})
  useEffect(() => {

    //load user action deployment 
     dispatch(loadUser())

     
  
  }, [dispatch])
  
  return (
  <>
  <Router>
    
  
    <Routes>
      <Route exact path='/' Component={SignIn}/>
      <Route exact path = '/chat' Component={Users}/>
      
      
      

      
    </Routes>
  </Router>
 
  </>

   
  ); 
}

export default App;

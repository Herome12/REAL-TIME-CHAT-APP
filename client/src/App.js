
import React, { useEffect } from 'react'
import {io} from "socket.io-client"
import {BrowserRouter as Router,Routes,Route, useSearchParams} from "react-router-dom"
import Header from './Components/Header/Header'
import Home from "./Components/Home/Home"
import SignIn from './Components/User/SignIn'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadUser } from './action/UserAction'
import Chat from './Components/Home/Chat'


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
    <Header/>
  
    <Routes>
      <Route exact path='/' Component={SignIn}/>
      
      <Route exact path='/chat' Component={Chat}/>
      
      

      
    </Routes>
  </Router>

  </>

   
  ); 
}

export default App;

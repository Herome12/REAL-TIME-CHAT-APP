import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import "./singin.css"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import MailIcon from '@mui/icons-material/Mail';
import PasswordIcon from '@mui/icons-material/Password';

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const [user, setuser] = useState({
        name:"",
        email:"",
        password:""
    })


    const {name,email,password} = user;

    const [avatar, setavatar] = useState("")
    const [avatarPreview, setavatarPreview] = useState("/logo512.png")


    
  
  
  
    return (
    <div>SignIn</div>
  )
}

export default SignIn
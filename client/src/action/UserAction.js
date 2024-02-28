import {createAction} from "@reduxjs/toolkit";
import axios from "axios"



export const LOGIN_REQUEST = createAction("LOGIN_REQUEST");
export const LOGIN_SUCCESS =createAction ("LOGIN_SUCCESS");
export const LOGIN_FAIL = createAction("LOGIN_FAIL");

// REGISTER USER

export const REGISTER_USER_REQUEST =createAction ( "REGISTER_USER_REQUEST");
export const REGISTER_USER_SUCCESS = createAction("REGISTER_USER_SUCCESS");
export const REGISTER_USER_FAIL =createAction ("REGISTER_USER_FAIL");

//LOAD USER 
export const LOAD_REQUEST = createAction("LOAD_REQUEST")
export const LOAD_SUCCESS = createAction("LOAD_SUCCESS")
export const LOAD_FAIL = createAction("LOAD_FAIL")




//login user 

export const loginUser = (email,password) =>async(dispatch)=>{

    try {
        dispatch({
            type:LOGIN_REQUEST
        })
        
       
        const config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.post("/api/v1/loginUser",{email,password},config)
        console.log(data)

        dispatch({
            type:LOGIN_SUCCESS,
            payload:data
        })


    } catch (error) {

        dispatch({
            type:LOGIN_FAIL,
            payload:error.message,
        })
        
    }

}

export const userRegister = (userData)=>async(dispatch)=>{
    try {
        dispatch({
            type:REGISTER_USER_REQUEST
        })

        const config = {headers:{"Content-Type":"multipart/form-data"}};
        const {data} = await axios.post("/api/v1/createUser",userData,config)

        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload:data.user
        })
        

    } catch (error) {
        dispatch({
            type:REGISTER_USER_FAIL,
            payload:error.message
        })
        
    }
}

//load user 

export  const loadUser = ()=>async(dispatch) =>{

    try {
        dispatch({
            type:LOAD_REQUEST
        })

        const config = {headers:{"Content-Type":"application/json"}}

        const {data} = await axios.get("/api/v1/me",config)

        dispatch({
            type:LOAD_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:LOAD_FAIL,
            payload:error.message
        })
        
    }
}
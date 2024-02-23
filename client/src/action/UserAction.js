import {createAction} from "@reduxjs/toolkit";
import axios from "axios"


export const LOGIN_REQUEST = createAction("LOGIN_REQUEST");
export const LOGIN_SUCCESS =createAction ("LOGIN_SUCCESS");
export const LOGIN_FAIL = createAction("LOGIN_FAIL");

// REGISTER USER

export const REGISTER_USER_REQUEST =createAction ( "REGISTER_USER_REQUEST");
export const REGISTER_USER_SUCCESS = createAction("REGISTER_USER_SUCCESS");
export const REGISTER_USER_FAIL =createAction ("REGISTER_USER_FAIL");


//login user 

export const loginUser = (email,password) =>async(dispatch)=>{

    try {
        dispatch({
            type:LOGIN_REQUEST
        })
        
       
        const config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.post("/api/v1/loginUser",{email,password},config)

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
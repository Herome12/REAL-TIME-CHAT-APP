import { createReducer } from "@reduxjs/toolkit";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../action/UserAction";


//loginUser 
const initialValue = {
    LoginData:[]
}
export const userLogin = createReducer(initialValue,(builder)=>{
    builder.addCase(LOGIN_REQUEST,(state,action)=>{
        return{
            loading:true,

        }
    })
    builder.addCase(LOGIN_SUCCESS,(state,action)=>{
        return{
            loading:false,
            userLogin:action.payload
        }
    })

    builder.addCase(LOGIN_FAIL,(state,action)=>{
        return{
            loading:false,
            error:action.payload
        }
    })
})
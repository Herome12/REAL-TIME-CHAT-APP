import { createReducer } from "@reduxjs/toolkit";
import { LOAD_FAIL, LOAD_REQUEST, LOAD_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../action/UserAction";


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
            isAuthenticated:true,
          
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

//register user 
export const userRegister = createReducer(initialValue,(builder)=>{
    builder.addCase(REGISTER_USER_REQUEST,(state,action)=>{
        return{
            loading:true
        }
    })

    builder.addCase(REGISTER_USER_SUCCESS,(state,action)=>{
        return{
            loading:false,
            isAuthenticated:true,
            registerUser:action.payload
        }
    })
    builder.addCase(REGISTER_USER_FAIL,(state,action)=>{
        return{
            loading:false,
            error:action.payload
        }
    })
})

//load user 

export const loadUser = createReducer(initialValue,(builder)=>{
    builder.addCase(LOAD_REQUEST,(state,action)=>{
        return{
            loading:true
        }
    })
    builder.addCase(LOAD_SUCCESS,(state,action)=>{
        return{
            loading:false,
            isAuthenticated:true,
            load:action.payload
        }
    })

    builder.addCase(LOAD_FAIL,(state,action)=>{
        return{
            loading:false,
            error:action.payload
        }
    })
})
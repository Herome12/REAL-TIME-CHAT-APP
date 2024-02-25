import {configureStore} from "@reduxjs/toolkit"
import { userLogin, userRegister } from "./reducer/UserReducer"




 const store = configureStore({
     reducer:{
        login:userLogin,
        register:userRegister
        
     }
})

export default  store
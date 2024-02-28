import {configureStore} from "@reduxjs/toolkit"
import { loadUser, userLogin, userRegister } from "./reducer/UserReducer"




 const store = configureStore({
     reducer:{
        login:userLogin,
        register:userRegister,
        load:loadUser
        
     }
})

export default  store
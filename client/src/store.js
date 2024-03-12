import {configureStore} from "@reduxjs/toolkit"
import { getUsers, loadUser, userLogin, userRegister } from "./reducer/UserReducer"




 const store = configureStore({
     reducer:{
        login:userLogin,
        register:userRegister,
        load:loadUser,
        AllUsers:getUsers
        
     }
})

export default  store
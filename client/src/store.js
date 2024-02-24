import {configureStore} from "@reduxjs/toolkit"
import { userLogin } from "./reducer/UserReducer"



 const store = configureStore({
     reducer:{
        login:userLogin
     }
})

export default  store
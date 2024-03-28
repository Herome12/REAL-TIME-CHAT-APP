const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const app = express();
const cookie_parser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")




app.use(express.json());
app.use(cookie_parser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

//connecting config
 


dotenv.config({path:"./config/config.env"})
 

const user = require("./router/userRouter")

const Chat = require("./router/Chat")

 

app.use("/api/v1",user)
 
app.use("api/v1/",Chat)







module.exports = app
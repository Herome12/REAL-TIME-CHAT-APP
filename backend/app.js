const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const app = express();
const cookie_parser = require("cookie-parser")
const bodyParser = require("body-parser")



app.use(express.json());
app.use(cookie_parser());
 

const user = require("./router/userRouter")

app.use("api/v1",user)


//connecting config
dotenv.config({path:"./config/config.env"})





module.exports = app
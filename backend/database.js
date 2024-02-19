const mongoose = require("mongoose");

const userData = ()=>{
    mongoose.connect(process.env.databaseUri,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log("connected successfully",process.env.databaseUri)
    }).catch((e)=>{
        console.log(e)
    })
}



module.exports = userData;
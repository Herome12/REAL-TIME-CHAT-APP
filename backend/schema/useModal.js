const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"please enter your name"],
        maxLength:[30,"you have crossed limit"],
        minLenght:[2,"name should be more than min lenght"]
    },

    email:{
        type:String,
        require:[true,"enter your email address"],
        unique:true,
        validator:[validator.isEmail,"please enter valid email"]

    },

    password:{
        type:String,
        require:[true,"please enter your password"],
        select:false
    },

    role:{
        type:String,
        default:"user",
    },

    avatar:{
        public_id:{
            type:String,
            require:true,

        },
        url:{
            type:String,
            require:true,
        }
    },

    createAt:{
        type:Date,
        default:Date.now()
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

//methods

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
 
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}






module.exports = mongoose.model("User",userSchema);
const User = require("../schema/useModal")
const ErrorHandler = require("../utils/errorhandler")



exports.newUser = async(req,res,next)=>{
    
    const {name,email,password} = req.body

    const user = await User.create({name,email,password})

   res.status(200).json({
    success:true,
    message:"user successfully created",
    user
   })

}  

exports.loginUser = async(req,res,next)=>{
    const {email,password} = req.body;
  
  
    if(!email||!password){
        return next(new ErrorHandler("please put email or password",400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("invalid Email or Password",400))

    }

    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch){
        return next(new ErrorHandler("invalid email or password",400))
    }

    res.status(200).json({
        success:true,
        user,
    }) 
}

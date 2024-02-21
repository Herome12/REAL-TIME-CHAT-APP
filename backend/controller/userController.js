const User = require("../schema/useModal")
const ErrorHandler = require("../utils/errorhandler")
const sendToken = require("../utils/sendToken")
const catchAsynError = require("../middleware/catchAsynError")



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

    sendToken(user,200,res);
}

//logout user 

exports.logoutUser = catchAsynError(async(req,res,next)=>{
    res.cookie('token',null,{
        expireIn:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"user successfully logout"
    })
})


exports.getUserDetails = catchAsynError(async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler("user not found",404))
    }

    res.status(200).json({
        success:true,
        user,
        
    })
})

exports.getAllUsers = catchAsynError(async(req,res,next)=>{
    const user = await  User.find();

    res.status(200).json({
        success:true,
        user
    })
})

//forgot password 

exports.forgotPassword = catchAsynError(async(req,res,next)=>{
    

    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandler("user not found",404))
    }

    const resetToken = await user.getResetPasswordToken();

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requeseted it kindly ignore it `
     
    try {
        await sendEmail({
            email:user.email,
            subject:"password recorvery token",
            message:message
        })
        res.status(200).json({
            success:true,
            message:`message sent to ${user.email} successfully`
        })


         
    } catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
    await user.save({validateBeforeSave:false})

    return next(new ErrorHandler(error.message,500))


        
    }
})
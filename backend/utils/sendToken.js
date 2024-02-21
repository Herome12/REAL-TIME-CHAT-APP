const sendToken = (user,statusCode,res) =>{
    const token = user.getJwtToken();

    const options ={
        expiresIn: new Date(Date.now()+process.env.COOKIE *24*60*60*1000),
        httpOnly:true,
    }


    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        message:"required cookie"
    })
}

module.exports = sendToken
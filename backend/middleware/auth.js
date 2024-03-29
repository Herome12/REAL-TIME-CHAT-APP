const ErrorHandler = require("../utils/errorhandler");
const catchasyncerror = require("./catchAsynError");
const jwt = require("jsonwebtoken");
const User = require("../schema/useModal");



exports.isAuthenticatedUser = catchasyncerror(async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("please login to move further",401))
    }

    const decodedData = jwt.verify(token,process.env.JWTTOKEN)

    req.user = await User.findById(decodedData.id)

    next();
})
 
exports.isRoleAuthentication = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };

exports.socketAuthenticator = async (err, socket, next) => {
    try {
      if (err) return next(err);
  
      const authToken = socket.request.cookies[CHATTU_TOKEN];
  
      if (!authToken)
        return next(new ErrorHandler("Please login to access this route", 401));
  
      const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);
  
      const user = await User.findById(decodedData._id);
  
      if (!user)
        return next(new ErrorHandler("Please login to access this route", 401));
  
      socket.user = user;
  
      return next();
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Please login to access this route", 401));
    }
  };
const User = require("../schema/useModal");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/sendToken");
const catchAsynError = require("../middleware/catchAsynError");
const sendEmail = require("../middleware/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary")

exports.newUser = async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "userAvatar",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

 sendToken(user,200,res)
 
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("please put email or password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("invalid Email or Password", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("invalid email or password", 400));
  }

  sendToken(user, 200, res);
};

//logout user

exports.logoutUser = catchAsynError(async (req, res, next) => {
  res.cookie("token", null, {
    expireIn: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "user successfully logout",
  });
});

exports.getUserDetails = catchAsynError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.getAllUsers = catchAsynError(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    success: true,
    user,
  });
});

//forgot password

exports.forgotPassword = catchAsynError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  const resetToken = await user.getResetPasswordToken();

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requeseted it kindly ignore it `;

  try {
    await sendEmail({
      email: user.email,
      subject: "password recorvery token",
      message: message,
    });
    res.status(200).json({
      success: true,
      message: `message sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password

exports.resetPassword = catchAsynError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password doesn't match", 404));
  }

  user.password = req.body.confirmPassword;
  user.resetPasswordToken = undefined;

  user.resetPasswordExpire = undefined;

  sendToken(user, 200, res);
});

//update password

exports.updatePassword = catchAsynError(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("+password");

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("password doesn't match", 404));
  }

  if (req.body.newPassword !== req.body.oldPassword) {
    return next(new ErrorHandler("password not same"));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

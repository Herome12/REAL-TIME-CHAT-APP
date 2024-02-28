const express = require("express");
const { newUser, loginUser, forgotPassword, getUserDetails } = require("../controller/userController");
const { isAuthenticatedUser } = require("../middleware/auth");


const router = express.Router();
 
router.post("/createUser",newUser)

router.post("/loginUser",loginUser)

router.post("/forgotPassword",forgotPassword)

router.get("/me",isAuthenticatedUser,getUserDetails)



module.exports = router;
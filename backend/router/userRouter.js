const express = require("express");
const { newUser, loginUser, forgotPassword } = require("../controller/userController");


const router = express.Router();
 
router.post("/createUser",newUser)

router.post("/loginUser",loginUser)

router.post("/forgotPassword",forgotPassword)



module.exports = router;
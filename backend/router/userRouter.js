const express = require("express");
const { newUser, loginUser } = require("../controller/userController");


const router = express.Router();

router.post("/createUser",newUser)

router.get("/loginUser",loginUser   )




module.exports = router;
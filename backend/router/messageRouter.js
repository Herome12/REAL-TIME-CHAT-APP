const express = require("express");
const { sendMessage } = require("../controller/messageController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();


router.post("/sendMessage/:id",isAuthenticatedUser,sendMessage)










module.exports = router;
const express = require("express");
const { sendMessage, getMessages } = require("../controller/messageController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();


router.post("/sendMessage/:id",isAuthenticatedUser,sendMessage)
router.get("/:id",isAuthenticatedUser,getMessages)










module.exports = router;
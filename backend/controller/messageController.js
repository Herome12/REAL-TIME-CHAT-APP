const Chat = require("../schema/message")
const catchAsynError = require("../middleware/catchAsynError")
const errorhandler = require("../utils/errorhandler")
const sendToken = require("../utils/sendToken")
const conversation = require("../schema/conversation")
const conversation = require("../schema/conversation")


exports.sendMessage = catchAsynError(async(req,res,next)=>{
    const {message} = req.body;
    const {id:reciverID} = req.params
    const senderID = req.user._id

    let Conversation = await conversation.findOne({
        pariticipants:{$all:[senderID,reciverID]}
    })

    if(!Conversation){
        Conversation = await conversation.create({
            participants:[senderID,reciverID]
        })
    }
})


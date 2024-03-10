const Chat = require("../schema/message")
const catchAsynError = require("../middleware/catchAsynError")
const errorhandler = require("../utils/errorhandler")
const sendToken = require("../utils/sendToken")
const conversation = require("../schema/conversation")



exports.sendMessage = catchAsynError(async(req,res,next)=>{
    const {message} = req.body;
    const {id:receiverId} = req.params
    const senderId = req.user._id

    let Conversation = await conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    })

    if(!Conversation){
        Conversation = await conversation.create({
            participants:[senderId,receiverId]
        })
    }

    const newMessage = new Chat({senderId,receiverId,message})

    if(newMessage){
        Conversation.messages.push(newMessage._id);

    }
    await Promise.all([Conversation.save(),newMessage.save()]);

    res.status(200).json({
        success:true,
        newMessage,
    }) 
   
    
})


const messagemodel = require("../model/Portmessages")

const portmessage = async(req,res)=>{
    const portslug = req.body.portslug
    const senderName = req.body.senderName
    const senderEmail = req.body.senderEmail
    const Message = req.body.Message

    const mess = await messagemodel({portslug, senderEmail, senderName, Message})
    const result = await mess.save()
    if(result){
        res.send({statuscode:1})
    }else{
        res.send({statuscode:0})
    }
}

module.exports = {portmessage}



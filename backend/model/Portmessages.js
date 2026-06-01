const {Schema, model} = require('mongoose')

const portmessages=Schema({
    portslug:{
        type:String
    },
    senderName:{
        type:String
    },
    senderEmail:{
        type:String
    },
    Message:{
        type:String
    },
    createdAt:{
        type:Date,
        default: Date.now
    }

})

const messagemodel = model('messages', portmessages)

module.exports = messagemodel
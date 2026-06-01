const {Schema, model} = require("mongoose")

const atsdata = Schema({
    useremail:{
        type:String
    },
    pdfadd:{
        type:String
    },
    count:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }

})

const resumedata = model("resumedata", atsdata)
module.exports = resumedata
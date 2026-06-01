const {Schema,model}=require("mongoose")
const googleuser=Schema({
    googleId:{
        type:String,
    },
    name:{
        type:String, 
    },
    email:{
        type:String
    },
    avatar:{
        type:String
    }
})
const gmodel=model("reg",googleuser)
module.exports=gmodel
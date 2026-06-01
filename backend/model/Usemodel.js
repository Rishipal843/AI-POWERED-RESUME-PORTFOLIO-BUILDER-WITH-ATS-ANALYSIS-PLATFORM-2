const {Schema,model}=require("mongoose")
const usersch=Schema({
    // Fullname:{
    //     type:String,
    // },
    // Email:{
    //     type:String, 
    // },
    Password:{
        type:String
    },
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
const usermodel=model("register",usersch)
module.exports=usermodel
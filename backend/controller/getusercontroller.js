const usermodel=require("../model/Usemodel")
const fetchuser=async(req,res)=>{
try{
const result=await usermodel.find()
if(result){
    res.send({statuscode:1,data:result})
}else{
    res.send({statuscode:0})
}
}catch(err){
console.log(err)
}
}
module.exports={fetchuser}
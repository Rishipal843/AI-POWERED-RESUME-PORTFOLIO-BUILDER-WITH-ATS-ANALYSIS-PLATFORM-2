const msgmodel = require("../model/Portmessages")


const getmessages = async (req,res)=>{

  try{
    const slug = req.params.slug
    const result = await msgmodel.find({portslug:slug}).sort({ createdAt: -1 });
    if(result){
      res.send({
        statuscode:1,
        data:result
      })
    }else{
      res.send({statuscode:0})
    }   
  }catch(err){
    console.log(err)
  }
}

module.exports= {getmessages}
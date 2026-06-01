const resumedata =require("../model/Atsmodel")

const userresume =async(req,res)=>{

    try{
        const result = await resumedata.find({useremail:req.params.useremail})
        if(result){
            res.send({statuscode:1,
                data:result
            })
        }
    }catch(err){
        res.send(err)
    }
}

module.exports = {userresume}
const delresumes = require("../model/Atsmodel")

const deleteusersresume = async(req,res)=>{
    try{
        const result = await delresumes.deleteMany({})
        if(result){
            res.send({
                statuscode:1,
            })
        }else{
            res.send({
                statuscode:0
            })
        }
    }catch(err){
        res.send(err)
    }
}

module.exports = {deleteusersresume}
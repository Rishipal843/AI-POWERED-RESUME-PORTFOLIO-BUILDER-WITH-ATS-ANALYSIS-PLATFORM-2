const userdata = require("../model/Usemodel");
const portfoliomodel = require("../model/Portfoliodata");



const dashboard = async (req, res) => {
    const email = req.params.email;

    try {
        const user = await userdata.findOne({ email: email });
        if (!user) {
            res.send({
                statuscode:0,
                message:"User not found"
            })
        }else{
            res.send({
                statuscode:1,
                message:"User found",
                data:user
            })
        }
    } catch (err) {
        res.send(err)
    }
}




 const portfolios = async(req,res)=>{
    const email = req.params.email;

          try{
        const userportfolios = await portfoliomodel.find({Email:email})
        if(userportfolios.length >= 0){
            res.send({statuscode:1,
                 data:userportfolios})
        }
        else{
            res.send({
                statuscode:0,
                message:"0"
            })
        }
    }catch(err){
        res.send(err)
    }
    }




module.exports = { dashboard , portfolios }
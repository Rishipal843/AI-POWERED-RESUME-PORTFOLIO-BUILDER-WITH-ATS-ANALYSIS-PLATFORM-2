const delportfolio = require("../model/Portfoliodata");

const delPortfolioBySlug = async (req,res)=>{
    try{
        const slug = req.params.slug

        const result = await delportfolio.findOneAndDelete({slug:slug})
        if(result){
            res.send({
                statuscode:1,
                message:"Portfolio deleted successfully"
            })
        }else{
            res.send({
                statuscode:0,
                message:"No portfolio found with the given slug"
            })
        }

    }catch(err){
        console.log(err)
    }
}
module.exports = { delPortfolioBySlug }
const portfoliomodel=require("../model/Portfoliodata")
const portfolio=async(req,res)=>{
    const datee=new Date()
    const slug=req.body.slug
    const template=req.body.template
    const navbar=JSON.parse(req.body.navbar)
    const hero=JSON.parse(req.body.hero)
    const bgImages=JSON.parse(req.body.bgImages)
    const about=JSON.parse(req.body.about)
   
    const stats=JSON.parse(req.body.stats)
    const techStack=JSON.parse(req.body.techStack)
    const journey=JSON.parse(req.body.journey)
    const projects=JSON.parse(req.body.projects)
    const contact=JSON.parse(req.body.contact)
    const Email=req.body.email



    const port=await portfoliomodel({
        Email,slug,template,navbar,hero,bgImages,about,stats,techStack,journey,projects,contact,datee
        
    })
    const result= await port.save()
    if(result){
        res.send({statuscode:1})
    }else{
        res.send({statuscode:0})
    }

}
module.exports={portfolio}

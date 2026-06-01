
 
        
const Portfolio = require("../model/Portfoliodata")

const getUserPortfolios = async (req, res) => {
  try {
    const email = req.params.email; 

    const result = await Portfolio.find({ Email: email }).sort({ datee: -1 });

    if (result && result.length>0) {
      res.send({
        statuscode: 1,
        data: result
      });
    } else {
      res.send({
        statuscode: 0,
        message: "No data found"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};



const getPortfolioBySlug = async (req,res)=>{

 try{

  const slug = req.params.slug

  const result = await Portfolio.findOne({slug:slug})

  if(result){
    res.send({
      statuscode:1,
      data:result
    })
  }else{
    res.send({
      statuscode:0
    })
  }

 }catch(err){
  console.log(err)
 }

}

const getPortfolioById = async (req,res)=>{

  try{
    const id = req.params.id
    const result = await Portfolio.findById(id)
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

module.exports = { getUserPortfolios, getPortfolioBySlug ,getPortfolioById }


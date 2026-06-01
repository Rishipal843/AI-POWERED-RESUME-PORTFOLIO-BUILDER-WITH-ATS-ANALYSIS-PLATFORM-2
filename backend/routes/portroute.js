// const express = require('express')
// const router1 = express.Router()
// const upload=require("../middleware/upload")


// const {portfolio} = require('../controller/portfoliocontroller') 
// router1.post("/portfolio",upload.fields([
//     {name:"bgImages",maxCount:10}
// ]),portfolio)




// const {fetchuser} = require("../controller/getusercontroller")
// router1.get("/userdata", fetchuser)
// module.exports = router1



const express = require('express')
const router1 = express.Router()

const upload = require("../middleware/upload")

const { portfolio } = require('../controller/portfoliocontroller')

const { fetchuser } = require("../controller/getusercontroller")

const { getUserPortfolios, getPortfolioBySlug } = require("../controller/getportfolio")

const { delPortfolioBySlug } = require("../controller/delportfolio")

const { getPortfolioById } = require("../controller/getportfolio")
const { updateportfolio } = require("../controller/updateportfolio")


// SAVE PORTFOLIO
router1.post("/portfolio",upload.none(), portfolio
)


// GET ALL USERS
router1.get("/userdata", fetchuser)


// GET PORTFOLIOS BY EMAIL
router1.get("/user-portfolios/:email", getUserPortfolios)


// GET SINGLE PORTFOLIO
router1.get("/portfolio/:slug", getPortfolioBySlug)
router1.get("/portfolioid/:id", getPortfolioById)

router1.delete("/delportfolio/:slug", delPortfolioBySlug)

router1.put("/updateportfolio/:id" , updateportfolio)


module.exports = router1
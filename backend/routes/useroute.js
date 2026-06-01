const express = require("express");
const router = express.Router();
const { register } = require("../controller/usercontroller");
const { login } = require("../controller/logincontroller");
const { userVerification } = require("../middleware/AuthMiddleware");
const {dashboard} = require("../controller/dashcontroller")
const {portfolios} = require("../controller/dashcontroller")

// 1. Auth Check (Used by React to see if the user is still logged in)
// Changed from '/' to '/verify' for clarity
router.post('/verify', userVerification);

router.get("/dashboard/:email", dashboard)
router.get("/dashboardportfolios/:email", portfolios)


// 2. Registration
router.post("/register", register);

// 3. Login
router.post("/login", login);

module.exports = router;
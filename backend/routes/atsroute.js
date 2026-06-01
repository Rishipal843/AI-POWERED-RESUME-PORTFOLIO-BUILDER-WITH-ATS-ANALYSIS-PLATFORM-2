const express = require('express')
const {uploadresume} = require("../controller/atscontroller")
const router3 = express.Router()
const upload = require("../middleware/upload")
const {userresume} = require("../controller/getuser")
const {deleteusersresume} = require("../controller/deluserrsume")


router3.post("/upload",upload.single("resume"),uploadresume)

router3.get("/userresume/:useremail",userresume )

router3.delete("/deleteresumes",deleteusersresume)

module.exports = router3
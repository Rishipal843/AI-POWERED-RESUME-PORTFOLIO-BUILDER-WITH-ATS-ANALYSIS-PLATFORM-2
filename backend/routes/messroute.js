const express = require('express')
const router2 = express.Router()

const {portmessage} = require("../controller/messages")
const { getmessages } = require('../controller/getmessage')

router2.post("/messages",portmessage)
router2.get("/getmessages/:slug", getmessages)

module.exports= router2
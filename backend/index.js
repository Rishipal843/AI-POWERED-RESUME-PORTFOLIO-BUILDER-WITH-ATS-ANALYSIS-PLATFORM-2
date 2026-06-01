const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// 🔥 VERY IMPORTANT
require("./config/passport");

const router = require("./routes/useroute");
const router1 = require("./routes/portroute");
const router2 = require('./routes/messroute');
const router3 = require('./routes/atsroute');
const router4 = require('./routes/auth');

const app = express();

connectDB();

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🔥 initialize passport (NO session)
app.use(passport.initialize());

app.use('/auth', router4);
app.use("/api", router);
app.use("/api", router1);
app.use("/api", router2);
app.use("/api", router3);

app.listen(8000, () => {
    console.log("Server running on port 8000");
});
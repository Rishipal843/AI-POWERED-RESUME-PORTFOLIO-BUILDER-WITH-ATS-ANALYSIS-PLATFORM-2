const { createSecretToken } = require("../utils/SecretToken");
const usermodel = require("../model/Usemodel");

const login = async (req, res, next) => {
    try {
        const { email, Password } = req.body;
        const result = await usermodel.findOne({ email: email });

        if (result) {
            if (result.Password === Password) {
                const token = createSecretToken(result._id);
                
                // Sending token via Cookie
                res.cookie("token", token, {
                    path: "/",
                    expires: new Date(Date.now() + 86400000), // 24 hours
                    secure: false, // Set to true if using HTTPS
                    httpOnly: false, // Set to true to prevent XSS (but React won't see it)
                    sameSite: "lax",
                });

                return res.status(200).json({ 
                    statuscode: 1, 
                    message: "Logged in", 
                    success: true 
                });
            } else {
                return res.json({ statuscode: 2, message: "Wrong password" });
            }
        } else {
            return res.json({ statuscode: 0, message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { login };
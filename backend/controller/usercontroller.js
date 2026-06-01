const { createSecretToken } = require("../utils/SecretToken");
const usermodel = require("../model/Usemodel");

const register = async (req, res) => {
    try {
        const { name, email, Password } = req.body;

        // 1. Create the user instance
        const user = new usermodel({ name, email, Password });

        // 2. Save to Database first
        const result = await user.save();

        if (result) {
            // 3. Generate token using the SAVED user's ID
            const token = createSecretToken(result._id);

            // 4. Send the cookie
            res.cookie("token", token, {
                path: "/",
                expires: new Date(Date.now() + 86400000), // 24 hours
                secure: false, // Set to true in production with HTTPS
                httpOnly: false, 
                sameSite: "lax",
            });

            return res.status(201).send({ statuscode: 1, message: "User registered and logged in" });
        } else {
            return res.send({ statuscode: 0, message: "Registration failed" });
        }
    } catch (err) {
        // Handle duplicate email error (Mongo Error 11000)
        if (err.code === 11000) {
            return res.send({ statuscode: 3, message: "Email already exists" });
        }
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = { register };
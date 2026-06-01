const usermodel = require("../model/Usemodel");
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.json({ status: false, message: "No Token" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Invalid Token" });
    } else {
      const user = await usermodel.findById(data.id);
      if (user) {
        // Send EXACTLY this object
        return res.json({ status: true, user: user.name });
      } else {
        return res.json({ status: false, message: "User not found" });
      }
    }
  });
};
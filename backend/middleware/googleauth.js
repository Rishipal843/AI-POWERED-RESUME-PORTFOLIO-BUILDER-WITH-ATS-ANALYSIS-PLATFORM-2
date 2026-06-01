const gmodel = require("../model/googleusers");
const jwt = require("jsonwebtoken");

module.exports.googleVerification = (req, res) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.json({ status: false, message: "No Token" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Invalid Token" });
    } else {
      const user = await gmodel.findById(data.id);
      if (user) {
        // Send EXACTLY this object
        return res.json({ status: true, user: user.Fullname });
      } else {
        return res.json({ status: false, message: "User not found" });
      }
    }
  });
};
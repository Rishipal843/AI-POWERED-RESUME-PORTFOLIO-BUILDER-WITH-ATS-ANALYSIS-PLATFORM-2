const router4 = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const useremail = require('../config/passport'); // Import the email variable


router4.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false // 🔥 ADD THIS
  })
);
router4.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }),
  (req, res) => {

    // ✅ get email from req.user
    if (!req.user) {
      console.error("Google auth callback: no user on req");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const isProduction = process.env.NODE_ENV === "production";

    const cookieOptions = {
      path: "/",
      expires: new Date(Date.now() + 86400000), // 1 day
      httpOnly: false,
    };

    if (isProduction) {
      cookieOptions.secure = true;
      cookieOptions.sameSite = "none";
    }

    const userEmail = req.user.email;

    res.cookie("username", userEmail, cookieOptions);

    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET || "rishipal@1234",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, cookieOptions);

    res.redirect("https://ai-powered-resume-portfolio-builder-lemon.vercel.app/dashboard");
  }
);

module.exports = router4;
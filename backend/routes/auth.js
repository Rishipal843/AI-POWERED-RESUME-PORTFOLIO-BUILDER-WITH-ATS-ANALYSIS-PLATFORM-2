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
    const userEmail = req.user.email;

    // ✅ store email in cookie
    res.cookie("username", userEmail, {
      path: "/",
      expires: new Date(Date.now() + 86400000), // 1 day
      secure: false, // true in production (HTTPS)
      httpOnly: false, // frontend can read it
      sameSite: "lax",
    });

    const token = jwt.sign(
      { id: req.user._id },
      "rishipal@1234",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 86400000),
      secure: false,
      httpOnly: false,
      sameSite: "lax",
    });


    res.redirect(`https://ai-powered-resume-portfolio-builder-lemon.vercel.app/dashboard`);
  }
);

module.exports = router4;
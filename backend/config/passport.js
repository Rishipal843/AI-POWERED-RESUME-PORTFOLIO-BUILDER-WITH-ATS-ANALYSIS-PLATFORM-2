const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const usermodel = require('../model/Usemodel');
let email;
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://ai-powered-resume-portfolio-builder-with.onrender.com/auth/google/callback" // 🔥 FULL URL
},
async (accessToken, refreshToken, profile, done) => {



  try {
    let user = await usermodel.findOne({ googleId: profile.id });
    
    

    if (!user) {
      user = await usermodel.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      });
      
    }
    return done(null, user );
  } catch (err) {
    return done(err, null,);
  }
}));




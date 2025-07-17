const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const Users = require("../model/userModel");


// Manual login
passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
  const user = await Users.findOne({ email });
  if (!user) return done(null, false, { message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return done(null, false, { message: "Wrong password" });

  return done(null, user);
}));

// Google login
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
}, async (accessToken, refreshToken, profile, done) => {
  let user = await Users.findOne({ googleId: profile.id });
  if (!user) {
    user = await Users.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
    });
  }
  done(null, user);
}));

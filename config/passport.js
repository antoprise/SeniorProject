const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')
const keys = require('./keys');

passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user);
    });  
});

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/api/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken, refreshToken, profile)

        const existingUser = await User.findOne({ email: profile.emails[0].value, userName: profile.displayName });
  
        if (existingUser) {
          return done(null, existingUser);
        }
        
        const user = await new User({ email: profile.emails[0].value, userName: profile.displayName }).save();
        done(null, user);
      }
    )
  );

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    proxy: true,
    passReqToCallback: true,
}, async (accessToken, refreshToken, profile, next) => {
    try {
        const currentEmail = profile.emails[0].value;
        const currentUser = await User.findOne({email: currentEmail});
        if (currentUser) {
            next(null, currentUser);
        } else {
            const newUser = await User.create({
                email: currentEmail,
                name: profile.name,
                profilePicture: profile.profilePicture,
            });
            next(null, newUser);
        }
    } catch (e) {
        console.error(e);
    }
});

module.exports = googleStrategy;
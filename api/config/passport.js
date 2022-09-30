const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const {dbConnectionString} = require("./database");
const User = require("../models/User");
const Snippet = require("../models/Snippet");
const googleStrategy = require("../auth/googleStrategy");

/**
 * @param {Express} target The ExpressJS application to add patches to.
 */
function applyPassport(target) {
    const newSession = session({
        secret: "snippets",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongoUrl: dbConnectionString,
        }),

    });
    target.enable("trust proxy")
    target.use(newSession);
    target.use(passport.initialize());
    target.use(passport.session());
    passport.use(googleStrategy);
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        void async function() {
            let user, error = null;
            try {
                user = await User.findById(id);
            } catch (e) {
                error = e;
            }
            done(error, user);
        }();
    })
}

module.exports = applyPassport;
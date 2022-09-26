const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/auth");

router.get("/logout", authController.logout);
router.get("/currentUser", authController.getUser);
router.get("/google", (req, res, next) => {
    console.log("User trying to log in to Google.");
    next();
}, passport.authenticate("google", {
    scope: ["email", "profile"],
}))
router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/"
}), (req, res) => {
    res.redirect("/profile");
});

module.exports = router;
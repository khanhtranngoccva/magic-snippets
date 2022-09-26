module.exports = {
    getUser: function(req, res) {
        const user = req.user;
        console.log(user);
        let processedUserInfo;
        if (user) {
            processedUserInfo = {
                name: user.name,
                email: user.email,
                username: user.userName,
                displayName: user.displayName,
                profilePicture: user.profilePicture,
            };
        } else {
            processedUserInfo = null;
        }
        res.json({
            success: true,
            data: processedUserInfo,
        });
    },
    logout: function (req, res) {
        try {
            req.logout(() => {
                req.session.destroy();
                res.redirect("/");
            });
        } catch (e) {
            console.error(e);
        }
    },
}
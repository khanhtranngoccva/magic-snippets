const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/snippets", require("./snippets"));

module.exports = router;
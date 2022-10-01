if (process.env.mode === "production") {

} else {
    require("dotenv").config({path: "api/config/config.env"});
}

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const applyPassport = require("./passport");

app.enable("trust proxy");
app.use((req, res, next) => {
    // =)
    req.socket.encrypted = true;
    res.set("Origin-Agent-Cluster", "?1");
    next();
});
app.use(cors());
app.use(express.urlencoded({
    extended: true,
    limit: "50MB",
}));
app.use(express.json({
    extended: true,
    limit: "50MB",
}));
app.set("view engine", "ejs");

applyPassport(app);

let port;
if (process.env.mode === "production") {
    port = process.env.PORT || 443;
} else {
    port = process.env.PORT_DEVELOPMENT;
    app.use(morgan("dev"));
}

app.listen(port, () => {
    console.log(`Listening to port ${port}.`);
});

module.exports = app;
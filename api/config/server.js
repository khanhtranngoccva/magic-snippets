require("dotenv").config({path: "api/config/config.env"});

const express = require("express");
const app = express();
const morgan = require("morgan");
const applyPassport = require("./passport");

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.set("view engine", "ejs");

applyPassport(app);

let port;
if (process.env.PRODUCTION) {
    port = process.env.PORT || 443;
} else {
    port = process.env.PORT_DEVELOPMENT;
    app.use(morgan("dev"));
}

app.listen(port, () => {
    console.log(`Listening to port ${port}.`);
});

module.exports = app;
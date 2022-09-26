process.chdir(__dirname);

const server = require("./api/config/server.js");

server.use("/api", require("./api/routes/main.js"));

server.use("*", (req, res) => {
    res.send(404);
});
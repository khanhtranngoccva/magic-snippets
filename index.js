process.chdir(__dirname);

const express = require("express");
const server = require("./api/config/server.js");

server.use("/api", require("./api/routes/main.js"));

// To access static ReactJS server assets. Superseded by server's dynamic assets.
server.use(express.static("dist"));

// Any route that the user types in, which allows the production server to get access to the main React app.
server.use("*", (req, res) => {
    res.sendFile("index.html", {root: "dist"});
});
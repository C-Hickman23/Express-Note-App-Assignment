const routes = require("express").Router();
const path = require("path");

routes.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});
routes.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
});

module.exports = routes;
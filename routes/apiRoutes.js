const router = require("express").Router();
const { v4: uuid } = require("uuid");
const fs = require("fs");

router.get("api/notes", async (req, res) => {
    const result = await JSON.parse(fs.readFileSync("db/db.json"));
    res.json(result);
})

router.post("api/notes", async (req, res) => {
    const postData = await JSON.parse(fs.readFileSync("db/db.json"))
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid(),
    };
    postData.push(newNote);
    fs.writeFileSync("db/db.json", JSON.stringify(postData));
    res.json(postData);
})

module.exports = router;
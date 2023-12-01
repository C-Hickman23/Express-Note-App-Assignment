const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;  // Use fs.promises for promise-based fs functions
const path = require("path");

router.get("/api/notes", async (req, res) => {
    try {
        const data = await fs.readFile("db/db.json", "utf8");
        const result = JSON.parse(data);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/api/notes", async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, "../db/db.json"), "utf8");
        const notes = JSON.parse(data);
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4(),
        };
        notes.push(newNote);
        await fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes));
        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/api/notes/:id", async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, "../db/db.json"), "utf8");
        const notes = JSON.parse(data);
        const deleteNotes = notes.filter((note) => note.id !== req.params.id);
        await fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(deleteNotes));
        res.json(deleteNotes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
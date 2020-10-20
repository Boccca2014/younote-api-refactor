const NoteDao = require("../model/NoteDao.js");
const express = require("express");
const router = express.Router();

const notes = new NoteDao();
notes.create("Sample 1", "Author 1");
notes.create("Sample 2", "Author 2");
notes.create("Sample 3", "Author 2");
notes.create("Sample 4", "Author 1");

router.use(express.json());

router.get("/api/notes", (req, res) => {
  const author = req.query.author;
  res.json(notes.readAll(author));
});

router.get("/api/notes/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  res.json(notes.read(id));
});

router.post("/api/notes", (req, res) => {
  const content = req.body.content;
  const author = req.body.author;

  try {
    const note = notes.create(content, author);
    res.status(201).json(note);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/api/notes/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  const note = notes.delete(id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).send("Resource not found!");
  }
});

router.put("/api/notes/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  const content = req.body.content;
  const author = req.body.author;

  try {
    const note = notes.update(id, content, author);
    if (note) {
      res.json(note);
    } else {
      res.status(404).send("Resource not found!");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;
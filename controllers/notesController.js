const Note = require("../models/note");

const fetchNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json({ notes: notes });
};

const fetchNote = async (req, res) => {
  const noteId = req.params.id;
  const note = await Note.findOne({ _id: noteId, user: req.user._id });
  res.json({ note });
};

const createNote = async (req, res) => {
  const { title, body } = req.body;
  const note = await Note.create({
    title,
    body,
    user: req.user._id,
  });
  res.json({ note });
};

const updateNote = async (req, res) => {
  const noteId = req.params.id;
  const { title, body } = req.body;
  await Note.findOneAndUpdate(
    { _id: noteId, user: req.user._id },
    {
      title,
      body,
    }
  );
  const note = await Note.findById(noteId);
  res.json({ note });
};

const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  await Note.deleteOne({ id: noteId, user: req.user._id });
  res.json({ success: " DELETED" });
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};

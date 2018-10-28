'use strict';
const _ = require('lodash');
const db = require('../../db');

module.exports = {
  getNote,
  postNote,
  deleteNote
};

function getNote(req, res) {
  const noteId = req.swagger.params.noteId.value;  // swagger validated integer
  db.getNote(noteId)
      .then(note => {
        res.status(200);
        res.json(note);
      })
      .catch(err => {
        console.log(err.stack);
        res.status(500);
        res.json({message: 'Server Error!'});
      })
}

function postNote(req, res) {
  const noteId = req.swagger.params.noteId.value;  // swagger validated integer
  const title = req.swagger.params.note.value.note.title;
  const body = req.swagger.params.note.value.note.body;

  db.updateNote(noteId, title, body)
      .then(note => {
        res.json(note);
      })
      .catch(err => {
        console.log(err.stack);
        res.status(500);
        res.json({message: 'Server Error!'});
      });
}

function deleteNote(req, res) {
  const noteId = req.swagger.params.noteId.value;
  db.deleteNote(noteId)
      .then(() => {
        res.status(200);
        res.json({message: `Note at index ${noteId} has been deleted`});
      })
      .catch(err => {
        console.log(err.stack);
        res.status(500);
        res.json({message: 'Server Error!'});
      });
}
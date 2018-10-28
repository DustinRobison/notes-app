'use strict';
const _ = require('lodash');
const db = require('../../db');

module.exports = {
  getNotes,
  putNote
};

function getNotes(req, res) {
  db.getNotes()
      .then(notes => {
        res.json(notes);
      })
      .catch(err => {
        console.log(err.stack);
        res.status(500);
        res.json({message: 'Server Error!'});
      });
}

function putNote(req, res) {
  const title = req.swagger.params.note.value.note.title;
  const body = req.swagger.params.note.value.note.body;
  db.createNote(title, body)
      .then(notes => {
        res.json(notes);
      })
      .catch(err => {
        console.log(err.stack);
        res.status(500);
        res.json({message: 'Server Error!'});
      });
}
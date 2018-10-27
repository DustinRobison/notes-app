const _ = require('lodash');

module.exports = {
  getNotes,
  putNote
};

let notesArray = [{
  title: 'first title 1',
  body: 'first body 1'
},
  {
    title: 'second title 2',
    body: 'second body 2'
  }
];


function getNotes(req, res) {
  res.json(notesArray);
}

function putNote(req, res) {
  const title = req.swagger.params.note.value.note.title;
  const body = req.swagger.params.note.value.note.body;
  const newNotesArray = notesArray.slice().concat({title, body});
  res.json(newNotesArray);
}
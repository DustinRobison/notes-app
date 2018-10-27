const _ = require('lodash');

module.exports = {
  getNote,
  postNote,
  deleteNote
};

const notesArray = [
  {
    title: 'Title at index 0',
    body: 'Body at index 0'
  },
  {
    title: 'Title at index 1',
    body: 'Body at index 1'
  }
];

function getNote(req, res) {
  const noteId = req.swagger.params.noteId.value;  // swagger validated integer
  if (noteId >= 0 && noteId < notesArray.length) {
    res.status(200);
    res.json(notesArray[noteId]);
  } else {
    res.status(400);
    res.json({message: `Invalid note index request: ${noteId}`});
  }
}

function postNote(req, res) {
  const noteId = req.swagger.params.noteId.value;  // swagger validated integer
  const title = req.swagger.params.note.value.note.title;
  const body = req.swagger.params.note.value.note.body;
  if (noteId >= 0 && noteId < notesArray.length) {
    // TODO update note

  } else {
    res.status(400);
    res.json({message: `Invalid note index request: ${noteId}`});
  }

  res.json({
    title,
    body
  })
}

function deleteNote(req, res) {
  const noteId = req.swagger.params.noteId.value;

  if (noteId >= 0 && noteId < notesArray.length) {
    // TODO delete note

    res.status(200);
    res.json({message: `Note at index ${noteId} has been deleted`});

  } else {
    res.status(400);
    res.json({message: `Invalid note index request: ${noteId}`});
  }

}
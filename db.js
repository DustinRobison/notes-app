// Create database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

module.exports = {
  initializeDb,
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
};

function initializeDb() {
  db.serialize(function() {
    db.run("CREATE TABLE notes (title TEXT, body TEXT)");
    db.run("INSERT INTO notes VALUES ('First Note', 'The body of the first note')");
    db.run("INSERT INTO notes VALUES ('Second Note', 'The body of the second note')");
  });
  console.log('voltile sqlite3 db initialized');
  return db;
}

function getNotes() {
  return new Promise(function (resolve, reject) {
    db.serialize(function() {
      db.all("SELECT * FROM notes", function(err, row) {
        if (err)
          reject(err);
        resolve(row);
      });
    });
  });
}

function createNote(title, body) {
  return new Promise(function (resolve, reject) {
    db.serialize(function() {
      db.run(`INSERT INTO notes(title, body) VALUES(?, ?)`, title, body);
      db.all("SELECT * FROM notes", function(err, row) {
        if (err)
          reject(err);
        resolve(row);
      });
    });
  });
}


function getNote(id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function() {
      db.get(`SELECT * FROM notes WHERE rowid = ?`, id, function(err, row) {
        if (err)
          reject(err);
        resolve(row);
      })
    });
  });
}

function updateNote(id, title, body) {
  return new Promise(function (resolve, reject) {
    db.serialize(function() {
      let stmt = db.prepare(`UPDATE notes SET title=?, body=? WHERE rowid = ?`, title, body, id);
      stmt.run();
      db.get(`SELECT * FROM notes WHERE rowid = ?`, id, function(err, row) {
        if (err)
          reject(err);
        resolve(row);
      });
    });
  });
}

function deleteNote(id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function() {
      db.run(`DELETE FROM notes WHERE rowid = ?`, id);
      db.run("VACUUM");
      db.all("SELECT * FROM notes", function(err, row) {
        if (err)
          reject(err);
        resolve(row);
      });
    });
  });
}

var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('notes', function() {

    describe('GET /notes', function() {

      it('should return an array of notes', function(done) {

        request(server)
            .get('/api/notes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              should.not.exist(err);
              res.body.should.be.instanceOf(Array);
              res.body.length.should.eql(2);
              done();
            });
      });
    });

    describe('PUT /notes', function() {

      it('should return the notes array with a new note on the end', function(done) {
        request(server)
            .put('/api/notes')
            .send({"note": {"title": "new note title", "body": "new note body"}})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              should.not.exist(err);
              res.body.should.be.instanceOf(Array);
              const newRecord = res.body[res.body.length-1];

              newRecord.should.have.properties('title', 'body');
              newRecord.title.should.eql('new note title');
              newRecord.body.should.eql('new note body');

              done();
            });
      })
    });
  });

  describe('note', function() {

    describe('GET /note/1/', function() {

      it('should return a note object', function(done) {

        request(server)
            .get('/api/notes/1/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              should.not.exist(err);

              res.body.should.have.properties('title', 'body');
              res.body.title.should.eql('First Note');
              res.body.body.should.eql('The body of the first note');

              done();
            });
      });
    });

    describe('POST /note/2/', function() {

      it('should return a modified note object', function(done) {
        request(server)
            .post('/api/notes/2/')
            .send({"note": {"title": "new title of note 2", "body": "new body of note 2"}})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              should.not.exist(err);

              res.body.should.have.properties('title', 'body');
              res.body.title.should.eql('new title of note 2');
              res.body.body.should.eql('new body of note 2');

              done();
            });
      })
    });

    describe('DELETE /note/1/', function() {

      it('should return a list of notes with a length of 2', function(done) {
        request(server)
            .del('/api/notes/1/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              should.not.exist(err);
              res.body.should.be.instanceOf(Array);
              res.body.length.should.eql(2);

              done();
            });
      })
    });
  });
});

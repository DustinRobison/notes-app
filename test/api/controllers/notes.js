var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('notes', function() {

    describe('GET /notes', function() {

      it('should return an array of notes', function(done) {

        request(server)
            .get('/notes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              should.not.exist(err);
              res.body.should.be.instanceOf(Array);
              done();
            });
      });
    });

    describe('PUT /notes', function() {

      it('should return the notes array with a new note on the end', function(done) {
        request(server)
            .put('/notes')
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
});

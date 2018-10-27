var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('note', function() {

    describe('GET /note/0/', function() {

      it('should return a note object', function(done) {

        request(server)
            .get('/notes/0/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              should.not.exist(err);

              res.body.should.have.properties('title', 'body');
              res.body.title.should.eql('Title at index 0');
              res.body.body.should.eql('Body at index 0');

              done();
            });
      });
    });

    describe('POST /note/0/', function() {

      it('should return a modified note object', function(done) {
        request(server)
            .post('/notes/0/')
            .send({"note": {"title": "new title of note 0", "body": "new body of note 0"}})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              should.not.exist(err);

              res.body.should.have.properties('title', 'body');
              res.body.title.should.eql('new title of note 0');
              res.body.body.should.eql('new body of note 0');

              done();
            });
      })
    });
  });
});

var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('note', function() {

    describe('GET /note/1/', function() {

      it('should return a note object', function(done) {

        request(server)
            .get('/notes/1/')
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
            .post('/notes/2/')
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
  });
});

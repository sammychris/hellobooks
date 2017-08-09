const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/app');

chai.use(chaiHttp);


describe('Route', () => {
  //it('should return a 200 response', function(done)){
  //chai.get('/api/users/')
  //}
  it('should list ALL blobs on /blobs GET', function (done) {
    chai.request(app)
      .get('/api/books')
      .end(function (err, res) {
        res.should.have.status(200);

      });
    done();
  });
});
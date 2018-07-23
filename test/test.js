const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/app');

chai.use(chaiHttp);


describe('Route', () => {

  it('should return a 200 response', function (done) {
    chai.request(app)
      .get('/api/')
      .end((err, res) => { res.should.have.status(200) });
    done();
  });

  it('should return a 200 response', (done) => {
    chai.request(app)
      .get('/api/books')
      .end((err, res) => { res.should.have.status(200) });
    done();
  });

});

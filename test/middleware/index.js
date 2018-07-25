import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/app';

chai.use(chaiHttp);
const { expect } = chai;


describe('verifyToken', () => {

	it('should return 401 unauthorize user token not provided!', (done) => {
		 chai.request(app)
            	.get('/api/books')
                .end((err, res) => {
                	 expect(err).to.be.ok;
                	 expect(res).to.have.headers;
                	 expect(res).to.have.status(401);
                	 expect(res).to.be.json;
                	 done();
                });

	})

	it('should return 403 forbiden route for user!', (done) => {
		 chai.request(app)
            	.get('/api/users/all')
            	.set('x-access-token', process.env.user)
                .end((err, res) => {
                	 expect(err).to.be.ok;
                	 expect(res).to.have.headers;
                	 expect(res).to.have.status(403);
                	 expect(res).to.be.json;
                	 done();
                });

	})

	it('should return 401, admin token not provided!', (done) => {
		 chai.request(app)
            	.get('/api/users/all')
                .end((err, res) => {
                	 expect(err).to.be.ok;
                	 expect(res).to.have.headers;
                	 expect(res).to.have.status(401);
                	 expect(res).to.be.json;
                	 done();
                });

	})

	it('should return 403 forbiden route for admin!', (done) => {
		 chai.request(app)
            	.post('/api/users/5/books')
            	.set('x-access-token', process.env.admin)
                .end((err, res) => {
                	 expect(err).to.be.ok;
                	 expect(res).to.have.headers;
                	 expect(res).to.have.status(403);
                	 expect(res).to.be.json;
                	 done();
                });

	})
});
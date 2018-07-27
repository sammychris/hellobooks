import nock from 'nock';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/app';
import  {
		newUser,
		fakeUserEmail,
		oldUser,
		adminUser,
		fakeAdmin,
		fakeUser,
		book,
		borrowBookById
} from '../mockData';



chai.use(chaiHttp);
const { expect } = chai;



describe('Routes', () => {
	describe('ENDPOINT FOR USERS/ADMIN SIGNUP AND SIGIN...', function () {


        it('POST Api -- Should test for anything route ', function (done) {
            chai.request(app)
                .get('/api/anything')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.status).to.equal(200);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('message')
                        .eql('404 Page not found.');
                    done();
                });
        });

        it('POST Api -- Should signup a user ', function (done) {
            chai.request(app)
            	.post('/api/users/signup')
            	.type('form')
                .send(newUser)
                .end((err, res) => {
                    process.env.user = res.body.token;
                    expect(err).to.be.null;
                    expect(res.status).to.equal(201);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('user')
                        .eql('successfully registered!');
                    expect(res.body).to.have.property('token');
                    done();
                });
        });


        it('POST Api -- Should not register a user twice ', function (done) {
            chai.request(app)
            	.post('/api/users/signup')
            	.type('form')
                .send(newUser)
                .end((err, res) => {
                	expect(err).to.be.ok;
                    expect(res.status).to.equal(400);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('message')
                        .eql('Username or email already registered!');
                    done();
                });
        });

        it('POST Api -- Should not signup a user with wrongEmailFormat', function (done) {
            chai.request(app)
            	.post('/api/users/signup')
            	.type('form')
                .send(newUser)
                .end((err, res) => {
                    expect(err).to.be.ok;
                    expect(res).to.have.status(400);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('message')
                        .eql('Username or email already registered!');
                    done();
                });
        });

        it('POST Api -- Should signin a user', function (done) {
            chai.request(app)
            	.post('/api/users/signin')
                .send(oldUser)
                .end((err, res) => {
                    process.env.user = res.body.token;
                    expect(err).to.be.null;
                    expect(res.status).to.equal(202);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('message')
                        .eql('user loggedin successfully');
                    expect(res.body).to.have.property('token');
                    done();
                });
        });

         it('POST Api -- Should not signin a fakeUser', function (done) {
            chai.request(app)
            	.post('/api/users/signin')
                .send(fakeUser)
                .end((err, res) => {
                	expect(err).to.be.ok;
                    expect(res.status).to.equal(400);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('message')
                        .eql('Wrong password or Username!');
                    done();
                });
        });

        it('POST Api -- Should signin admin', function (done) {
            chai.request(app)
            	.post('/api/users/signin')
                .send(adminUser)
                .end((err, res) => {
                    process.env.admin = res.body.token;
                    expect(err).to.be.null;
                    expect(res.status).to.equal(202);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('message')
                        .eql('admin loggedin successfully');
                    expect(res.body).to.have.property('token');
                    done();
                });
        });

        it('POST Api -- Should not signin a fakeAdmin', function (done) {
            chai.request(app)
            	.post('/api/users/signin')
                .send(fakeAdmin)
                .end((err, res) => {
                	expect(err).to.be.ok;
                    expect(res.status).to.equal(400);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('message')
                        .eql('Wrong password or Username!');
                    done();
                });
        });

   });

	 describe('ENDPOINT FOR BOOKS and USERS...', function () {
	 	 it('GET Api -- user Should View allbooks', function (done) {
            chai.request(app)
            	.get('/api/books')
                .set('x-access-token', process.env.user)
                .end((err, res) => {
                	 expect(err).to.be.null;
                	 expect(res).to.have.headers;
                	 expect(res).to.have.status(200);
                	 expect(res).to.be.json;
                	 done();
                });
        });

	 	 it('GET Api -- user Should find a book', function (done) {
            chai.request(app)
            	.get('/api/books/3')
                .set('x-access-token', process.env.user)
                .end((err, res) => {
                	 expect(err).to.be.null;
                	 expect(res).to.have.headers;
                	 expect(res).to.have.status(200);
                	 expect(res).to.be.json;
                	 done();
                });
        });

	 	 it('GET Api -- user Should find Invalid bookId', function (done) {
            chai.request(app)
            	.get('/api/books/500')
                .set('x-access-token', process.env.user)
                .end((err, res) => {
                	 expect(err).to.be.ok;
                	 expect(res).to.have.headers;
                	 expect(res).to.have.status(404);
                	 expect(res).to.be.json;
                	 expect(res.body).to.equal('Invalid bookID')
                	 done();
                });
        });

	 	 it('GET Api -- admin Should add a book', function (done) {
            chai.request(app)
            	.post('/api/books')
                .set('x-access-token', process.env.admin)
                .send(book)
                .end((err, res) => {
                	 expect(err).to.be.null;
                	 expect(res).to.have.headers;
                	 expect(res).to.have.status(201);
                	 expect(res).to.be.json;
                	 done();
                });
        });

	 	 it('GET Api -- admin Should modify a book', function (done) {
            chai.request(app)
            	.put('/api/books/5')
                .set('x-access-token', process.env.admin)
                .send(book)
                .end((err, res) => {
                	 expect(err).to.be.null;
                	 expect(res).to.have.headers;
                	 expect(res).to.have.status(201);
                	 expect(res).to.be.json;
                	 done();
                });
        });

	 	 it('GET Api -- user Should borrow a book', function (done) {
            chai.request(app)
            	.post('/api/users/8/books')
                .set('x-access-token', process.env.user)
                .send(borrowBookById)
                .end((err, res) => {
                	 expect(err).to.be.null;
                	 expect(res).to.have.headers;
                	 expect(res).to.have.status(201);
                	 expect(res).to.be.json;
                	 done();
                });
        });


	 	 it('GET Api -- user Should view allborrowed books by a user', function (done) {
            chai.request(app)
            	.get('/api/users/5/books?return=false')
                .set('x-access-token', process.env.user)
                .end((err, res) => {
                	 expect(err).to.be.null;
                	 expect(res).to.have.headers;
                	 expect(res).to.have.status(200);
                	 expect(res).to.be.json;
                	 done();
                });
        });

	 	 it('GET Api -- admin Should view all user', function (done) {
            chai.request(app)
            	.get('/api/users/all')
                .set('x-access-token', process.env.admin)
                .end((err, res) => {
                	 expect(err).to.be.null;
                	 expect(res).to.have.headers;
                	 expect(res).to.have.status(200);
                	 expect(res).to.be.json;
                	 done();
                });
        });
	 })

});

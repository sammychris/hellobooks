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
		borrowBookById,
        fakeBook,
        InvalidSignupUser,
        InvalidSignInUser,
        singleBookId
} from '../mockData';



chai.use(chaiHttp);
const { expect } = chai;



describe('Routes', () => {
	describe('ENDPOINT FOR USERS/ADMIN SIGNUP AND SIGIN...', function () {


        it('Should test for any Fake route ', function (done) {
            chai.request(app)
                .get('/anything')
                .end((err, res) => {
                    expect(err).to.be.ok;
                    expect(res.status).to.equal(404);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('message')
                        .eql('404 Page not found.');
                    done();
                });
        });

        it('Should signup a user ', function (done) {
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


        it('Should not register a user twice ', function (done) {
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

        it('Should not signup a user with incomplete credentials', function (done) {
            chai.request(app)
            	.post('/api/users/signup')
            	.type('form')
                .send(InvalidSignupUser)
                .end((err, res) => {
                    expect(err).to.be.ok;
                    expect(res).to.have.status(400);
                    expect(res).to.be.json;
                    done();
                });
        });

        it('Should signin a user', function (done) {
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

         it('Should not signin a fakeUser', function (done) {
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

         it('Should not signin a invalid credentials', function (done) {
            chai.request(app)
                .post('/api/users/signin')
                .send(InvalidSignInUser)
                .end((err, res) => {
                    expect(err).to.be.ok;
                    expect(res.status).to.equal(401);
                    expect(res).to.be.json;
                    done();
                });
        });

        it('Should signin admin', function (done) {
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

        it('Should not signin a fakeAdmin', function (done) {
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

	 	 it('user Should View allbooks', function (done) {
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

         it('Should server error Viewing allbooks', function (done) {

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

	 	 it('user Should find a book', function (done) {
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

	 	 it('Should find Invalid bookId', function (done) {
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


         it('Should not find string bookId', function (done) {
            chai.request(app)
                .get('/api/books/Invalidstirng')
                .set('x-access-token', process.env.user)
                .send(book)
                .end((err, res) => {
                     expect(err).to.be.ok;
                     expect(res).to.have.headers;
                     expect(res).to.have.status(500);
                     expect(res).to.be.json;
                     done();
                });
        });


	 	 it('admin Should add a book', function (done) {
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

         it('admin Should not add fakeBook a book', function (done) {
            chai.request(app)
                .post('/api/books')
                .set('x-access-token', process.env.admin)
                .send(fakeBook)
                .end((err, res) => {
                     expect(err).to.be.ok;
                     expect(res).to.have.headers;
                     expect(res).to.have.status(400);
                     expect(res).to.be.json;
                     done();
                });
        });

	 	 it('Should modify a book', function (done) {
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


         it('Should not modify Invalid book Id', function (done) {
            chai.request(app)
                .put('/api/books/199')
                .set('x-access-token', process.env.admin)
                .send(book)
                .end((err, res) => {
                     expect(err).to.be.ok;
                     expect(res).to.have.headers;
                     expect(res).to.have.status(404);
                     expect(res).to.be.json;
                     expect(res.body).to.equal('Invalid bookID');
                     done();
                });
        });

         it('Should not modify book with stringId', function (done) {
            chai.request(app)
                .put('/api/books/Invalidstirng')
                .set('x-access-token', process.env.admin)
                .send(book)
                .end((err, res) => {
                     expect(err).to.be.ok;
                     expect(res).to.have.headers;
                     expect(res).to.have.status(500);
                     expect(res).to.be.json;
                     done();
                });
        });

         it('Should borrow a book', function (done) {
            chai.request(app)
                .post('/api/users/8/books')
                .set('x-access-token', process.env.user)
                .send({ bookId:99 })
                .end((err, res) => {
                     expect(err).to.be.null;
                     expect(res).to.have.headers;
                     expect(res).to.have.status(201);
                     expect(res).to.be.json;
                     expect(res.body).to.have.property('message')
                        .eql('book borrowed successfully!')
                     done();
                });
        });


	 	 it('Should not borrow a book you already borrowed', function (done) {
            chai.request(app)
            	.post('/api/users/8/books')
                .set('x-access-token', process.env.user)
                .send(borrowBookById)
                .end((err, res) => {
                	 expect(err).to.be.ok;
                	 expect(res).to.have.headers;
                	 expect(res).to.have.status(403);
                	 expect(res).to.be.html;
                	 done();
                });
        });

     
         it('Should not borrow a book that is not available', function (done) {
            chai.request(app)
                .post('/api/users/8/books')
                .set('x-access-token', process.env.user)
                .send(singleBookId)
                .end((err, res) => {
                     expect(err).to.be.ok;
                     expect(res).to.have.headers;
                     expect(res).to.have.status(404);
                     expect(res).to.be.html;
                     done();
                });
        });


         it('Should return error 400 badRequest bookId', function (done) {
            chai.request(app)
                .post('/api/users/8/books')
                .set('x-access-token', process.env.user)
                .send({ bookId:'swemdjsl' })
                .end((err, res) => {
                     expect(err).to.be.ok;
                     expect(res).to.have.headers;
                     expect(res).to.have.status(400);
                     expect(res).to.be.json;
                     done();
                });
        });



         it('Should return error 400 badRequest userId as string', function (done) {
            chai.request(app)
                .post('/api/users/InvalidStringId/books')
                .set('x-access-token', process.env.user)
                .send({ bookId: 4 })
                .end((err, res) => {
                     expect(err).to.be.ok;
                     expect(res).to.have.headers;
                     expect(res).to.have.status(500);
                     expect(res).to.be.json;
                     done();
                });
        });

	 	 it('user Should view allborrowed books by a user', function (done) {
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

	 	 it('admin Should view all user', function (done) {
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

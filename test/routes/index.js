import nock from 'nock';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/app';

chai.use(chaiHttp);
const { expect } = chai;
let userToken;
let adminToken;

const newUser = {
	email: 'jacksonyd5he@gmail.com',
	username: 'sammyJddmatins',
	password: '22384938999',
	membership: 'Gold'
};

const oldUser = {
	username: 'sammyJddmatins',
	password: '22384938999',
};

const admin = {
	username: 'sammyddJmatins',
	password: '22384938999',
	admin: true
}

const fakeToken = `wljejwjeljwhewlmdnsjkldkls;jel
						jhlashdlhslhdsel.s,d.dsds
						adhaldskdlsjldjs.esewsdds`;

const fakeUser = {
	username: 'esammenshek',
	password: 'sldjskhehek',
}


describe('Routes', () => {
	describe('ENDPOINT FOR USERS/ADMIN SIGNUP AND SIGIN...', function () {
        it('POST Api -- Should signup a user ', function (done) {
            chai.request(app)
            	.post('/api/users/signup')
            	.type('form')
                .send(newUser)
                .end((err, res) => {
                    userToken = res.body.token;
                    expect(res.status).to.equal(201);
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
                    expect(res.status).to.equal(400);
                    expect(res.body).to.have.property('message')
                        .eql('Username or email already registered!');
                    done();
                });
        });

         
    });
});
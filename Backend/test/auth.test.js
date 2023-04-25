const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../index');
chai.use(chaiHttp);

describe('User tests', () => {
    const emailName = Math.random().toString(36).slice(2, 7);
    const name = "krishn Patel";
    const email = emailName + "@test.com";
    const password = "123456";
    let token = "";
    it('register', (done) => {
        chai.request(server)
            .post('/user/register')
            .send({
                name,
                email,
                password
            })
            .end((err, res) => {

                // Asserts
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                done();
            });
    });

    it('login', (done) => {
        chai.request(server)
            .post('/user/login')
            .send({
                email,
                password
            })
            .end((err, res) => {
                // Asserts                        
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                token = res.body.token;
                it('correctly call Login API');
                done();
            });
    });

    it('get user', (done) => {
        chai.request(server)
            .get('/user')
            .set({ "auth": token })
            .end((err, res) => {

                // Asserts
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                let user = res.body;
                it('correctly call Get User API');
                expect(user.name).to.be.equal(name);
                expect(user.email).to.be.equal(email);
                done();
            });
    });
});

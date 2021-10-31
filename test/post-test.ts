// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
let ch = require('chai');
let chaiHttp = require('chai-http');
import {app} from "../src/index";
let should = ch.should();
ch.use(chaiHttp);

var ready = false;

app.on('ready', function () {
  ready = true;
})


describe('POST tests', () => {
  before(async function() {
    while (!ready)
      await new Promise(r => setTimeout(r, 100));
  });

  describe('POST /user', () => {
      it('add a new user with user role', (done) => {
        let user = {
          address: "0xc0A2D17f12Adaa24719Ca3a05d6E62996c9DD391",
          name: "David",
          email: "gazi@hotmail.com"
        }
        ch.request(app)
            .post('/user')
            .send(user)
            .end((err: any, res: any) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('address').eql(user.address);
                  res.body.should.have.property('name').eql(user.name);
                  res.body.should.have.property('email').eql(user.email);
              done();
            });
      });

      it('try to add two user with same email', (done) => {
        let user = {
          address: "0xc0A2D17f12Adaa24719Ca3a05d6E62996c9DD392",
          name: "David2",
          email: "gazi2@hotmail.com"
        }
        let user2 = {
          address: "0xc0A2D17f12Adaa24719Ca3a05d6E62996c9DD33",
          name: "Davide",
          email: "gazi2@hotmail.com"
        }
        ch.request(app)
            .post('/user')
            .send(user)
            .end((err: any, res: any) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('address').eql(user.address);
                  res.body.should.have.property('name').eql(user.name);
                  res.body.should.have.property('email').eql(user.email);
              done();
            });

        ch.request(app)
        .post('/user')
        .send(user)
        .end((err: any, res: any) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.error.should.be.eql('Problem in request. The email may be already in use or the address is incorrect.') //check error message from response
              res.body.should.have.property('error');
          done();
        });
      });
  });
});
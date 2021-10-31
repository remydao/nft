// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
let ch = require('chai');
let chaiHttp = require('chai-http');
import {app} from "../src/index";
let should = ch.should();


ch.use(chaiHttp);

describe('POST tests', () => {
  describe('POST /user', () => {
      it('add a new user with user role', (done) => {
        ch.request(app)
            .post('/user')
            .end((err: any, res: any) => {
                  res.should.have.status(201);
                  res.body.should.be.a('array');
              done();
            });
      });
  });

});
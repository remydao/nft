// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
let ch = require('chai');
let chaiHttp = require('chai-http');
import {app} from "../src/index";
let should = ch.should();


ch.use(chaiHttp);

describe('GET tests', () => {
  describe('GET /user', () => {
      it('it should GET all the users', (done) => {
        ch.request(app)
            .get('/user')
            .end((err: any, res: any) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
  });

});
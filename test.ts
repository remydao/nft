// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
let ch = require('chai');
let chaiHttp = require('chai-http');
import server from "./src/index";
let should = ch.should();


ch.use(chaiHttp);

describe('GETs', () => {
  describe('GET /user', () => {
      it('it should GET all the books', (done) => {
        ch.request(server)
            .get('/user')
            .end((err: any, res: any) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
  });

});
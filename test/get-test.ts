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

describe('GET tests', () => {
  before(async function() {
    while (!ready)
      await new Promise(r => setTimeout(r, 100));
  });

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

  describe("GET /stats/most-rated-ntfs", () => {
    it("it should GET most rated NFTs", (done) => {
      ch.request(app)
        .get('/stats/most-rated-nfts')
        .end((err: any, res: any) => {
          res.should.have.status(200);
          res.body.message.should.be.eql("No NFTs");
          done();
        })
    })
  })
});
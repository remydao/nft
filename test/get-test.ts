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
      it('it should fail to GET all the users', (done) => {
        ch.request(app)
            .get('/user')
            .end((err: any, res: any) => {
                  res.should.have.status(401);
                  res.body.should.have.property("message");
                  res.body.message.should.be.eql("Error. Need a token");
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
          res.body.should.have.property("message");
          res.body.message.should.be.eql("No NFTs");
          done();
        })
    })
  })


  describe("GET /stats/last-sells", () => {
    it("it should GET last sells", (done) => {
      ch.request(app)
        .get('/stats/last-sells')
        .end((err: any, res: any) => {
          res.should.have.status(200);
          res.body.should.have.property("message");
          res.body.message.should.be.eql("No sells");
          done();
        })
    })
  })
});
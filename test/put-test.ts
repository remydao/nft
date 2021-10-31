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

describe('PUT tests', () => {
  before(async function() {
    while (!ready)
      await new Promise(r => setTimeout(r, 100));
  });

describe('PUT /admin/balance', () => {

  it('Try to add balance while not logged in', (done) => {
    let teamBalance = {
      balance: 5000,
      teamId: 1
    }

    ch.request(app)
    .put('/admin/balance')
    .send(teamBalance)
    .end((err: any, res: any) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
      done();
    });
  });

  it('Try to add to balance while not admin', (done) => {
    let login = {
      email: "trixie@hotmail.fr",
      password: "testtest"
    }
    
    ch.request(app)
    .post('/login')
    .send(login)
    .end((err: any, res: any) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('access_token');
          
          let token = res.body.access_token;
          
          let teamBalance = {
            balance: 5000,
            teamId: 1
          }

          ch.request(app)
          .put('/admin/balance')
          .set({ "Authorization": `Bearer ${token}` })
          .send(teamBalance)
          .end((err: any, res: any) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("You don't have the permission to access this endpoint");
                done();
          });
    });
  });


    it('Try to add to balance with wrong team ID', (done) => {
      let login = {
        email: "gazi@hotmail.fr",
        password: "testtest"
      }
      
      ch.request(app)
      .post('/login')
      .send(login)
      .end((err: any, res: any) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('access_token');
            
            let token = res.body.access_token;
            
            let teamBalance = {
              balance: 5000,
              teamId: 7
            }      
  
            ch.request(app)
            .put('/admin/balance')
            .set({ "Authorization": `Bearer ${token}` })
            .send(teamBalance)
            .end((err: any, res: any) => {
                  res.should.have.status(404);
                  res.body.should.be.a('object');
                  res.body.should.have.property('error');
                  done();
            });
      });
    });

    it('Change balance successfully', (done) => {
      let login = {
        email: "gazi@hotmail.fr",
        password: "testtest"
      }
      
      ch.request(app)
      .post('/login')
      .send(login)
      .end((err: any, res: any) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('access_token');
            
            let token = res.body.access_token;
            
            let teamBalance = {
              teamId: 1,
              balance: 5000
            }      
  
            ch.request(app)
            .put('/admin/balance')
            .set({ "Authorization": `Bearer ${token}` })
            .send(teamBalance)
            .end((err: any, res: any) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message');
                  done();
            });
      });
    });
  });
});
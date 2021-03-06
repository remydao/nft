// During the test the env variable is set to test
import { User } from "../src/sequelize";
import { logRegistration } from "../src/utils/logging";

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
    
    const admin1 = {
        role: "admin",
        address: "0xc0A2D17f12Adaa24719Ca3a05d6E62996c9CC396",
        name: "Gazi",
        email: "gazi@hotmail.fr",
        password: "testtest"
    }

    const user1 = {
      role: "user",
      address: "0xc0A2D17f12Adaa2471cCa3a05d6E62996c9CC396",
      name: "Trixie",
      email: "trixie@hotmail.fr",
      password: "testtest"
  }
  
    User.create(user1)
    .then((user: any) => {
        logRegistration(user);
      User.create(admin1)
      .then((user: any) => {
          logRegistration(user);
      })
      .catch((err: any) => {
          console.log("[ERROR] Error while creating user." + err);
      });
    })
    .catch((err: any) => {
        console.log("[ERROR] Error while creating user." + err);
    });
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

      it('Try to add without mandatory fields', (done) => {
        let user = {
          name: "David",
          email: "gazi@hotmail.com"
        }
        ch.request(app)
            .post('/user')
            .send(user)
            .end((err: any, res: any) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('error');
              done();
            });
      });

      it('Try to add two user with same email', (done) => {
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
            });

        ch.request(app)
        .post('/user')
        .send(user2)
        .end((err: any, res: any) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
          done();
        });
      });
  });


  describe('POST /login', () => {
    it('Try to login with incorrect fields', (done) => {
      let login = {
        email: "gazi@hotmail.com"
      }
      ch.request(app)
          .post('/login')
          .send(login)
          .end((err: any, res: any) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
            done();
          });
    });

    it('Login with correct fields', (done) => {
      let user = {
        address: "0xc0A2D17f12Adaa24719Ca3a05d6E62996c9DD390",
        name: "David Ghiassi",
        email: "gazi23@hotmail.com"
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
    
            let login = {
              email: "gazi23@hotmail.com",
              password: res.body.password
            }
            
            ch.request(app)
            .post('/login')
            .send(login)
            .end((err: any, res: any) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('access_token');
              done();
            });
      });
    });
  });

  describe('POST /team', () => {

    it('Try to add a team while not logged in', (done) => {
      let team = {
        name: "GaziTeam"
      }
      ch.request(app)
      .post('/team')
      .send(team)
      .end((err: any, res: any) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
        done();
      });
    });


    it('Add a team when logged as an admin', (done) => {
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
            let team = {
              name: "GaziTeam"
            }

            ch.request(app)
            .post('/team')
            .set({ "Authorization": `Bearer ${token}` })
            .send(team)
            .end((err: any, res: any) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('id');
                  res.body.should.have.property('name').eql(team.name);
                  res.body.should.have.property('balance').eql(1000);
                  done();
            });
      });
    });

    it('Try to add team when already in a team', (done) => {
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
            let team = {
              name: "RemyTeam"
            }

            ch.request(app)
            .post('/team')
            .set({ "Authorization": `Bearer ${token}` })
            .send(team)
            .end((err: any, res: any) => {
                  res.should.have.status(401);
                  res.body.should.be.a('object');
                  res.body.should.have.property('error');
                  done();
            });
      });
    });

  });


  describe('POST /add-to-team', () => {

    it('Try to add to team without being logged', (done) => {
      let data = {
        userId: 2
      }

      ch.request(app)
      .post('/add-to-team')
      .send(data)
      .end((err: any, res: any) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
        done();
      });
    });

    it('Add non-existing user to a team when logged', (done) => {
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
            let data = {
              userId: 7
            }

            ch.request(app)
            .post('/add-to-team')
            .set({ "Authorization": `Bearer ${token}` })
            .send(data)
            .end((err: any, res: any) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('error');
                  done();
            });
      });
    });


    it('Add user to a team when logged', (done) => {
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
            let data = {
              userId: 4
            }

            ch.request(app)
            .post('/add-to-team')
            .set({ "Authorization": `Bearer ${token}` })
            .send(data)
            .end((err: any, res: any) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message');
                  done();
            });
      });
    });

    it('Try to add a user already belonging to a team', (done) => {
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
            let data = {
              userId: 3
            }

            ch.request(app)
            .post('/add-to-team')
            .set({ "Authorization": `Bearer ${token}` })
            .send(data)
            .end((err: any, res: any) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('error');
                  done();
            });
      });
    });
  });
});
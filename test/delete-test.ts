// Require the dev-dependencies
let ch = require('chai');
let chaiHttp = require('chai-http');
import {app} from "../src/index";
import { User } from "../src/sequelize";
let should = ch.should();
ch.use(chaiHttp);


var ready = false;

app.on('ready', function () {
  ready = true;
})

describe('DELETE tests', () => {
  before(async function() {
    while (!ready)
      await new Promise(r => setTimeout(r, 100));
  });

  describe('DELETE /user/1', () => {
      it('it should DELETE the first user', (done) => {

        let login = {
            email: "gazi@hotmail.fr",
            password: "testtest"
        }

        ch.request(app)
            .post('/login')
            .send(login)
            .end((err: any, res: any) => {
               ch.request(app)
                    .delete('/user/1')
                    .set({ "Authorization": `Bearer ${res.body.access_token}`})
                    .end((err: any, res: any) => {
                        res.should.have.status(200);
                        res.body.should.have.property("message");
                        res.body.message.should.be.eql(`User with id 1 has been deleted`);
                    done();
                    });
            done();
          });

        
      });
  });
});
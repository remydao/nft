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

  

});
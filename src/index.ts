import express from "express";

const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(require('./api/add-user'));
app.use(require('./api/add-nft'));
app.use(require('./api/stats'));
app.use(require('./api/add-team'));
app.use(require('./api/add-user-to-team'));

const port: number = 3000;
app.listen(port, function () {
    console.log(`App is listening at http://localhost:${port}`);
});

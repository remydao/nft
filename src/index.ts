import express from "express";

const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(require('./api/add-user'));
<<<<<<< HEAD
app.use(require('./api/add-nft'));
app.use(require('./api/stats'));
=======
app.use(require('./api/best-seller-teams'))
app.use(require('./api/add-team'));
>>>>>>> ef7ad4395c45abe75cc0fefd4bbf912cc1d16b19

const port: number = 3000;
app.listen(port, function () {
    console.log(`App is listening at http://localhost:${port}`);
});

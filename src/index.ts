import express from "express";
const cors = require('cors')


const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(require('./api/add-user'));
app.use(require('./api/add-nft'));
app.use(require('./api/stats'));
app.use(require('./api/add-team'));
app.use(require('./api/authorization'))

const port: number = 3000;
app.listen(port, function () {
    console.log(`App is listening at http://localhost:${port}`);
});

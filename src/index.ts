import express from "express";
const cors = require('cors')


const app = express();
var bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(require('./api/add-user'));
app.use(require('./api/nft'));
app.use(require('./api/stats'));
app.use(require('./api/add-team'));
app.use(require('./api/authorization'))
app.use(require('./api/change-user-role'))
app.use(require('./api/add-user-to-team'));

const port: number = 3000;
app.listen(port, function () {
    console.log(`App is listening at http://localhost:${port}`);
});

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';

const app = express();
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
app.use(require('./api/delete-user'))
app.use(require('./api/add-history'))
app.use(require('./api/add-collection'))

const port: number = 3000;
app.listen(port, function () {
    console.log(`App is listening at http://localhost:${port}`);
});

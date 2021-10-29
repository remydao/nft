import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

const swaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: "NFT API with Swagger",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    };

const options = {
    swaggerDefinition,
        apis: ['src/api/add-collection.ts',
            'src/api/add-history.ts',
            'src/api/add-team.ts',
            'src/api/add-user-to-team.ts',
            'src/api/add-user.ts',
            'src/api/authorization.ts',
            'src/api/change-user-role.ts',
            'src/api/delete-user.ts',
            'src/api/get-user.ts',
            'src/api/nft.ts',
            'src/api/stats.ts',
            'src/api/add-to-collection.ts'],
    };
  



app.use(cors())
app.use(express.urlencoded({extended : true}))

// Swagger
const specs = swaggerJsdoc(options);
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());

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
app.use(require('./api/get-user'))
app.use(require('./api/add-to-collection'))

const port: number = 3000;
app.listen(port, function () {
    console.log(`Starting app on port ${port}, please wait...`);
});

export { port };

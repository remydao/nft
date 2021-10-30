import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

const swaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: "NFT API with Swagger",
        version: "1.1.0",
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
      tags: [
        { name: "1/ Add a user"},
        { name: "2/ Get bearer token"},
        { name: "3/ NFT Management"},
        { name: "4/ Team Management"},
        { name: "5/ Collection Management"},
        { name: "6/ Stats"},
        { name: "7/ Various"}
      ]
    };

const options = {
    swaggerDefinition,
        apis: ['src/api/*.ts'],
    };
  



app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json());

// Swagger
const specs = swaggerJsdoc(options);
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));

// Api
app.use(require('./api/add-user'));
app.use(require('./api/nft'));
app.use(require('./api/stats'));
app.use(require('./api/add-team'));
app.use(require('./api/authorization'))
app.use(require('./api/change-user-role'))
app.use(require('./api/add-user-to-team'));
app.use(require('./api/delete-user'))
app.use(require('./api/add-history'))
app.use(require('./api/get-user'))
app.use(require('./api/collection'))

const port: number = 3000;
app.listen(port, function () {
    console.log(`Starting app on port ${port}, please wait...`);
});

export default app;


import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from "swagger-jsdoc";
import { Sequelize } from "sequelize";
import { collectionModel } from "./models/collection-model";
import { nftModel } from "./models/nft-model";
import { teamModel } from "./models/team-model";
import { userModel } from './models/user-model';
import { historyModel } from "./models/history-model";

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

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// All models are defined here
const User = sequelize.define('User', userModel);
const Team = sequelize.define('Team', teamModel);
const NFT = sequelize.define('NFT', nftModel);
const Collection = sequelize.define('Collection', collectionModel);
const History = sequelize.define('History', historyModel)

// Foreign keys
Team.hasMany(User, { as: "users" });
User.belongsTo(Team, {
foreignKey: "TeamId",
as: "team",
});

Team.hasMany(Collection, { as: "collections"});
Collection.belongsTo(Team);

Collection.hasMany(NFT, { as: "NFTs"});
NFT.belongsTo(Collection)
NFT.belongsTo(User, {
  foreignKey: "UserId",
  as: "user"
});

NFT.hasMany(History)
History.belongsTo(NFT)
History.belongsTo(User, {
  foreignKey: "buyerId",
  as: "buyer"
})
History.belongsTo(User, {
  foreignKey: "sellerId",
  as: "seller"
})
History.belongsTo(Collection)
Collection.hasMany(History)


sequelize.sync()
.then(() => {
  console.log('Database and tables created!')
  console.log(`App is listening at http://localhost:3000`)
  console.log(`Swagger available at http://localhost:3000/api`)
})


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

export { User, Team, NFT, Collection, History, app };


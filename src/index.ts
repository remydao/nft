import express from "express";

const app = express();
const port: number = 3000;

app.use(require('./api/add-user'));
app.use(require('./api/best-seller-teams'))

app.listen(port, function () {
    console.log(`App is listening at http://localhost:${port}`);
});

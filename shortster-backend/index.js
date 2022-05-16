const express = require("express");
const app = express();
const http = require("http");
const httpsServer = http.createServer(app);
const bodyParser = require("body-parser");
require('dotenv').config()
const port = process.env.PORT || 5000;
const db = require("./models");
const url = require("./modules/url/route");
const cors = require('cors')


/*Middlewares */
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*Authenticated Route */
app.use("/api/", url);


/*Sequelize*/
db.sequelize.sync().then((req) => {
    httpsServer.listen(port, () => {
        console.log(`Shortster is listening at http://localhost:${port}`);
    });
});

module.exports = app;
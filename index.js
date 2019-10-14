const express = require("express");
const app = express();
const path = require('path');
const exphb = require('express-handlebars');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
extended: true

}));
require("./startup/config")();
require("./startup/dev")(app);
require("./startup/prod")(app);
require("./startup/routes")(app);
require("./startup/mongodb");
require("./startup/validation")();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}..`));
module.exports = server;










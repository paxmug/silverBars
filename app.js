// Modules required for application
const express = require("express");
const bodyParser = require("body-parser");
const { validateContentType } = require('./handlers/validateRequest');
const errorHandlers = require('./handlers/errorHandlers');


const app = express();

// Services we need to use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(validateContentType);

// Initialise controllers
require("./controllers")(app);

app.use(errorHandlers.notFound);
app.use(errorHandlers.productionErrors);


module.exports = app;
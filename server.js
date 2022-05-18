require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const routes = require('./app/routes');
const bodyParser = require('body-parser');
const cors = require('cors');

// import database connection
const db = require('./app/config/database');
db.sync(); //auto generate scheme

app.use(
  cors(), // cors
  bodyParser.json(), // parse application/json
  bodyParser.urlencoded({
    extended: false,
  }), // parse application/x-www-form-urlencoded
  routes // use routes
);

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port} ...`);
});

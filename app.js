const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const mongoose   = require('mongoose');
const config     = require('./config/database');

//Connect to databse
mongoose.connect(config.database);

mongoose.connection.on('error', (err) => {
  console.log('database error: ' + config.database);
});

const app   = express();
const reqs = require('./routes/requests')

//Port
// const port  = 3000;
const port = process.env.PORT || 8080;
app.use(cors());

/*
Body Parse Middleware
Parse incoming request body
*/
app.use(bodyParser.json());

// The API is served from here
app.use('/requests', reqs);

//Start server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
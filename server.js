const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
var path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const dbURL = process.env.MONGODB_URI;

// setup HTML views:
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'pug');

// setup public folder
app.use(express.static(path.join(__dirname, '/app/public')));

// to process URL encoded forms
// (if this is missing you cannot access req.body in ./app/routes):
app.use(bodyParser.json({ extended: true }));

// connect to a local database client:
MongoClient.connect(dbURL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.error(err)
        return;
    }
    // set the db being used
    const db = client.db(process.env.MONGODB_NAME);

    // send app and db to the routes:
    require('./app/routes')(app, db);

    // start server:
    app.listen(port, () => console.log('Listening on port: ', port));
});


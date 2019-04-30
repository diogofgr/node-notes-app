const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const dbURL = process.env.MONGODB_URI;

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
    const db = client.db('node-notes-app');

    // send app and db to the routes:
    require('./app/routes')(app, db);

    // start server:
    app.listen(port, () => console.log('Listening on port: ', port));
});


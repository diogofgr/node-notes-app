var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    // POST a note:
    app.post('/notes', (req, res) => {
        const note = { content: req.body.content, title: req.body.title };

        db.collection('notes').insertOne(note, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occured.' });
            } else {
                // send back the new note if successful:
                res.send(results.ops[0]);
            }
        });
    });

    // GET all notes:
    app.get('/notes', (req, res) => {
        db.collection('notes').find({}).toArray((err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured.' });
            } else {
                res.send(item);
            }
        })
    })

    // GET a note by id:
    app.get('/notes/:id', (req, res) => {
        const id = (req.params.id);
        const details = { '_id': new ObjectID(id) };

        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured.' });
            } else {
                // send back the new note if successful:
                res.send(item.content);
            }
        })
    })

    // UPDATE a note by id:
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { content: req.body.content, title: req.body.title };

        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error: ': 'An error has occured.' });
            } else {
                res.send(note);
            }
        });
    });

    // DELETE a note by id:
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('notes').deleteOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured.' });
            } else {
                // send back the new note if successful:
                res.send(`Note deleted (id: ${id})`);
            }
        })
    })
    
    // DELETE all notes:
    app.delete('/delete/notes', (req, res) => {
        // console.log('deleteing -------------');

        // db.collection('notes').drop();
        db.collection('notes').deleteMany({}, (err, success) => {
            if (err) {
                res.send({ 'error': 'An error has occured.' });
            } else {
                // send back the new note if successful:
                res.send(`All notes deleted!`);
            }
        })
    })
};

const noteRoutes = require('./note_routes');

module.exports = function(app, db) {
    noteRoutes(app, db);

    app.get('/', (req, res) => {
        res.render('index');
    });
}
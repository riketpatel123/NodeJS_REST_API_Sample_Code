const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**Database connection to  SQL lite 3 */
const dbfile = "test.db";
const db = new sqlite3.Database(dbfile, (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run("CREATE TABLE IF NOT EXISTS users ( userId text, firstName text, lastName text, email text, tone text)",
            (err) => {
                db.run('DELETE FROM users')
            });
    }
});

/** return UUID */
app.get('/id', (req, res) => {
    res.send(uuidv4());
});

/** return list of all users */
app.get('/user', (req, res) => {
    db.all("SELECT * FROM users", (err, result) => {
        if (err) {
            res.status(400).json({ "ERROR": err.message });
        }
        if (!result) {
            res.status(404).send(`NO Record found`);
        } else {
            res.status(200).json(result);
        }
    });
});

/** create new user */
app.post('/user', (req, res) => {
    const newUser = req.body;
    const userId = uuidv4();
    const sqlQuery = `INSERT INTO users (userId, firstName, lastName, email, tone) VALUES(?,?,?,?,?)`
    db.run(sqlQuery, [userId, newUser.firstName, newUser.lastName, newUser.email, newUser.tone], function (err) {
        if (err) {
            res.status(400).json({ "ERROR": err.message });
        }
        res.status(200).send(`CREATE ENTRY SUCCESSFUL : ${userId}`);
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Server app listening on port ${PORT}!`)
});

module.exports = app;
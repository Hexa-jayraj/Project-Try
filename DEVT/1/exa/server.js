const express = require("express");
const app = express();
const mysql = require("mysql");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "task_management"
});

// Passport.js configuration
passport.use(new LocalStrategy(
    function(username, password, done) {
        db.query("SELECT * FROM users WHERE username = ?", username, function(err, rows) {
            if (err) return done(err);
            if (!rows.length) return done(null, false);
            const user = rows[0];
            if (password !== user.password) return done(null, false);
            return done(null, user);
        });
    }
));

// API endpoints
app.get("/api/tasks", function(req, res) {
    db.query("SELECT * FROM tasks", function(err, rows) {
        if (err) res.status(500).send(err);
        res.send(rows);
    });
});

app.post("/api/tasks", function(req, res) {
    const task = {
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDate
    };
    db.query("INSERT INTO tasks SET ?", task, function(err, result) {
        if (err) res.status(500).send(err);
        res.send({ id: result.insertId, ...task });
    });
});

app.listen(3000, function() {
    console.log("Server listening on port 3000");
});
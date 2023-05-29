const express = require('express');
const router = express.Router();
// const axios = require('axios');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// DB connection:
const pool = require('../modules/pool');

// GET route for (authenticated/logged in) user's tasks: 
router.get('/', rejectUnauthenticated, (req, res) => {
    let sqlQuery = `
        SELECT * FROM "user_todo"
        WHERE "user_id"=($1);`;
    
    let sqlValues = [req.user.id];

    pool.query(sqlQuery, sqlValues)
    .then((results) => {
        console.log('this is results for tasks GET route:', results.rows);
        res.send(results.rows)
    }).catch((error) => {
        console.log('error w task GET route:', error);
        res.sendStatus(500);
    })
});

// POST route for (auth'd/logged in) user's to add tasks to their DB list:
router.post('/', rejectUnauthenticated, (req, res) => {
    let newTask = req.body;
    let sqlQuery = `
        INSERT INTO "user_todo"
            ("user_id", "todo_description", "category_id", "moon_id")
            VALUES
            ($1, $2, 2, 8);`;
    // NOTE: using sample data for first attempt at POST route (chore_category + moon_id)
    let sqlValues = [req.user.id, newTask.task];
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch(error => {
            res.sendStatus(500);
        })
});


module.exports = router;
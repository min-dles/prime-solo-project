const express = require('express');
const router = express.Router();
// const axios = require('axios');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// DB connection:
const pool = require('../modules/pool');

// GET route for user tasks: 
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

module.exports = router;
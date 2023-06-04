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
        SELECT user_todo.id AS "task_id", 
            user_todo.user_id,
            user_todo.todo_description AS "task",
            user_todo.moon_id AS "phase",
            user_todo.completion_status,
            chore_categories.id AS "category_id",
            chore_categories.category AS "category"
        FROM "user_todo"
        JOIN "chore_categories" 
            ON user_todo.category_id=chore_categories.id
        WHERE "user_id"=($1)
        ORDER BY "phase" ASC, "task_id" ASC;`;

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
            ($1, $2, $3, $4);`;
    let sqlValues = [req.user.id, newTask.todo_description, newTask.category_id, newTask.moon_id];
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch(error => {
            res.sendStatus(500);
        })
});

// PUT route to update tasks (to edit description, moon phase, and/or category)
router.put('/:id', rejectUnauthenticated, (req, res) => {
    let taskUpdate = req.body.todo_description;
    let categoryUpdate = req.body.category_id;
    let phaseUpdate = req.body.moon_id;
    // req.params example: { id: '3' } with id referencing chore id (not user id)
    let idToUpdate = req.params.id;
    let userID = req.user.id;
    let sqlQuery = `
        UPDATE "user_todo"
            SET ("todo_description", "category_id", "moon_id")=($1,$2,$3)
            WHERE "id"=$4
            AND "user_id"=$5;`;
    let sqlValues = [taskUpdate, categoryUpdate, phaseUpdate, idToUpdate, userID];
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        }).catch((dbErr) => {
            console.log('error with PUT task-list route:', dbErr);
            res.sendStatus(500);
        })
})

// Need another PUT route to update tasks for completion status:
router.put('/status/:id', rejectUnauthenticated, (req, res) => {
    let taskStatus = req.body.completion_status;
    let taskID = req.params.id;
    let userID = req.user.id;
    let sqlQuery = `
        UPDATE "user_todo"
            SET "completion_status"=$1
            WHERE "id"=$2
            AND "user_id"=$3;`;
    let sqlValues = [taskStatus, taskID, userID];
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        }).catch((dbErr) => {
            console.log('error in PUT route for completion status:', dbErr);
            res.sendStatus(500);
        })
})

// DELETE route to completely delete a task from the user_todo table in DB
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let idToDelete = req.params.id;
    let userID = req.user.id;
    let sqlQuery = `
        DELETE FROM "user_todo"
            WHERE "id"=$1
            AND "user_id"=$2;`;
    let sqlValues = [idToDelete, userID];
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        }).catch((dbErr) => {
            console.log('DELETE task-list/:id error:', dbErr);
            res.sendStatus(500);
        })
})


module.exports = router;
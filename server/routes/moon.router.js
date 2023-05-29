const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Moon Phase API: 
router.get('/', (req, res) => {
  const applicationID = process.env.ASTRONOMY_API_ID;
  const applicationSecret = process.env.ASTRONOMY_API_SECRET;
  const authString = btoa(`${applicationID}:${applicationSecret}`);
  
  const config = {
    headers: { 'Authorization': `Basic ${authString}` }
  }
  const url = "https://api.astronomyapi.com/api/v2/bodies/positions/moon?latitude=44.978000&longitude=-93.263248&elevation=830&from_date=2023-05-24&to_date=2023-05-27&time=13:04:23"
  
  axios.get(url, config)
    .then((response) => {
      console.log('it worked! here is response:', response.data);
      res.send(response.data);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

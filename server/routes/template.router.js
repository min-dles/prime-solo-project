const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();

// Moon Phase API: 
const authString = btoa(`${ASTRONOMY_API_ID}:${ASTRONOMY_API_SECRET}`);

router.get('/', (req, res) => {
  const config = {
    headers: { 'Authorization': `Basic ${authString}` }
  }
  const url = "https://api.astronomyapi.com/api/v2/bodies/positions/moon?latitude=44.978000&longitude=-93.263248&elevation=830&from_date=2023-05-24&to_date=2023-05-27&time=13:04:23"
  axios.get(url, config).then((response) => {
    res.send(response.data);
  }).catch( err => {
    res.sendStatus(500);
  });
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

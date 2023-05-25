import axios from 'axios';
require('dotenv').config();

// Need to first check if there is anything already stored in the 
// moonstore (was API call already made? Or is user logging in for 
// first time in a while?)
function* fetchMoonPhase() {
    if (store.moonPhases !== {}) return;
    try {
        const authString = process.env.ASTONOMY_API_KEY
        const config = {
            headers: { 'Authorization: Basic ASTRONOMY_API_KEY' }

        };
        axios.get('https://api.astronomyapi.com/api/v2/bodies/positions/moon?latitude=44.978000&longitude=-93.263248&elevation=830&from_date=2023-05-24&to_date=2023-05-27&time=13:04:23')
        .then((response) => {
            console.log(response.data);
        });

    }
}
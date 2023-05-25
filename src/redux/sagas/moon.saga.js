import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Need to first check if there is anything already stored in the 
// moonstore (was API call already made? Or is user logging in for 
// first time in a while?)
function* fetchMoonPhase() {
    if (store.moonPhases !== {}) return;
    try {
        const response = yield axios.get('/api/astronomy');
        console.log('moon.saga response:', response);
        yield put({ type: 'SET_MOON', payload: response });
    } catch (error) {
        console.log('Moon saga fail:', error);
    }
}

function* moonSaga() {
    yield takeLatest('FETCH_MOON_PHASES', fetchMoonPhase);
}

export default moonSaga;
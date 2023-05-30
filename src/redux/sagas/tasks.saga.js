import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTasks(){
    try{
        const result = yield axios.get('/api/task-list')
        yield put({ type: 'SET_TASKS', payload: result.data })
    } catch(error) {
        console.log('error with fetchTasks saga:', error);
    }
}

export default function* tasksSaga() {
    yield takeLatest('FETCH_TASKS', fetchTasks);
}
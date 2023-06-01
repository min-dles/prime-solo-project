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

function* addTask(action) {
    try {
        const result = yield axios.post('/api/task-list', action.payload)
        yield ({type: 'FETCH_TASKS'})
    } catch (error) {
        console.log('error with addTask saga:', error);
    }
}

export default function* tasksSaga() {
    yield takeLatest('FETCH_TASKS', fetchTasks);
    yield takeLatest('ADD_TASK', addTask);
}
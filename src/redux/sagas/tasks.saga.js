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
		yield put({type: 'FETCH_TASKS'})
	} catch (error) {
		console.log('error with addTask saga:', error);
	}
}

function* deleteTask(action) {
	try {
		const result = yield axios.delete(`/api/task-list/${action.payload}`);
		yield put({type: 'FETCH_TASKS'});
	} catch (error) {
		console.log('error with DELETE saga:', error);
	}
}

function* updateTask(action) {
	try {
		yield axios.put(`/api/task-list/${action.payload.task_id}`, action.payload);
		yield put({type: 'FETCH_TASKS'});
	} catch (error) {
		console.log('error with updateTask saga:', error);
	}
}

function* completeTask(action) {
	try { 
		yield axios.put(`/api/task-list/status/${action.payload.task_id}`, action.payload);
		yield put({type: 'FETCH_TASKS'});
	} catch (error) {
		console.log('error in saga:', error);
	}
}

export default function* tasksSaga() {
	yield takeLatest('FETCH_TASKS', fetchTasks);
	yield takeLatest('ADD_TASK', addTask);
	yield takeLatest('DELETE_TASK', deleteTask);
	yield takeLatest('UPDATE_TASK', updateTask);
	yield takeLatest('COMPLETE_TASK', completeTask);
}
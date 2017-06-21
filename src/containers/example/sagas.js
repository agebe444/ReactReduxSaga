import {take, takeLatest, call, cancel, put, select} from 'redux-saga/effects';

import { getContext } from '../../utils/context';
import request from '../../utils/request'

import {
  FETCH_MESSAGE,
  messageReceived,
} from './actions';

export function* fetchMessageSaga(action) {
  const endpoint = 'hello';
  const contextPath = getContext();
  const url = `${contextPath}/api/${endpoint}`
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  }

  try {
    const res = yield call(request, url, options);
    console.log('test', res);
    yield put(messageReceived(res.json.message));
  } catch (err) {
    console.log('test2', err);
    yield put(messageReceived('ERROR WHILE FETCHING MESSAGE'));
  }
}

export function* rootSaga() {
  const watchSendFiles = yield takeLatest(FETCH_MESSAGE, fetchMessageSaga);
}

export default rootSaga;

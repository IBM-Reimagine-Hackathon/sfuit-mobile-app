import {all} from 'redux-saga/effects';
import auth from './Auth';

function* saga() {
  yield all([...auth]);
}

export default saga;

import {put, call, select, delay} from 'redux-saga/effects';
import {AuthActions, SearchActions} from '../actions';
import {showToast} from '../../config/utills';
import {ApiCaller, NavigationService} from '../../config';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
export const getUser = state => state.Auth.user;

const validateResponse = response => {
  return new Promise((res, rej) => {
    if (response) {
      if (response.status == 200) {
        res({success: true});
      } else {
        try {
          if (response.data.error.message != 'User status unverified.') {
            showToast(response.data.error.message);
          }
          res({success: false, message: response.data.error.message});
        } catch (error) {
          showToast('Something went wrong');
          res({success: false});
        }
      }
    } else {
      res({success: false});
      showToast('Something went wrong');
    }
  });
};
function generateBlob(base64URL) {
  return fetch(base64URL)
    .then(response => response.blob())
    .then(response => response)
    .catch(err => console.log(err));
}

export function* searchPolls(action) {
  const {payload} = action;
  const {type, interest, search} = payload;
  console.log(type, interest, search, 'from search poll saga payload');

  let {token} = yield select(getUser);
  const response = yield call(
    ApiCaller.Get,
    `get-all-polls?type=${type}&interest=${interest}&offset=0&limit=50&search=${search}`,
    {
      'content-type': 'application/json',
      Authorization: token,
    },
  );
  //console.log(response, 'get all polls from search saga');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: SearchActions.SEARCH_POLLS_SUCCESS,
      payload: response.data.success.data,
    });
  } else {
    yield put({type: SearchActions.SEARCH_POLLS_FAIL});
  }
}

import {put, call, select, delay} from 'redux-saga/effects';
import {AuthActions, NotificationActions} from '../actions';
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

export function* getNotifications(action) {
  const {payload} = action;
  let {token} = yield select(getUser);
  const response = yield call(
    ApiCaller.Get,
    `get-notifications?offset=0&limit=50&search=`,
    {
      'content-type': 'application/json',
      Authorization: token,
    },
  );
  //console.log(response.data, 'get polls');
  //return;
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: NotificationActions.GET_NOTIFICATIONS_SUCCESS,
      payload: response.data.success.data
        ? response.data.success.data
        : response.data.success.message && [],
    });
  } else {
    yield put({type: NotificationActions.GET_NOTIFICATIONS_FAIL});
  }
}

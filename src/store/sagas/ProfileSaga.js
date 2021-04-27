import {put, call, select, delay} from 'redux-saga/effects';
import {AuthActions, ProfileActions} from '../actions';
import {showToast} from '../../config/utills';
import {ApiCaller, NavigationService, Colors} from '../../config';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { InterestColors } from '../../config/colors';

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
          console.log(error, 'after something went wrong');
          showToast('Something went wrong');
          res({success: false});
        }
      }
    } else {
      res({success: false});
      console.log(res, 'after something went wrong');
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

//=====

export function* getUserDetail(action) {
  const {payload} = action;

  let {token} = yield select(getUser);
  //console.log('saga profile')
  const response = yield call(ApiCaller.Get, `user-profile`, {
    'content-type': 'application/json',
    Authorization: token,
  });
  // console.log(response, 'get user profile detail');
  //return
  // console.log(response.data.success.data, 'get user profile detail 1');

  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    const colorsArray = [
      Colors.SuccessGreen,
      Colors.Secondary,
      Colors.Primary,
      Colors.PinkTag,
      Colors.BlueTag,
      Colors.AlertRed,
      Colors.PurpleTag,
    ];
    let new_payload = [];
    response.data.success.data.user_interests.map((item, index) => {
      new_payload.push({
        item,
        color_code: InterestColors[item] || colorsArray[Math.floor(Math.random() * 7)],
      });
    });
    if (response_status.success) {
      payload?.callBack &&
        payload?.callBack({
          ...response.data.success.data,
          user_interests: new_payload,
        });
      yield put({
        type: ProfileActions.GET_USER_DETAIL_SUCCESS,
        payload: {...response.data.success.data, user_interests: new_payload},
      });
    }
  } else {
    yield put({type: ProfileActions.GET_USER_DETAIL_FAIL});
  }
}

export function* getOtherUserDetail(action) {
  const {payload} = action;
  let {token} = yield select(getUser);
  console.log('saga profile other user');
  const response = yield call(
    ApiCaller.Get,
    `other-userprofile/${payload.id}`,
    {
      'content-type': 'application/json',
      Authorization: token,
    },
  );
  console.log(response, 'get other user profile detail');
  console.log(response?.data?.success?.data, 'get user profile detail 1');

  const response_status = yield call(validateResponse, response);
  //return
  if (response_status.success) {
    //alert(response_status.success)
    const colorsArray = [
      Colors.SuccessGreen,
      Colors.Secondary,
      Colors.Primary,
      Colors.PinkTag,
      Colors.BlueTag,
      Colors.AlertRed,
      Colors.PurpleTag,
    ];
    let new_payload = [];
    response?.data?.success?.data?.user_interests?.map((item, index) => {
      //alert('in map')
      new_payload.push({
        item,
        color_code: InterestColors[item] || colorsArray[Math.floor(Math.random() * 7)],
      });
    });
    if (response_status.success) {
      yield put({
        type: ProfileActions.GET_OTHER_USER_DETAIL_SUCCESS,
        payload: {...response.data.success.data, user_interests: new_payload},
        //payload: response.data.success.data
      });
    }
  } else {
    yield put({type: ProfileActions.GET_OTHER_USER_DETAIL_FAIL});
  }
}

export function* getUserPolls(action) {
  const {payload} = action;
  let {token} = yield select(getUser);
  const response = yield call(
    ApiCaller.Get,
    `user-polls?type=${payload.type}&offset=0&limit=50`,
    {
      'content-type': 'application/json',
      Authorization: token,
    },
  );
  //  console.log(response, 'get USER polls');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: ProfileActions.GET_USER_POLLS_SUCCESS,
      payload: response.data.success.data,
    });
  } else {
    yield put({type: ProfileActions.GET_USER_POLLS_FAIL});
  }
}

export function* getOtherUserPolls(action) {
  const {payload} = action;
  let {token} = yield select(getUser);
  const response = yield call(
    ApiCaller.Get,
    `otheruser-polls/${payload.id}?type=${payload.type}&offset=0&limit=50`,
    {
      'content-type': 'application/json',
      Authorization: token,
    },
  );
  console.log(response.data, 'get other USER polls', payload.id, payload.type);
  //return
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: ProfileActions.GET_OTHER_USER_POLLS_SUCCESS,
      payload: response.data.success.data,
    });
  } else {
    yield put({type: ProfileActions.GET_OTHER_USER_POLLS_FAIL});
  }
}

export function* sendFriendRequest(action) {
  const {payload} = action;

  let {token} = yield select(getUser);
  let utc_time = moment.utc(moment()).format('YYYY-MM-DD HH:mm:ss');
  const response = yield call(
    ApiCaller.Post,
    `send-request`,
    {
      id: payload.id,
      current_time: utc_time,
    },
    {
      'content-type': 'application/json',
      Authorization: token,
    },
  );
  console.log(
    response.data.success.message,
    'friend reques response',
    payload.id,
  );
  //return
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: ProfileActions.FRIEND_REQUEST_SUCCESS,
      payload: response.data.success.message,
    });
    payload?.callBack && payload?.callBack();
  } else {
    yield put({type: ProfileActions.FRIEND_REQUEST_FAIL});
  }
}

export function* respondToRequest(action) {
  const {payload} = action;

  let {token} = yield select(getUser);
  let utc_time = moment.utc(moment()).format('YYYY-MM-DD HH:mm:ss');
  const response = yield call(
    ApiCaller.Post,
    `accept-or-reject-request`,
    {
      id: payload.id,
      action: payload.action,
      current_time: utc_time,
    },
    {
      'content-type': 'application/json',
      Authorization: token,
    },
  );
  //console.log(response.data, 'respond to request response', payload.id);
  // return;
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: ProfileActions.FRIEND_REQUEST_SUCCESS,
      payload: response?.data?.success?.message,
    });
    payload?.callBack && payload?.callBack();
  } else {
    yield put({type: ProfileActions.FRIEND_REQUEST_FAIL});
  }
}

export function* getPendingRequest(action) {
  const {payload} = action;
  let {token} = yield select(getUser);
  let utc_time = moment.utc(moment()).format('YYYY-MM-DD HH:mm:ss');
  const response = yield call(
    ApiCaller.Get,
    `user-pending-requests?offset=0&limit=50`,
    {
      'content-type': 'application/json',
      Authorization: token,
    },
  );
  console.log(response, 'pending request response\n\n');
  //return
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: ProfileActions.GET_PENDING_REQUEST_SUCCESS,
      payload: response.data.success?.message
        ? []
        : response.data.success?.data,
    });
  } else {
    yield put({type: ProfileActions.GET_PENDING_REQUEST_FAIL});
  }
}

export function* getUserFriends(action) {
  const {payload} = action;

  let {token} = yield select(getUser);
  const response = yield call(
    ApiCaller.Get,
    `user-contacts/${payload.id}?offset=0&limit=50&like=${payload.search}`,
    {
      'content-type': 'application/json',
      Authorization: token,
    },
  );
  console.log(
    response.data?.success?.data,
    'get other USER friends',
    payload.id,
  );
  //return
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    const colorsArray = [
      Colors.SuccessGreen,
      Colors.Secondary,
      Colors.Primary,
      Colors.PinkTag,
      Colors.BlueTag,
      Colors.AlertRed,
      Colors.PurpleTag,
    ];
    let processedData = [];
    processedData = response?.data?.success?.data?.map(d => {
      let new_payload = [];
      //console.log(d, 'in saga of invite friend');
      d.interests.map((item, index) => {
        //alert('in map')
        new_payload.push({
          name: item,
          color_code: InterestColors[item] || colorsArray[Math.floor(Math.random() * 7)],
        });
      });
      return {...d, interests: new_payload};
    });
    // console.log(processedData, 'from invite api process data');

    yield put({
      type: ProfileActions.GET_USER_FRIENDS_SUCCESS,
      payload: processedData,
    });
    payload?.callBack && payload?.callBack();
  } else {
    yield put({type: ProfileActions.GET_USER_FRIENDS_FAIL});
  }
}

export function* editProfile(action) {
  let {token} = yield select(getUser);
  let {payload} = action;
  console.log('payllodddddddd from edit profile', payload);
  //return;
  let formData = new FormData();
  Object.keys(payload).forEach((key, index) => {
    console.log('=====', key, Object.values(payload)[index]);
    //if (key != 'profile_image' && key != 'interests[]') {
    if (key != 'profile_image') {
      formData.append(key, Object.values(payload)[index]);
    } else if (
      key == 'profile_image' &&
      Object.values(payload)[index] != null
    ) {
      formData.append(
        'profile_image',
        //null,
        Object.values(payload)[index],
        Object.values(payload)[index]?.name,
      );
    }
  });
  //return;
  let date_now = moment().format('YYYY-MM-DD HH:mm:ss');
  let utc_time = moment.utc(moment(date_now)).format('YYYY-MM-DD HH:mm:ss');
  formData.append('current_time', utc_time);

  const response = yield ApiCaller.Post('edit-user-profile', formData, {
    Authorization: token,
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  });
  console.log(response.data, 'update profile');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: ProfileActions.EDIT_PROFILE_SUCCESS,
    });
    NavigationService.goBack();
  } else {
    yield put({type: ProfileActions.EDIT_PROFILE_FAIL});
  }
}

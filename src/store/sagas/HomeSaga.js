import {put, call, select, delay} from 'redux-saga/effects';
import {AuthActions, HomeActions} from '../actions';
import {showToast} from '../../config/utills';
import {ApiCaller, NavigationService, Colors} from '../../config';
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

export function* createPoll(action) {
  let {token} = yield select(getUser);
  let {payload} = action;
  console.log('payllodddddddd from create poll', payload);
  ///return
  console.log('payllodddddddd', payload['options[]']);
  let formData = new FormData();
  Object.keys(payload).forEach((key, index) => {
    console.log('=====', key, index);
    if (key != 'options[]') {
      formData.append(key, Object.values(payload)[index]);
    }
  });
  let date_now = moment().format('YYYY-MM-DD HH:mm:ss');
  let utc_time = moment.utc(moment(date_now)).format('YYYY-MM-DD HH:mm:ss');
  formData.append('current_time', utc_time);
  payload['options[]'].forEach(image => {
    // console.log(image.data)
    // generateBlob(image.uri).then((img)=>{

    formData.append('options[]', image, image.name);
    // })
  });

  console.log('form datata', formData);
  const response = yield ApiCaller.Post('create-poll', formData, {
    Authorization: token,
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  });
  console.log(response, 'create poll');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.CREATE_POLL_SUCCESS,
    });
    NavigationService.reset_0('Tabs');
  } else {
    yield put({type: HomeActions.CREATE_POLL_FAIL});
  }
}

export function* editPoll(action) {
  let {token} = yield select(getUser);
  let {payload} = action;
  console.log('payllodddddddd from edit poll saga', payload);
  //return;
  let date_now = moment().format('YYYY-MM-DD HH:mm:ss');
  let utc_time = moment.utc(moment(date_now)).format('YYYY-MM-DD HH:mm:ss');

  const response = yield ApiCaller.Put(
    `edit-poll/${payload.id}`,
    {
      ...payload,
      current_time: utc_time,
    },
    {
      Authorization: token,
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  );
  console.log(response.data, 'edit poll');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.EDIT_POLL_SUCCESS,
    });
    NavigationService.reset_0('Tabs');
    showToast(response.data.success.message, 'success');
  } else {
    yield put({type: HomeActions.EDIT_POLL_FAIL});
  }
}

export function* hidePoll(action) {
  let {token} = yield select(getUser);
  let {payload} = action;
  // console.log('payllodddddddd from hide poll saga', payload);
  //alert(payload.id);
  // return;
  let date_now = moment().format('YYYY-MM-DD HH:mm:ss');
  let utc_time = moment.utc(moment(date_now)).format('YYYY-MM-DD HH:mm:ss');

  const response = yield ApiCaller.Post(
    `hide-poll/${payload.id}`,
    {
      current_time: utc_time,
    },
    {
      Authorization: token,
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  );
  console.log(response.data, 'hide poll');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.HIDE_POLL_SUCCESS,
    });
    NavigationService.reset_0('Tabs');
    showToast(response.data.success.message, 'success');
  } else {
    yield put({type: HomeActions.HIDE_POLL_FAIL});
  }
}

export function* endPoll(action) {
  let {token} = yield select(getUser);
  let {payload} = action;
  console.log('payllodddddddd from end poll saga', payload);

  let date_now = moment().format('YYYY-MM-DD HH:mm:ss');
  let utc_time = moment.utc(moment(date_now)).format('YYYY-MM-DD HH:mm:ss');

  const response = yield ApiCaller.Put(
    `end-user-poll/${payload.id}`,
    {
      experience: payload.experience,
      current_time: utc_time,
    },
    {
      Authorization: token,
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  );
  console.log(response.data, 'end poll');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    payload?.callBack && payload?.callBack();
    yield put({
      type: HomeActions.END_POLL_SUCCESS,
    });
    NavigationService.reset_0('Tabs');
    showToast(response.data.success.message, 'success');
  } else {
    //alert('heyyyy')
    payload?.callBack && payload?.callBack();
    yield put({type: HomeActions.END_POLL_FAIL});
  }
}

export function* removePoll(action) {
  let {token} = yield select(getUser);
  let {payload} = action;
  console.log('payllodddddddd from remove poll saga', payload);
  // alert('from remove poll');
  //return;
  let date_now = moment().format('YYYY-MM-DD HH:mm:ss');
  let utc_time = moment.utc(moment(date_now)).format('YYYY-MM-DD HH:mm:ss');

  const response = yield ApiCaller.Delete(
    `delete-user-poll/${payload.id}`,
    {
      current_time: utc_time,
    },
    {
      Authorization: token,
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  );
  console.log(response.data, 'remove poll');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    payload?.callBack();
    yield put({
      type: HomeActions.REMOVE_POLL_SUCCESS,
    });
    NavigationService.reset_0('Tabs');
    showToast(response.data.success.message, 'success');
  } else {
    payload?.callBack && payload?.callBack();
    yield put({type: HomeActions.REMOVE_POLL_FAIL});
  }
}

export function* votePoll(action) {
  let {token} = yield select(getUser);
  let {payload} = action;
  let {callBack} = payload;
  console.log('payllodddddddd from vote poll saga', payload);

  let date_now = moment().format('YYYY-MM-DD HH:mm:ss');
  let utc_time = moment.utc(moment(date_now)).format('YYYY-MM-DD HH:mm:ss');

  const response = yield ApiCaller.Post(
    `add-poll-vote/${payload.pollId}`,
    {
      add_vote: payload.voted,
      poll_option_id: payload.optionId,
      current_time: utc_time,
    },
    {
      Authorization: token,
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  );
  console.log(response.data, 'voted poll');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    showToast(response.data.success.message, "success")
    callBack();
    yield put({
      type: HomeActions.VOTE_POLL_SUCCESS,
    });

    //showToast(response.data.success.message, 'success');
  } else {
    yield put({type: HomeActions.VOTE_POLL_FAIL});
  }
}

export function* addComment(action) {
  let {token} = yield select(getUser);
  let {payload} = action;
  console.log('payllodddddddd from ADD  COMMENT saga', payload);
  //alert('from ADD COMMENT poll');
  //return;
  let date_now = moment().format('YYYY-MM-DD HH:mm:ss');
  let utc_time = moment.utc(moment(date_now)).format('YYYY-MM-DD HH:mm:ss');

  const response = yield ApiCaller.Post(
    `add-poll-comment/${payload.id}`,
    {
      body: payload.commentText,
      current_time: utc_time,
    },
    {
      Authorization: token,
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  );
  console.log(response.data, 'add comment');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    payload?.callBack && payload?.callBack();
    yield put({
      type: HomeActions.ADD_COMMENT_SUCCESS,
    });
    //NavigationService.reset_0('Tabs');
    //showToast(response.data.success.message, 'success');
  } else {
    yield put({type: HomeActions.ADD_COMMENT_FAIL});
  }
}

export function* deleteComment(action) {
  let {token} = yield select(getUser);
  let {payload} = action;
  console.log('payllodddddddd from ADD  COMMENT saga', payload);
  //alert('from DELETE COMMENT poll');
  //return;
  let date_now = moment().format('YYYY-MM-DD HH:mm:ss');
  let utc_time = moment.utc(moment(date_now)).format('YYYY-MM-DD HH:mm:ss');

  const response = yield ApiCaller.Put(
    `delete-poll-comment/${payload.id}`,
    {
      current_time: utc_time,
    },
    {
      Authorization: token,
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  );
  console.log(response.data, 'end poll');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    payload?.callBack && payload?.callBack();
    yield put({
      type: HomeActions.DELETE_COMMENT_SUCCESS,
    });
    //NavigationService.reset_0('Tabs');
    //showToast(response.data.success.message, 'success');
  } else {
    yield put({type: HomeActions.DELETE_COMMENT_FAIL});
  }
}

export function* updatePassword(action) {
  let {token} = yield select(getUser);
  let {payload} = action;
  const {callBack, change_password_data} = payload;
  console.log('payllodddddddd from change password saga', payload);
  //alert('from DELETE COMMENT poll');
  //return;
  let date_now = moment().format('YYYY-MM-DD HH:mm:ss');
  let utc_time = moment.utc(moment(date_now)).format('YYYY-MM-DD HH:mm:ss');

  const response = yield ApiCaller.Put(
    `change-user-password`,
    {
      current_password: change_password_data.password,
      new_password: change_password_data.newPassword,
      current_time: utc_time,
    },
    {
      Authorization: token,
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  );
  console.log(response.data, 'end poll');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.UPDATE_PASSWORD_SUCCESS,
    });
    //NavigationService.reset_0('Tabs');
    callBack(false);
    showToast(response.data.success.message, 'success');
  } else {
    callBack(response?.data?.error?.message);
    alert(response?.data?.error?.message);
    yield put({type: HomeActions.UPDATE_PASSWORD_FAIL});
  }
}

export function* getPolls(action) {
  const {payload} = action;
  let {token} = yield select(getUser);
  const response = yield call(
    ApiCaller.Get,
    `dashboard?voted-polls=${payload.voted_poll ? 'on' : 'off'}&interest=${
      payload.interest
    }&offset=0&limit=50&search=`,
    {
      'content-type': 'application/json',
      Authorization: token,
    },
  );
  //console.log(response, 'get polls');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.GET_POLLS_SUCCESS,
      payload: response.data.success.data,
    });
  } else {
    yield put({type: HomeActions.GET_POLLS_FAIL});
  }
}

export function* getPollDetail(action) {
  const {payload} = action;
  const {id} = payload;
  console.log(payload, 'from saga of poll detail');
  let {token} = yield select(getUser);
  const response = yield call(ApiCaller.Get, `poll-details/${id}`, {
    //const response = yield call(ApiCaller.Get, `poll-details/${142}`, {
    'content-type': 'application/json',
    Authorization: token,
  });
  //console.log(response.data, 'get poll detail\n\n');
  //console.log(response.data.success.data[0], 'get poll detail final\n\n');

  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    //
    const colorsArray = [
      Colors.SuccessGreen,
      Colors.Secondary,
      Colors.PinkTag,
      Colors.BlueTag,
      Colors.AlertRed,
      Colors.PurpleTag,
      Colors.Primary,
    ];

    // logic start bar and circle
    response?.data?.success?.data[0]?.options?.map(
      (option, index, optionArray) => {
        response?.data?.success?.data[0]?.people_who_voted?.map(pwv => {
          //console.log(option.poll_option_id,pwv.poll_option_id)
          if (
            index == 0 &&
            optionArray[0].poll_option_id == pwv.poll_option_id
          ) {
            //console.log(option.poll_option_id,pwv.poll_option_id)
            option.optionColor = colorsArray[0];
            pwv.optionColor = colorsArray[0];
            pwv.optionNo = index + 1;
          } else if (
            index == 1 &&
            optionArray[1].poll_option_id == pwv.poll_option_id
          ) {
            //console.log(option.poll_option_id,pwv.poll_option_id)
            option.optionColor = colorsArray[1];
            pwv.optionColor = colorsArray[1];
            pwv.optionNo = index + 1;
          } else if (
            index == 2 &&
            optionArray[2].poll_option_id == pwv.poll_option_id
          ) {
            //console.log(option.poll_option_id,pwv.poll_option_id)
            option.optionColor = colorsArray[2];
            pwv.optionColor = colorsArray[2];
            pwv.optionNo = index + 1;
          } else if (
            index == 3 &&
            optionArray[3].poll_option_id == pwv.poll_option_id
          ) {
            //console.log(option.poll_option_id,pwv.poll_option_id)
            option.optionColor = colorsArray[3];
            pwv.optionColor = colorsArray[3];
            pwv.optionNo = index + 1;
          } else if (
            index == 4 &&
            optionArray[4].poll_option_id == pwv.poll_option_id
          ) {
            //console.log(option.poll_option_id,pwv.poll_option_id)
            option.optionColor = colorsArray[4];
            pwv.optionColor = colorsArray[4];
            pwv.optionNo = index + 1;
          } else if (
            index == 5 &&
            optionArray[5].poll_option_id == pwv.poll_option_id
          ) {
            //console.log(option.poll_option_id,pwv.poll_option_id)
            option.optionColor = colorsArray[5];
            pwv.optionColor = colorsArray[5];
            pwv.optionNo = index + 1;
          } else if (
            index == 6 &&
            optionArray[6].poll_option_id == pwv.poll_option_id
          ) {
            //console.log(option.poll_option_id,pwv.poll_option_id)
            option.optionColor = colorsArray[6];
            pwv.optionColor = colorsArray[6];
            pwv.optionNo = index + 1;
          }
        });
      },
    );

    // logic end
    let new_payload = [];

    processedData = response?.data?.success?.data[0]?.poll_interests?.map(d => {
      new_payload.push({
        name: d,
        color_code: colorsArray[Math.floor(Math.random() * 7)],
      });
    });

    let processedData1 = response?.data?.success?.data[0]?.people_who_voted?.map(
      d => {
        let peopleWhoVotedIntrests = [];
        //console.log(d, 'in saga of invite friend');
        d.user_interests.map((item, index) => {
          //alert('in map', item);
          peopleWhoVotedIntrests.push({
            name: item,
            color_code: colorsArray[Math.floor(Math.random() * 7)],
          });
        });
        return {...d, user_interests: peopleWhoVotedIntrests};
      },
    );
    var t = moment
      .utc(response?.data?.success?.data[0]?.expiration_time)
      .local()
      .format('YYYY-MM-DD HH:mm:ss');
    //
    //console.log(processedData1, 'from saga peopleWhoVotedIntrests\n\n');
    //processedData1.map(d => console.log('\n\nin process data', d));
    //return;
    if(payload?.callBack){
      const votedPoll = response?.data?.success?.data[0].options?.find(item => item.voted_status == 'VOTED')
      payload.callBack(votedPoll)
    }

    yield put({
      type: HomeActions.GET_POLL_DETAIL_SUCCESS,
      payload: {
        ...response?.data?.success?.data[0],
        expiration_time:response?.data?.success?.data[0]?.expiration_time,
        poll_interests: new_payload,
        people_who_voted: processedData1,
        pollDetailLoader:false
      },
    });
    yield put({
      type: HomeActions.GET_POLL_DETAIL_FAIL,
      payload: '',
      pollDetailLoader:false,
    });
  } else {
    //console.log(response?.data?.error?.message, 'from failed');
    //return;
    yield put({
      type: HomeActions.GET_POLL_DETAIL_FAIL,
      payload: response?.data?.error?.message,
    });
    yield put({
      type: HomeActions.GET_POLL_DETAIL_SUCCESS,
      payload: {},
    });
  }
}

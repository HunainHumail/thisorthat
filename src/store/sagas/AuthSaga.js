import {put, call, select, delay} from 'redux-saga/effects';
import {AuthActions} from '../actions';
import {showToast} from '../../config/utills';
import {
  ApiCaller,
  NavigationService,
  Colors,
  NotificationService,
} from '../../config';

import {myToken} from '../../config/NotificationService';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

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

export function* signup(action) {
  const {payload} = action;
  const response = yield call(
    ApiCaller.Post,
    'signup',
    {
      ...payload,
      current_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {'content-type': 'application/json'},
  );
  //console.log(response, 'signup');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    if (payload.social_id) {
      yield put({
        type: AuthActions.SIGNUP_SUCCESS,
        payload: '',
      });
      NavigationService.navigate('SignupScreen2', {
        user_data: response.data.success.data,
      });
    } else {
      yield put({
        type: AuthActions.SIGNUP_SUCCESS,
        payload: {email: payload.email},
      });
      NavigationService.navigate('VerifyCodeScreen');
      showToast('Code has been sent to your email', 'success');
    }
  } else {
    yield put({type: AuthActions.SIGNUP_FAIL});
  }
}

export function* login(action) {
  const {payload} = action;
  //let {myToken} = yield select(fcmToken);
  //const fcmToken = 'nnn';
  console.log('device token from login saga', myToken);
  //return;
  const response = yield call(
    ApiCaller.Post,
    'login',
    {
      ...action.payload,
      current_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      device_token: myToken?.token,
    },
    {'content-type': 'application/json'},
  );
  //console.log(response, 'login');
  //Server not working for testing only below line
  // NavigationService.reset_0('Tabs');
  // return
  //end server not working
  const response_status = yield call(validateResponse, response);

  if (response_status.success) {
    if (response.data.success.data.user_interests.length > 1) {
      try {
        AsyncStorage.setItem(
          'user',
          JSON.stringify(response.data.success.data),
        );
      } catch {}
      yield put({
        type: AuthActions.LOGIN_SUCCESS,
        payload: response.data.success.data,
      });
      NavigationService.reset_0('Tabs');
    } else {
      NavigationService.navigate('SignupScreen2', {
        user_data: response.data.success.data,
      });
    }
  } else {
    if (response_status.message == 'User status unverified.') {
      //console.log(response_status.message, "from login saga in if", payload.username, 'this is username');
      yield put(
        AuthActions.resetPassword({
          email: payload.username,
          fromForgotPassword: false,
        }),
      );
      yield put({
        type: AuthActions.SIGNUP_SUCCESS,
        payload: {email: payload.username},
      });
      showToast('Code has been sent to your email', 'success');
      NavigationService.navigate('VerifyCodeScreen');
    }
    yield put({type: AuthActions.LOGIN_FAIL});
  }
}

export function* verifyCode(action) {
  const {payload} = action;
  const response = yield call(
    ApiCaller.Post,
    'verify-code',
    {
      ...action.payload,
      current_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {'content-type': 'application/json'},
  );
  //console.log(response, 'verify code');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({type: AuthActions.VERIFY_CODE_SUCCESS});
    if (payload.fromForgotPassword) {
      NavigationService.navigate('ChangePasswordScreen');
    } else {
      showToast(
        'Your email has been verified thank you for joining This or That',
        'success',
      );
      NavigationService.navigate('SignupScreen2', {
        user_data: response.data.success.data,
      });
    }
  } else {
    yield put({type: AuthActions.VERIFY_FAIL});
  }
}

export function* resetPassword(action) {
  const {payload} = action;
  const {email, fromForgotPassword} = payload;
  //console.log('from resetPassword', payload, email)
  const response = yield call(
    ApiCaller.Post,
    'reset-password-request',
    {
      //...action.payload,
      email,
      current_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {'content-type': 'application/json'},
  );
  //console.log(response, 'reset password request');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({type: AuthActions.RESET_PASSWORD_SUCCESS});
    yield put({
      type: AuthActions.SIGNUP_SUCCESS,
      payload: {email: payload.email || payload.username},
    });
    showToast('Code has been sent to your email', 'success');
    fromForgotPassword == false
      ? NavigationService.navigate('VerifyCodeScreen')
      : NavigationService.navigate('VerifyCodeScreen', {
          fromForgotPassword: true,
        });
  } else {
    yield put({type: AuthActions.RESET_PASSWORD_FAIL});
  }
}

export function* changePassword(action) {
  const {payload} = action;
  const response = yield call(
    ApiCaller.Post,
    'reset-password',
    {
      ...action.payload,
      current_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {'content-type': 'application/json'},
  );
  //console.log(response, 'change password');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({type: AuthActions.CHANGE_PASSWORD_SUCCESS});
    showToast(response.data.success.message, 'success');
    if (response.data.success.data.user_interests.length > 1) {
      try {
        AsyncStorage.setItem(
          'user',
          JSON.stringify(response.data.success.data),
        );
      } catch {}
      yield put({
        type: AuthActions.LOGIN_SUCCESS,
        payload: response.data.success.data,
      });
      //NavigationService.reset_0('Tabs');
      NavigationService.reset_0('LoginScreen');
    } else {
      NavigationService.navigate('SignupScreen2', {
        user_data: response.data.success.data,
      });
    }
  } else {
    yield put({type: AuthActions.CHANGE_PASSWORD_FAIL});
  }
}

export function* getInterests(action) {
  const {payload} = action;
  const response = yield call(ApiCaller.Get, 'get-default-interests', {
    'content-type': 'application/json',
  });
  // console.log(response, 'get interests');
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
    response.data.success.data.map((item, index) => {
      new_payload.push({
        ...item,
        color_code: colorsArray[Math.floor(Math.random() * 7)],
      });
    });
    yield put({
      type: AuthActions.GET_INTERESTS_SUCCESS,
      payload: new_payload,
    });
  } else {
    yield put({type: AuthActions.GET_INTERESTS_FAIL});
  }
}

export function* updateInterests(action) {
  const {payload} = action;
  const response = yield call(
    ApiCaller.Put,
    'update-user-interests',
    {
      ...payload,
      current_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {'content-type': 'application/json'},
  );
  //console.log(response, 'update interests');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: AuthActions.UPDATE_INTERESTS_SUCCESS,
    });
    //console.log('to save on local storage', payload.user_data);
    try {
      AsyncStorage.setItem('user', JSON.stringify(payload.user_data));
    } catch {}
    yield put({
      type: AuthActions.LOGIN_SUCCESS,
      payload: payload.user_data,
    });
    NavigationService.reset_0('Tabs');
  } else {
    yield put({type: AuthActions.UPDATE_INTERESTS_FAIL});
  }
}

export function* resendCode(action) {
  const {payload} = action;
  const response = yield call(
    ApiCaller.Post,
    'reset-password-request',
    {
      ...action.payload,
      current_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {'content-type': 'application/json'},
  );
  //console.log(response, 'resend code');
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({type: AuthActions.RESEND_CODE_SUCCESS});
    yield put({
      type: AuthActions.SIGNUP_SUCCESS,
      payload: {email: payload.email},
    });
    showToast('Code has been sent to your email', 'success');
  } else {
    yield put({type: AuthActions.RESEND_CODE_FAIL});
  }
}

export function* socialLogin(action) {
  const {payload} = action;
  console.log('payloaddd', payload);
  let new_payload = {
    device_token: myToken?.token,
    email: payload.email,
    social_id: payload.id,
    platform: payload.platform,
  };
  const response = yield call(
    ApiCaller.Post,
    'social-login',
    {
      ...new_payload,
      current_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {'content-type': 'application/json'},
  );
  //console.log(response, 'social login');
  if (response) {
    if (response.status == 200) {
      if (response.data.success.data.user_interests.length > 1) {
        try {
          AsyncStorage.setItem(
            'user',
            JSON.stringify(response.data.success.data),
          );
        } catch {}
        yield put({
          type: AuthActions.LOGIN_SUCCESS,
          payload: response.data.success.data,
        });
        NavigationService.reset_0('Tabs');
      } else {
        NavigationService.navigate('SignupScreen2', {
          user_data: response.data.success.data,
        });
      }
    } else if (response.status == 400) {
      NavigationService.navigate('SocialSignupScreen', {...payload});
    }
  } else {
    yield put({type: AuthActions.SOCIAL_LOGIN_FAIL});
  }
}

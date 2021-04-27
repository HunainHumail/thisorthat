export default class Action {
  //Constants
  static GET_TOKEN = 'GET_TOKEN';

  static SIGNUP = 'SIGNUP';
  static SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
  static SIGNUP_FAIL = 'SIGNUP_FAIL';

  static LOGIN = 'LOGIN';
  static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  static LOGIN_FAIL = 'LOGIN_FAIL';

  static VERIFY_CODE = 'VERIFY_CODE';
  static VERIFY_CODE_SUCCESS = 'VERIFY_CODE_SUCCESS';
  static VERIFY_FAIL = 'VERIFY_FAIL';

  static RESET_PASSWORD = 'RESET_PASSWORD';
  static RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
  static RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL';

  static CHANGE_PASSWORD = 'CHANGE_PASSWORD';
  static CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
  static CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';

  static GET_INTERESTS = 'GET_INTERESTS';
  static GET_INTERESTS_SUCCESS = 'GET_INTERESTS_SUCCESS';
  static GET_INTERESTS_FAIL = 'GET_INTERESTS_FAIL';

  static UPDATE_INTERESTS = 'UPDATE_INTERESTS';
  static UPDATE_INTERESTS_SUCCESS = 'UPDATE_INTERESTS_SUCCESS';
  static UPDATE_INTERESTS_FAIL = 'UPDATE_INTERESTS_FAIL';

  static RESEND_CODE = 'RESEND_CODE';
  static RESEND_CODE_SUCCESS = 'RESEND_CODE_SUCCESS';
  static RESEND_CODE_FAIL = 'RESEND_CODE_FAIL';

  static SOCIAL_LOGIN = 'SOCIAL_LOGIN';
  static SOCIAL_LOGIN_SUCCESS = 'SOCIAL_LOGIN_SUCCESS';
  static SOCIAL_LOGIN_FAIL = 'SOCIAL_LOGIN_FAIL';

  //Actions
  static getToken(payload) {
    alert('get token');
    return {
      type: Action.GET_TOKEN,
      payload,
    };
  }

  static signup(payload) {
    return {
      type: Action.SIGNUP,
      payload,
    };
  }

  static login(payload) {
    return {
      type: Action.LOGIN,
      payload,
    };
  }

  static loginSuccess(payload) {
    return {
      type: Action.LOGIN_SUCCESS,
      payload,
    };
  }

  static verifyCode(payload) {
    return {
      type: Action.VERIFY_CODE,
      payload,
    };
  }

  static resetPassword(payload) {
    return {
      type: Action.RESET_PASSWORD,
      payload,
    };
  }

  static changePassword(payload) {
    return {
      type: Action.CHANGE_PASSWORD,
      payload,
    };
  }

  static getInterests(payload) {
    return {
      type: Action.GET_INTERESTS,
      payload,
    };
  }

  static updateInterests(payload) {
    return {
      type: Action.UPDATE_INTERESTS,
      payload,
    };
  }

  static resendCode(payload) {
    return {
      type: Action.RESEND_CODE,
      payload,
    };
  }

  static socialLogin(payload) {
    return {
      type: Action.SOCIAL_LOGIN,
      payload,
    };
  }
}

import {ActionSheet} from 'native-base';

export default class Action {
  //Constants

  static GET_USER_DETAIL = 'GET_USER_DETAIL';
  static GET_USER_DETAIL_SUCCESS = 'GET_USER_DETAIL_SUCCESS';
  static GET_USER_DETAIL_FAIL = 'GET_USER_DETAIL_FAIL';

  static GET_OTHER_USER_DETAIL = 'GET_OTHER_USER_DETAIL';
  static GET_OTHER_USER_DETAIL_SUCCESS = 'GET_OTHER_USER_DETAIL_SUCCESS';
  static GET_OTHER_USER_DETAIL_FAIL = 'GET_OTHER_USER_DETAIL_FAIL';

  static GET_PENDING_REQUEST = 'GET_PENDING_REQUEST';
  static GET_PENDING_REQUEST_SUCCESS = 'GET_PENDING_REQUEST_SUCCESS';
  static GET_PENDING_REQUEST_FAIL = 'GET_PENDING_REQUEST_FAIL';

  static GET_USER_POLLS = 'GET_USER_POLLS';
  static GET_USER_POLLS_SUCCESS = 'GET_USER_POLLS_SUCCESS';
  static GET_USER_POLLS_FAIL = 'GET_USER_POLLS_FAIL';

  static GET_OTHER_USER_POLLS = 'GET_OTHER_USER_POLLS';
  static GET_OTHER_USER_POLLS_SUCCESS = 'GET_OTHER_USER_POLLS_SUCCESS';
  static GET_OTHER_USER_POLLS_FAIL = 'GET_OTHER_USER_POLLS_FAIL';

  static FRIEND_REQUEST = 'FRIEND_REQUEST';
  static FRIEND_REQUEST_SUCCESS = 'FRIEND_REQUEST_SUCCESS';
  static FRIEND_REQUEST_FAIL = 'FRIEND_REQUEST_FAIL';

  static GET_USER_FRIENDS = 'GET_USER_FRIENDS';
  static GET_USER_FRIENDS_SUCCESS = 'GET_USER_FRIENDS_SUCCESS';
  static GET_USER_FRIENDS_FAIL = 'GET_USER_FRIENDS_FAIL';

  static RESPOND_TO_REQUEST = 'RESPOND_TO_REQUEST';
  static RESPOND_TO_REQUEST_SUCCESS = 'RESPOND_TO_REQUEST_SUCCESS';
  static RESPOND_TO_REQUEST_FAIL = 'RESPOND_TO_REQUEST_FAIL';

  static EDIT_PROFILE = 'EDIT_PROFILE';
  static EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
  static EDIT_PROFILE_FAIL = 'EDIT_PROFILE_FAIL';

  //Actions
  static getUserDetail(payload) {
    return {
      type: Action.GET_USER_DETAIL,
      payload,
    };
  }

  static editProfile(payload) {
    return {
      type: Action.EDIT_PROFILE,
      payload,
    };
  }

  static respondToRequest(payload) {
    return {
      type: Action.RESPOND_TO_REQUEST,
      payload,
    };
  }

  static getPendingRequest(payload) {
    return {
      type: Action.GET_PENDING_REQUEST,
      payload,
    };
  }

  static getOtherUserDetail(payload) {
    return {
      type: Action.GET_OTHER_USER_DETAIL,
      payload,
    };
  }

  static getUserPolls(payload) {
    console.log('action profile polls');
    return {
      type: Action.GET_USER_POLLS,
      payload,
    };
  }

  static getOtherUserPolls(payload) {
    console.log('action profile polls');
    return {
      type: Action.GET_OTHER_USER_POLLS,
      payload,
    };
  }

  static getUserFriends(payload) {
    console.log('action profile polls');
    return {
      type: Action.GET_USER_FRIENDS,
      payload,
    };
  }

  static sendFriendRequest(payload) {
    return {
      type: Action.FRIEND_REQUEST,
      payload,
    };
  }
}

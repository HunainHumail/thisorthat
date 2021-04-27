export default class Action {
  //Constants
  static CREATE_POLL = 'CREATE_POLL';
  static CREATE_POLL_SUCCESS = 'CREATE_POLL_SUCCESS';
  static CREATE_POLL_FAIL = 'CREATE_POLL_FAIL';

  static GET_POLLS = 'GET_POLLS';
  static GET_POLLS_SUCCESS = 'GET_POLLS_SUCCESS';
  static GET_POLLS_FAIL = 'GET_POLLS_FAIL';

  static GET_POLL_DETAIL = 'GET_POLL_DETAIL';
  static GET_POLL_DETAIL_SUCCESS = 'GET_POLL_DETAIL_SUCCESS';
  static GET_POLL_DETAIL_FAIL = 'GET_POLL_DETAIL_FAIL';

  static EDIT_POLL = 'EDIT_POLL';
  static EDIT_POLL_SUCCESS = 'EDIT_POLL_SUCCESS';
  static EDIT_POLL_FAIL = 'EDIT_POLL_FAIL';

  static END_POLL = 'END_POLL';
  static END_POLL_SUCCESS = 'END_POLL_SUCCESS';
  static END_POLL_FAIL = 'END_POLL_FAIL';

  static REMOVE_POLL = 'REMOVE_POLL';
  static REMOVE_POLL_SUCCESS = 'REMOVE_POLL_SUCCESS';
  static REMOVE_POLL_FAIL = 'REMOVE_POLL_FAIL';

  static VOTE_POLL = 'VOTE_POLL';
  static VOTE_POLL_SUCCESS = 'VOTE_POLL_SUCCESS';
  static VOTE_POLL_FAIL = 'VOTE_POLL_FAIL';

  static HIDE_POLL = 'HIDE_POLL';
  static HIDE_POLL_SUCCESS = 'HIDE_POLL_SUCCESS';
  static HIDE_POLL_FAIL = 'HIDE_POLL_FAIL';

  static ADD_COMMENT = 'ADD_COMMENT';
  static ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
  static ADD_COMMENT_FAIL = 'ADD_COMMENT_FAIL';

  static DELETE_COMMENT = 'DELETE_COMMENT';
  static DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
  static DELETE_COMMENT_FAIL = 'DELETE_COMMENT_FAIL';

  static UPDATE_PASSWORD = 'UPDATE_PASSWORD';
  static UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
  static UPDATE_PASSWORD_FAIL = 'UPDATE_PASSWORD_FAIL';

  //Actions
  static createPoll(payload) {
    return {
      type: Action.CREATE_POLL,
      payload,
    };
  }

  static updatePassword(payload) {
    return {
      type: Action.UPDATE_PASSWORD,
      payload,
    };
  }

  static getPolls(payload) {
    return {
      type: Action.GET_POLLS,
      payload,
    };
  }

  static hidePoll(payload) {
    return {
      type: Action.HIDE_POLL,
      payload,
    };
  }

  static editPoll(payload) {
    return {
      type: Action.EDIT_POLL,
      payload,
    };
  }

  static endPoll(payload) {
    return {
      type: Action.END_POLL,
      payload,
    };
  }

  static removePoll(payload) {
    return {
      type: Action.REMOVE_POLL,
      payload,
    };
  }

  static votePoll(payload) {
    return {
      type: Action.VOTE_POLL,
      payload,
    };
  }

  static addComment(payload) {
    return {
      type: Action.ADD_COMMENT,
      payload,
    };
  }

  static deleteComment(payload) {
    return {
      type: Action.DELETE_COMMENT,
      payload,
    };
  }

  static getPollDetail(payload) {
    return {
      type: Action.GET_POLL_DETAIL,
      payload,
    };
  }
}

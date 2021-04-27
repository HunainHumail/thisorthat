// Imports: Dependencies
import {all, takeEvery, take} from 'redux-saga/effects';

// Imports: Actions
import {
  HomeActions,
  AuthActions,
  ProfileActions,
  SearchActions,
  NotificationActions,
} from '../actions/';

// Imports: Redux Sagas
import {
  signup,
  login,
  verifyCode,
  resetPassword,
  changePassword,
  getInterests,
  updateInterests,
  resendCode,
  socialLogin,
} from './AuthSaga';
import {
  createPoll,
  getPolls,
  getPollDetail,
  editPoll,
  endPoll,
  removePoll,
  votePoll,
  addComment,
  deleteComment,
  updatePassword,
  hidePoll,
} from './HomeSaga';
import {
  getOtherUserDetail,
  getUserDetail,
  getUserPolls,
  getOtherUserPolls,
  sendFriendRequest,
  getUserFriends,
  getPendingRequest,
  respondToRequest,
  editProfile,
} from './ProfileSaga';
import {searchPolls} from './SearchSaga';
import {getNotifications} from './NotificationSaga';
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    //sagas will go here
    takeEvery(AuthActions.SIGNUP, signup),
    takeEvery(AuthActions.LOGIN, login),
    takeEvery(AuthActions.VERIFY_CODE, verifyCode),
    takeEvery(AuthActions.RESET_PASSWORD, resetPassword),
    takeEvery(AuthActions.CHANGE_PASSWORD, changePassword),
    takeEvery(AuthActions.GET_INTERESTS, getInterests),
    takeEvery(AuthActions.UPDATE_INTERESTS, updateInterests),
    takeEvery(AuthActions.RESEND_CODE, resendCode),
    takeEvery(HomeActions.CREATE_POLL, createPoll),
    takeEvery(HomeActions.GET_POLLS, getPolls),
    takeEvery(HomeActions.GET_POLL_DETAIL, getPollDetail),
    takeEvery(HomeActions.EDIT_POLL, editPoll),
    takeEvery(HomeActions.HIDE_POLL, hidePoll),
    takeEvery(HomeActions.END_POLL, endPoll),
    takeEvery(HomeActions.REMOVE_POLL, removePoll),
    takeEvery(HomeActions.VOTE_POLL, votePoll),
    takeEvery(HomeActions.ADD_COMMENT, addComment),
    takeEvery(HomeActions.DELETE_COMMENT, deleteComment),
    takeEvery(HomeActions.UPDATE_PASSWORD, updatePassword),
    takeEvery(AuthActions.SOCIAL_LOGIN, socialLogin),
    takeEvery(ProfileActions.GET_USER_DETAIL, getUserDetail),
    takeEvery(ProfileActions.GET_USER_POLLS, getUserPolls),
    takeEvery(ProfileActions.GET_OTHER_USER_POLLS, getOtherUserPolls),
    takeEvery(ProfileActions.GET_OTHER_USER_DETAIL, getOtherUserDetail),
    takeEvery(ProfileActions.FRIEND_REQUEST, sendFriendRequest),
    takeEvery(ProfileActions.GET_USER_FRIENDS, getUserFriends),
    takeEvery(ProfileActions.GET_PENDING_REQUEST, getPendingRequest),
    takeEvery(ProfileActions.RESPOND_TO_REQUEST, respondToRequest),
    takeEvery(ProfileActions.EDIT_PROFILE, editProfile),
    takeEvery(SearchActions.SEARCH_POLLS, searchPolls),
    takeEvery(NotificationActions.GET_NOTIFICATIONS, getNotifications),
  ]);
}

export default class Action {
  //Constants

  static GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
  static GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
  static GET_NOTIFICATIONS_FAIL = 'GET_NOTIFICATIONS_FAIL';

  //Actions


  static getNotifications(payload) {
    return {
      type: Action.GET_NOTIFICATIONS,
      payload,
    };
  }
}

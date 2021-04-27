export default class Action {
  //Constants
  static UPDATE_TABSTACK = 'UPDATE_TABSTACK';

  //Actions
  static updateTabStack(payload) {
    return {
      type: Action.UPDATE_TABSTACK,
      payload,
    };
  }
}

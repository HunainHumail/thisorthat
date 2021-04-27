export default class Action {
  //Constants

  static SEARCH_POLLS = 'SEARCH_POLLS';
  static SEARCH_POLLS_SUCCESS = 'SEARCH_POLLS_SUCCESS';
  static SEARCH_POLLS_FAIL = 'SEARCH_POLLS_FAIL';

  //Actions


  static searchPolls(payload) {
    return {
      type: Action.SEARCH_POLLS,
      payload,
    };
  }
}

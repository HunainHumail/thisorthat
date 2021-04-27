import {NotificationActions} from '../actions';
const INITIAL_STATE = {
  isLoading: true,
  notifications: [],
};

function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NotificationActions.GET_NOTIFICATIONS:
      return {
        ...state,
        isLoading: action?.payload?.dontRunLoader ? false : true,
      };
    case NotificationActions.GET_NOTIFICATIONS_SUCCESS:
      return {...state, notifications: action.payload, isLoading: false};
    case NotificationActions.GET_NOTIFICATIONS_FAIL:
      return {...state, isLoading: false};

    default:
      return state;
  }
}

export default Reducer;

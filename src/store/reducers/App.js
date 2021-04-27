import {AppActions} from '../actions/';
const INITIAL_STATE = {
  tabstack: false,
  currentRoute: '',
};

function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AppActions.UPDATE_TABSTACK:
      if (action.payload.tabstack) {
        return {
          ...state,
          tabstack: true,
          currentRoute: action.payload.routeName,
        };
      } else {
        return {
          ...state,
          tabstack: false,
          currentRoute: action.payload.routeName,
        };
      }
    default:
      return state;
  }
}

export default Reducer;

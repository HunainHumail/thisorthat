import { SearchActions } from '../actions/';
const INITIAL_STATE = {
  isLoading: false,
  polls: [],
};

function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SearchActions.SEARCH_POLLS:
      return { ...state, isLoading: true };
    case SearchActions.SEARCH_POLLS_SUCCESS:
      return { ...state, polls: action.payload, isLoading: false };
    case SearchActions.SEARCH_POLLS_FAIL:
      return { ...state, isLoading: false };


    default:
      return state;
  }
}

export default Reducer;

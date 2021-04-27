import { HomeActions } from '../actions/';
const INITIAL_STATE = {
  isLoading: false,
  isLoadingPoll: false,
  isLoadingComment: false,
  isLoadingCommentRemove: false,
  pollDetailLoader: false,
  polls: [],
  pollDetail: {},
  errorMessage: '',
};

function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HomeActions.CREATE_POLL:
      return { ...state, isLoading: true };
    case HomeActions.CREATE_POLL_SUCCESS:
      return { ...state, isLoading: false };
    case HomeActions.CREATE_POLL_FAIL:
      return { ...state, isLoading: false };

    case HomeActions.GET_POLLS:
      return { ...state, isLoading: true };
    case HomeActions.GET_POLLS_SUCCESS:
      return { ...state, polls: action.payload, isLoading: false };
    case HomeActions.GET_POLLS_FAIL:
      return { ...state, isLoading: false };

    case HomeActions.GET_POLL_DETAIL:
      //alert(action.payload?.dontRunLoader)
      return { ...state, isLoading: action.payload?.dontRunLoader ? false : true, pollDetailLoader: true };
    case HomeActions.GET_POLL_DETAIL_SUCCESS:
      return { ...state, pollDetail: action.payload, isLoading: false, pollDetailLoader: false };
    case HomeActions.GET_POLL_DETAIL_FAIL:
      return { ...state, errorMessage: action.payload, isLoading: false, pollDetailLoader: false };

    case HomeActions.EDIT_POLL:
      return { ...state, isLoading: true };
    case HomeActions.EDIT_POLL_SUCCESS:
      return { ...state, isLoading: false };
    case HomeActions.EDIT_POLL_FAIL:
      return { ...state, isLoading: false };

    case HomeActions.END_POLL:
      return { ...state, isLoadingPoll: true };
    case HomeActions.END_POLL_SUCCESS:
      return { ...state, isLoadingPoll: false };
    case HomeActions.END_POLL_FAIL:
      return { ...state, isLoadingPoll: false };

    case HomeActions.HIDE_POLL:
      return { ...state, isLoading: true };
    case HomeActions.HIDE_POLL_SUCCESS:
      return { ...state, isLoading: false };
    case HomeActions.HIDE_POLL_FAIL:
      return { ...state, isLoading: false };

    case HomeActions.REMOVE_POLL:
      return { ...state, isLoadingPoll: true };
    case HomeActions.REMOVE_POLL_SUCCESS:
      return { ...state, isLoadingPoll: false };
    case HomeActions.REMOVE_POLL_FAIL:
      return { ...state, isLoadingPoll: false };

    case HomeActions.VOTE_POLL:
      return { ...state, isLoadingPoll: true };
    case HomeActions.VOTE_POLL_SUCCESS:
      return { ...state, isLoadingPoll: false };
    case HomeActions.VOTE_POLL_FAIL:
      return { ...state, isLoadingPoll: false };

    case HomeActions.ADD_COMMENT:
      return { ...state, isLoadingComment: true };
    case HomeActions.ADD_COMMENT_SUCCESS:
      return { ...state, isLoadingComment: false };
    case HomeActions.ADD_COMMENT_FAIL:
      return { ...state, isLoadingComment: false };

    case HomeActions.DELETE_COMMENT:
      return { ...state, isLoadingComment: true };
    case HomeActions.DELETE_COMMENT_SUCCESS:
      return { ...state, isLoadingComment: false };
    case HomeActions.DELETE_COMMENT_FAIL:
      return { ...state, isLoadingComment: false };

    case HomeActions.UPDATE_PASSWORD:
      return { ...state, isLoading: true };
    case HomeActions.UPDATE_PASSWORD_SUCCESS:
      return { ...state, isLoading: false };
    case HomeActions.UPDATE_PASSWORD_FAIL:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}

export default Reducer;

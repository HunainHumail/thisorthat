import { ProfileActions } from '../actions/';
const INITIAL_STATE = {
  isLoading: true,
  userDetail: {},
  otherUserDetail: {},
  userPolls: [],
  userFriends: [],
  otherUserPolls: [],
  message: '',
  isLoadingRequest: false,
  pendingRequest: [],
  isLoadingFriendRequest: false,
  isLoadingUserPoll: false
};

function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ProfileActions.GET_USER_DETAIL:
      return { ...state, isLoading: true };
    case ProfileActions.GET_USER_DETAIL_SUCCESS:
      return { ...state, userDetail: action.payload, isLoading: false };
    case ProfileActions.GET_USER_DETAIL_FAIL:
      return { ...state, isLoading: false };

    case ProfileActions.RESPOND_TO_REQUEST:
      return { ...state, isLoading: true };
    case ProfileActions.RESPOND_TO_REQUEST_SUCCESS:
      return { ...state, isLoading: false };
    case ProfileActions.RESPOND_TO_REQUEST_FAIL:
      return { ...state, isLoading: false };

    case ProfileActions.GET_OTHER_USER_DETAIL:
      return { ...state, isLoading: true };
    case ProfileActions.GET_OTHER_USER_DETAIL_SUCCESS:
      return { ...state, otherUserDetail: action.payload, isLoading: false };
    case ProfileActions.GET_OTHER_USER_DETAIL_FAIL:
      return { ...state, isLoading: false };

    case ProfileActions.GET_USER_POLLS:
      return { ...state, isLoadingUserPoll: true };
    case ProfileActions.GET_USER_POLLS_SUCCESS:
      return { ...state, userPolls: action.payload, isLoadingUserPoll: false };
    case ProfileActions.GET_USER_POLLS_FAIL:
      return { ...state, isLoadingUserPoll: false };

    case ProfileActions.EDIT_PROFILE:
      return { ...state, isLoading: true };
    case ProfileActions.EDIT_PROFILE_SUCCESS:
      return { ...state, isLoading: false };
    case ProfileActions.EDIT_PROFILE_FAIL:
      return { ...state, isLoading: false };

    case ProfileActions.GET_OTHER_USER_POLLS:
      return { ...state, isLoadingUserPoll: true };
    case ProfileActions.GET_OTHER_USER_POLLS_SUCCESS:
      return { ...state, otherUserPolls: action.payload, isLoadingUserPoll: false };
    case ProfileActions.GET_OTHER_USER_POLLS_FAIL:
      return { ...state, isLoadingUserPoll: false };

    case ProfileActions.FRIEND_REQUEST:
      return { ...state, isLoading: true };
    case ProfileActions.FRIEND_REQUEST_SUCCESS:
      return { ...state, message: action.payload, isLoading: false };
    case ProfileActions.FRIEND_REQUEST_FAIL:
      return { ...state, isLoading: false };

    case ProfileActions.GET_USER_FRIENDS:
      return { ...state, isLoading: true };
    case ProfileActions.GET_USER_FRIENDS_SUCCESS:
      return { ...state, userFriends: action.payload, isLoading: false };
    case ProfileActions.GET_USER_FRIENDS_FAIL:
      return { ...state, isLoading: false };

    case ProfileActions.GET_PENDING_REQUEST:
      return { ...state, isLoading: true };
    case ProfileActions.GET_PENDING_REQUEST_SUCCESS:
      return {
        ...state,
        pendingRequest: action.payload,
        isLoading: false,
      };
    case ProfileActions.GET_PENDING_REQUEST_FAIL:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}

export default Reducer;

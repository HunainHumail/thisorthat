import {AuthActions} from '../actions/';
const INITIAL_STATE = {
  isLoading: false,
  buttonLoading: false,
  signupData: {},
  user: {},
  interests: [],
  token: '',
};

function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AuthActions.GET_TOKEN:
      return {...state, token: action.payload};
    case AuthActions.SIGNUP:
      return {...state, isLoading: true};
    case AuthActions.SIGNUP_SUCCESS:
      return {...state, signupData: action.payload, isLoading: false};
    case AuthActions.SIGNUP_FAIL:
      return {...state, isLoading: false};

    case AuthActions.LOGIN:
      return {...state, isLoading: true};
    case AuthActions.LOGIN_SUCCESS:
      return {...state, user: action.payload, isLoading: false};
    case AuthActions.LOGIN_FAIL:
      return {...state, isLoading: false};

    case AuthActions.VERIFY_CODE:
      return {...state, isLoading: true};
    case AuthActions.VERIFY_CODE_SUCCESS:
      return {...state, isLoading: false};
    case AuthActions.VERIFY_FAIL:
      return {...state, isLoading: false};

    case AuthActions.CHANGE_PASSWORD:
      return {...state, isLoading: true};
    case AuthActions.CHANGE_PASSWORD_SUCCESS:
      return {...state, isLoading: false};
    case AuthActions.CHANGE_PASSWORD_FAIL:
      return {...state, isLoading: false};

    case AuthActions.RESET_PASSWORD:
      return {...state, isLoading: true};
    case AuthActions.RESET_PASSWORD_SUCCESS:
      return {...state, signupData: action.payload, isLoading: false};
    case AuthActions.RESET_PASSWORD_FAIL:
      return {...state, isLoading: false};

    case AuthActions.GET_INTERESTS:
      return {...state, interests: [], isLoading: true};
    case AuthActions.GET_INTERESTS_SUCCESS:
      return {...state, interests: action.payload, isLoading: false};
    case AuthActions.GET_INTERESTS_FAIL:
      return {...state, isLoading: false};

    case AuthActions.UPDATE_INTERESTS:
      return {...state, buttonLoading: true};
    case AuthActions.UPDATE_INTERESTS_SUCCESS:
      return {...state, buttonLoading: false};
    case AuthActions.UPDATE_INTERESTS_FAIL:
      return {...state, buttonLoading: false};
    default:
      return state;
  }
}

export default Reducer;

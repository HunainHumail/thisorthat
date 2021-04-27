import { combineReducers } from 'redux';

// imports: Reducers
import AuthReducer from './Auth';
import AppReducer from './App';
import HomeReducer from './Home';
import ProfileReducer from './Profile';
import SearchReducer from './Search';
import NotificationReducer from './Notification';

// Redux: Root Reducer
const rootReducer = combineReducers({
  //reducers will go here
  Auth: AuthReducer,
  App: AppReducer,
  Home: HomeReducer,
  Profile: ProfileReducer,
  Search: SearchReducer,
  Notification: NotificationReducer
});

// exports
export default rootReducer;

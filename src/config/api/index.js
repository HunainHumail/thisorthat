import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationService } from '../../config';

//var baseUrl = 'https://thisorthat.5stardesigners.net/thisorthat_dev/api/';
var baseUrl = 'https://thisorthat.5stardesigners.net/thisorthat_uat/api/';


var cityApiBaseUrl = 'https://autocomplete.travelpayouts.com/';
// UAT base URL

Axios.interceptors.response.use(
  response => {
    return response;
  },
  response => {
    if (response.response.status == 401) {
      try {
        AsyncStorage.removeItem('user').then(() => {
          // Store.dispatch(AuthActions.emptyState());
          NavigationService.reset_0('IntroScreen');
        });
      } catch (err) { }
    }
    return response.response;
  },
);

export default class ApiCaller {
  static Get = (url = '', headers = {}, isThirdPartyApi = false) => {
    console.log('get from api caller', url);

    return Axios.get(`${isThirdPartyApi ? cityApiBaseUrl : baseUrl}${url}`, {
      headers: { 'Content-Type': 'application/json', ...headers },
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Post = async (endPoint = '', body = {}, headers = {}) => {
    console.log('from api caller', endPoint, 'body', body);
    return Axios.post(`${baseUrl}${endPoint}`, body, {
      headers: { ...headers },
    })
      .then(res => res)
      .catch(err => err);
  };

  static Put = (url = '', body = {}, headers = {}) => {
    return Axios.put(`${baseUrl}${url}`, body, {
      headers: { 'Content-Type': 'application/json', ...headers },
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Patch = (url = '', body = {}, headers = {}) => {
    return Axios.patch(`${baseUrl}${url}`, body, {
      headers: { 'Content-Type': 'application/json', ...headers },
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Delete = (url = '', body = {}, headers = {}) => {
    return Axios.delete(`${baseUrl}${url}`, {
      headers: { ...headers },
      data: body,
    })
      .then(res => res)
      .catch(err => err.response);
  };
}

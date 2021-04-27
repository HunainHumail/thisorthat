import { Toast } from 'native-base';
import Colors from '../colors';
import Fonts from '../fonts';

const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){8,16}$/;
const emailRegex = /^\w+([\.-]?\w+)*@{1}\w+([\.-]?\w+)*(\.[a-zA-Z]{2,3})+$/;
const fullNameRegex = /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/;
const phoneNoRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const cityRegex = /^([^0-9]*)$/;
const newFullNameRegex = /^[\w\s]{4,20}$/
const pollTitleRegex = /^[\w\s]{3,50}$/
export function validatePassword(password) {
  return passwordRegex.test(password);
}
export function validatePhoneNumber(phone) {
  return phoneNoRegex.test(phone);
}
export function validateEmail(email) {
  return emailRegex.test(email);
}

export function validateAlpha(name) {
  return fullNameRegex.test(name);

}

export function validateFullName(name) {

  //return fullNameRegex.test(name);
  return newFullNameRegex.test(name);
}
export function validateTitle(name) {

  //return fullNameRegex.test(name);
  return pollTitleRegex.test(name);
}

export function validateCity(name) {
  return cityRegex.test(name);
}

export function showToast(message, type = 'danger') {
  Toast.show({
    text: message,
    position: 'bottom',
    type,
    textStyle: { fontFamily: Fonts['Poppins-Regular'], textAlign: 'center' },
    duration: 3000,
  });
}

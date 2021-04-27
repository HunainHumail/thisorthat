import {
  SignupScreen,
  VerifyCodeScreen,
  SignupScreen2,
  ResetPasswordScreen,
  ChangePasswordScreen,
  LoginScreen,
  SocialSignupScreen,
} from '../containers';

export const AuthStack = [
  {
    name: 'SignupScreen',
    component: SignupScreen,
    key: 'SignupScreen',
  },
  {
    name: 'VerifyCodeScreen',
    component: VerifyCodeScreen,
    key: 'VerifyCodeScreen',
  },
  {
    name: 'SignupScreen2',
    component: SignupScreen2,
    key: 'SignupScreen2',
  },
  {
    name: 'ResetPasswordScreen',
    component: ResetPasswordScreen,
    key: 'ResetPasswordScreen',
  },
  {
    name: 'ChangePasswordScreen',
    component: ChangePasswordScreen,
    key: 'ChangePasswordScreen',
  },
  {
    name: 'LoginScreen',
    component: LoginScreen,
    key: 'LoginScreen',
  },
  {
    name: 'SocialSignupScreen',
    component: SocialSignupScreen,
    key: 'SocialSignupScreen',
  },
];

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Metrix, Colors, Images, Fonts, NavigationService } from '../../config';
import { validateEmail, showToast } from '../../config/utills';
import { TTButton, BackHeader } from '../../components/';
import { AuthActions } from '../../store/actions';
import { connect } from 'react-redux';

const LoginScreen = props => {
  let loginData = {
    email: '',
    password: '',
  };
  const [login_data, updateState] = useState(loginData);
  const [hidden, setHidden] = useState(true);
  const [email_valid, setEmailValid] = useState(true);
  const [password_valid, setPasswordValid] = useState(true);

  const togglePassword = () => {
    setHidden(!hidden);
  };

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const login = () => {
    const { email, password } = login_data;
    if (email && password) {
      // if (validateEmail(email)) {
      props.login({ username: email, password: password });
      // } else {
      //   showToast('Please enter valid email address');
      // }
    } else {
      if (!email) setEmailValid(false)
      if (!password) setPasswordValid(false)
      showToast('Required fields cannot be left empty');
    }
  };

  const staric = (styles) => {
    return (
      <Text style={{ color: Colors.Danger, fontSize: Metrix.FontLarge, ...styles }}>*</Text>
    )
  }

  return (
    <>
      <BackHeader text={'Login to your account'} onPress={() => NavigationService.navigate('IntroScreen')} />
      <ScrollView>
        <View
          style={{
            backgroundColor: Colors.AppBackgroud,
            width: Metrix.HorizontalSize(),
          }}>
          <View
            style={{
              paddingHorizontal: Metrix.HorizontalSize(31),
            }}>
            <View
              style={{
                width: Metrix.HorizontalSize(311),
                height: Metrix.VerticalSize(100),
                borderRadius: Metrix.Radius,
                ...Metrix.createShadow(),
                marginTop: Metrix.VerticalSize(120),
              }}>
              <View
                style={{
                  height: Metrix.VerticalSize(50),
                  paddingLeft: Metrix.HorizontalSize(10),
                  borderBottomColor: Colors.Primary,
                  borderBottomWidth: Metrix.VerticalSize(1),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: Metrix.HorizontalSize(24),
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: Metrix.VerticalSize(24),
                    marginTop: Metrix.VerticalSize(2),
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: '90%',
                      width: '70%',
                    }}
                    source={Images.EmailIcon}
                  />
                </View>
                <TextInput
                  style={{
                    height: Metrix.VerticalSize(55),
                    width: Metrix.HorizontalSize(260),
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(13),
                    marginTop: Metrix.VerticalSize(5),
                    marginLeft: Metrix.HorizontalSize(3),
                  }}
                  placeholder={'Email/Username'}
                  placeholderTextColor={Colors.TextLight}
                  autoCapitalize={'none'}
                  keyboardType="email-address"
                  value={login_data.email}
                  onChangeText={email => {
                    setEmailValid(true)
                    updateState({ ...login_data, email: email })
                  }}
                />
                {!email_valid && staric()}
              </View>
              <View
                style={{
                  height: Metrix.VerticalSize(50),
                  paddingLeft: Metrix.HorizontalSize(10),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: Metrix.HorizontalSize(24),
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: Metrix.VerticalSize(24),
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: '85%',
                      width: '85%',
                    }}
                    source={Images.LockIcon}
                  />
                </View>
                <TextInput
                  style={{
                    height: Metrix.VerticalSize(55),
                    width: Metrix.HorizontalSize(password_valid ? 240 : 230),
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(13),
                    marginTop: Metrix.VerticalSize(7),
                    marginLeft: Metrix.HorizontalSize(3),
                  }}
                  placeholder={'Password'}
                  placeholderTextColor={Colors.TextLight}
                  value={login_data.password}
                  secureTextEntry={hidden}
                  autoCapitalize={'none'}
                  onChangeText={password => {
                    setPasswordValid(true)
                    updateState({ ...login_data, password: password })
                  }}
                />
                <TouchableOpacity onPress={() => togglePassword()}>
                  <Text
                    style={{
                      fontFamily: Fonts['Poppins-Italic'],
                      color: Colors.Primary,
                      fontSize: Metrix.FontExtraSmall,
                      paddingTop: Metrix.VerticalSize(5),
                    }}>
                    {hidden ? 'show' : 'hide'}
                  </Text>
                </TouchableOpacity>
                {!password_valid && staric({ paddingLeft: Metrix.HorizontalSize(3) })}
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: Metrix.VerticalSize(35),
            }}>
            <TouchableOpacity
              onPress={() =>
                NavigationService.navigate('ResetPasswordScreen', {
                  fromForgotPassword: true,
                })
              }>
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Medium'],
                  color: Colors.Primary,
                  fontSize: Metrix.FontSmall,
                }}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: Metrix.VerticalSize(380),
              marginBottom: Metrix.VerticalSize(55),
            }}>
            <TTButton
              text={'Continue'}
              onPress={login}
              isLoading={props.isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.Auth.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(AuthActions.login(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);

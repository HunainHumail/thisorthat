import React, { Component, useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Alert,
  Linking
} from 'react-native';
import { Metrix, Colors, Images, Fonts, NavigationService } from '../../config';
import {
  validatePassword,
  validateEmail,
  validateAlpha,
  validateFullName,
  showToast,
} from '../../config/utills';
import { TTButton, BackHeader } from '../../components/';
import { Icon } from 'native-base';
import SwitchToggle from 'react-native-switch-toggle';
import { AuthActions } from '../../store/actions';
import { connect } from 'react-redux';


const SignupScreen = ({ props, onChangeDetails, goBack }) => {
  let signupData = {
    full_name: '',
    user_name: '',
    email: '',
    password: '',
  };

  const [signup_data, updateState] = useState(signupData);
  const [hidden, setHidden] = useState(true);
  const [specialChar, setSpecialChar] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [full_name_valid, setFullNameValid] = useState(true)
  const [user_name_valid, setUserNameValid] = useState(true)
  const [email_valid, setEmailValid] = useState(true)
  const [password_valid, setPasswordValid] = useState(true)
  const [number, setNumber] = useState(false)
  const [passLength, setPassLength] = useState(false)


  const togglePassword = () => {
    setHidden(!hidden);
  };

  const checkPassword = pass => {
    if (pass != '') {
      let format = /^[A-Za-z0-9 ]+$/;
      let is_valid = format.test(pass);
      if (!is_valid) {
        setSpecialChar(true);
      } else {
        setSpecialChar(false);
      }
    }
  };

  const checkSpecialChar = pass => {
    let format = /[A-Z]/;
    let is_valid = format.test(pass);
    if (is_valid) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
    }
  };

  const checkNumber = pass => {
    let format = /[0-9]/;
    let is_valid = format.test(pass);
    if (is_valid) {
      setNumber(true);
    } else {
      setNumber(false);
    }
  }

  const checkLength = pass =>{
    if(pass.length > 7){
      setPassLength(true)
    } else{
      setPassLength(false)
    }
  }
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const signup = () => {
    const { full_name, user_name, email, password } = signup_data;
    //console.log('sign up datat', signup_data);
    if (full_name && user_name && email && password) {
      if (validateEmail(email)) {
        if (validatePassword(password)) {
          if (validateFullName(full_name)) {
            if (full_name.length >= 4 && full_name.length <= 20) {
              if (user_name.length >= 3 && user_name.length <= 20) {
                if (toggle) {
                  let payload = {
                    username: user_name,
                    full_name,
                    email,
                    password,
                    device_token: '',
                  };
                  props.signup(payload);
                } else {
                  showToast('You must accept terms & conditions to continue');
                }
              } else {
                showToast(
                  'Username can be 3 to 20 characters long and can include numbers only',
                );
              }
            } else {
              showToast(
                'Full Name can be 4 to 20 characters long and can include spaces and numbers',
              );
            }
          } else {
            showToast(
              'Full Name can be 4 to 20 characters long and can include spaces and numbers',
            );
          }
        } else {
          showToast(
            'The password must contain 8 to 16 characters, one Capital letter, one number and special character.',
          );
        }
      } else {
        showToast('Please enter valid email address');
      }
    } else {
      if (!full_name) setFullNameValid(false);
      if (!user_name) setUserNameValid(false);
      if (!email) setEmailValid(false);
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
      <BackHeader text={'Create new account'} onPress={goBack} />
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
                height: Metrix.VerticalSize(390),
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
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: '85%',
                      width: '85%',
                    }}
                    source={Images.PersonIcon}
                  />
                </View>
                <TextInput
                  style={{
                    height: Metrix.VerticalSize(55),
                    width: Metrix.HorizontalSize(260),
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(13),
                    marginTop: Metrix.VerticalSize(7),
                    marginLeft: Metrix.HorizontalSize(3),
                  }}
                  placeholder={'Full Name'}
                  placeholderTextColor={Colors.TextLight}
                  value={signup_data.full_name}
                  onChangeText={full_name => {
                    setFullNameValid(true)
                    updateState({ ...signup_data, full_name: full_name })
                    onChangeDetails({ ...signup_data, full_name: full_name })
                  }
                  }
                />
                {!full_name_valid && staric()}
              </View>
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
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: '85%',
                      width: '85%',
                    }}
                    source={Images.PricetagIcon}
                  />
                </View>
                <TextInput
                  style={{
                    height: Metrix.VerticalSize(55),
                    width: Metrix.HorizontalSize(260),
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(13),
                    marginTop: Metrix.VerticalSize(7),
                    marginLeft: Metrix.HorizontalSize(3),
                  }}
                  placeholder={'Username'}
                  placeholderTextColor={Colors.TextLight}
                  autoCapitalize={'none'}
                  value={signup_data.user_name}
                  onChangeText={user_name => {
                    setUserNameValid(true)
                    updateState({ ...signup_data, user_name: user_name })
                    onChangeDetails({ ...signup_data, user_name: user_name })
                  }}
                />
                {!user_name_valid && staric()}
              </View>
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
                      height: '100%',
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
                  placeholder={'Email'}
                  placeholderTextColor={Colors.TextLight}
                  autoCapitalize={'none'}
                  keyboardType="email-address"
                  value={signup_data.email}
                  onChangeText={email => {
                    setEmailValid(true)
                    updateState({ ...signup_data, email: email })
                    onChangeDetails({ ...signup_data, email: email })
                  }}
                />
                {!email_valid && staric()}
              </View>
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
                  value={signup_data.password}
                  secureTextEntry={hidden}
                  autoCapitalize={'none'}
                  onChangeText={password => {
                    setPasswordValid(true)
                    updateState(
                      { ...signup_data, password: password },
                      checkPassword(password),
                      checkSpecialChar(password),
                      checkNumber(password),
                      checkLength(password)
                    )
                    onChangeDetails({ ...signup_data, password: password })
                  }}
                />
                <TouchableOpacity onPress={() => togglePassword()}>
                  <Text
                    style={{
                      fontFamily: Fonts['Poppins-Italic'],
                      color: Colors.Primary,
                      fontSize: Metrix.FontExtraSmall,
                      paddingTop: Metrix.VerticalSize(4),
                    }}>
                    {hidden ? 'show' : 'hide'}
                  </Text>
                </TouchableOpacity>
                {!password_valid && staric({ paddingLeft: Metrix.HorizontalSize(3) })}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: Metrix.VerticalSize(45),
                  paddingLeft: Metrix.HorizontalSize(15),
                }}>
                <Icon
                  name="checkmark"
                  style={[
                    {
                      fontSize: Metrix.customFontSize(20),
                    },
                    passLength
                      ? { color: 'green' }
                      : { color: Colors.TagFontColor },
                  ]}
                />
                <Text
                  style={{
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(13),
                    color: Colors.TextLight,
                    marginLeft: Metrix.HorizontalSize(12),
                  }}>
                  8+ Characters
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: Metrix.VerticalSize(45),
                  paddingLeft: Metrix.HorizontalSize(15),
                }}>
                <Icon
                  name="checkmark"
                  style={[
                    {
                      fontSize: Metrix.customFontSize(20),
                    },
                    upperCase ? { color: 'green' } : { color: Colors.TagFontColor },
                  ]}
                />
                <Text
                  style={{
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(13),
                    color: Colors.TextLight,
                    marginLeft: Metrix.HorizontalSize(12),
                  }}>
                  1 uppercase
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: Metrix.VerticalSize(45),
                  paddingLeft: Metrix.HorizontalSize(15),
                }}>
                <Icon
                  name="checkmark"
                  style={[
                    {
                      fontSize: Metrix.customFontSize(20),
                      color: Colors.TextLight,
                    },
                    specialChar
                      ? { color: 'green' }
                      : { color: Colors.TagFontColor },
                  ]}
                />
                <Text
                  style={{
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(13),
                    color: Colors.TextLight,
                    marginLeft: Metrix.HorizontalSize(12),
                  }}>
                  1 special character
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: Metrix.VerticalSize(45),
                  paddingLeft: Metrix.HorizontalSize(15),
                }}>
                <Icon
                  name="checkmark"
                  style={[
                    {
                      fontSize: Metrix.customFontSize(20),
                      color: Colors.TextLight,
                    },
                    number
                      ? { color: 'green' }
                      : { color: Colors.TagFontColor },
                  ]}
                />
                <Text
                  style={{
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(13),
                    color: Colors.TextLight,
                    marginLeft: Metrix.HorizontalSize(12),
                  }}>
                  1 number
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: Metrix.VerticalSize(25),
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontFamily: Fonts['Poppins-Medium'],
                    color: Colors.TextLight,
                    fontSize: Metrix.FontSmall,
                  }}>
                  I agree with
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL("http://www.thisorthatapp.net/terms-conditions/")}>
                  <Text
                    style={{
                      fontFamily: Fonts['Poppins-Medium'],
                      color: Colors.TextLight,
                      fontSize: Metrix.FontSmall,
                      color: Colors.Primary,
                    }}>
                    {' '}
                    Terms & Conditions
                  </Text>
                </TouchableOpacity>
              </View>

              <SwitchToggle
                containerStyle={{
                  width: Metrix.HorizontalSize(40),
                  height: Metrix.VerticalSize(20),
                  borderRadius: 25,
                  backgroundColor: '#ccc',
                  padding: 2,
                }}
                circleStyle={{
                  width: 12,
                  height: 12,
                  borderRadius: 50,
                  backgroundColor: '#4EF892',
                }}
                switchOn={toggle}
                backgroundColorOn={Colors.Primary}
                circleColorOn={Colors.White}
                backgroundColorOff={Colors.Secondary}
                circleColorOff={Colors.White}
                onPress={toggleHandler}
              />
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: Metrix.VerticalSize(110),
              marginBottom: Metrix.VerticalSize(55),
            }}>
            <TTButton
              text={'Continue'}
              onPress={() => {
                signup();
              }}
              isLoading={props.isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

class SignUpScreen extends Component {
  constructor() {
    super()
    this.state = {
      full_name: '',
      user_name: '',
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.checkChanges)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.checkChanges)
  }

  checkChanges = () => {
    const { full_name, user_name, email, password } = this.state;
    if (full_name || user_name || email || password) {
      Alert.alert(
        "",
        `Are you sure you want to discard changes?`,
        [{
          text: "Yes",
          onPress: () => {
            NavigationService.goBack()
          },
        },
        {
          text: "No",
        }]
      )
      return true
    }
    else return false
  }

  goBack = () => {
    if (!this.checkChanges())
      NavigationService.goBack()
  }

  render() {
    return (
      <SignupScreen
        props={this.props}
        onChangeDetails={(data) => { this.setState({ ...data }) }}
        goBack={this.goBack}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.Auth.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signup: payload => dispatch(AuthActions.signup(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpScreen);

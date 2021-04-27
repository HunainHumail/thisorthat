import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import {Metrix, Colors, Images, Fonts, NavigationService} from '../../config';
import {showToast, validatePassword} from '../../config/utills';
import {TTButton, BackHeader} from '../../components/';
import {AuthActions} from '../../store/actions';
import {connect} from 'react-redux';
import {Icon} from 'native-base';

const ChangePasswordScreen = props => {
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [hideNewPassword, setHideNew] = useState(true);
  const [hideConfirmPassword, setHideConfirm] = useState(true);
  const [specialChar, setSpecialChar] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false)
  const [passLength, setPassLength] = useState(false)
  const toggleNewPassword = () => {
    setHideNew(!hideNewPassword);
  };
  const toggleConfirmPassword = () => {
    setHideConfirm(!hideConfirmPassword);
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

  const checkNumber = pass =>{
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

  const changePassword = () => {
    const {newPassword, confirmPassword} = passwords;
    if (newPassword && confirmPassword) {
      if (newPassword == confirmPassword) {
        if (validatePassword(newPassword)) {
          Alert.alert(
            "Reset Password",
            `Are you sure you want to reset the password?`,
            [{
              text: "Yes",
              onPress: () => {
                props.changePassword({
                  email: props.signupData.email,
                  password: newPassword,
                });
              },
            },
            {
              text: "No",
            }]
          )
          //console.log('pyaload', newPassword, props);
        } else {
          showToast(
            'The password must contain 8 to 16 characters, one Capital letter, one number and special character.',
          );
        }
      } else {
        showToast('Passwords do not match');
      }
    } else {
      showToast('Required fields cannot be left empty');
    }
  };

  return (
    <>
      <BackHeader text={'Change your password'} />
      <ScrollView>
        <View
          style={{
            backgroundColor: Colors.AppBackgroud,
            width: Metrix.HorizontalSize(),
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts['Poppins-Regular'],
              fontSize: Metrix.customFontSize(13),
              color: Colors.TextLight,
              marginTop: Metrix.VerticalSize(40),
            }}>
            Choose a strong new password
          </Text>
          <View
            style={{
              width: Metrix.HorizontalSize(311),
              height: Metrix.VerticalSize(290),
              borderRadius: Metrix.Radius,
              ...Metrix.createShadow(),
              marginTop: Metrix.VerticalSize(55),
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
                  source={Images.LockIcon}
                />
              </View>
              <TextInput
                style={{
                  height: Metrix.VerticalSize(55),
                  width: Metrix.HorizontalSize(240),
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(13),
                  marginLeft: Metrix.HorizontalSize(3),
                  marginTop: Metrix.HorizontalSize(3),
                }}
                placeholder={'New Password'}
                placeholderTextColor={Colors.TextLight}
                value={passwords.newPassword}
                secureTextEntry={hideNewPassword}
                autoCapitalize={'none'}
                onChangeText={new_password =>
                  setPasswords(
                    {...passwords, newPassword: new_password},
                    checkPassword(new_password),
                    checkSpecialChar(new_password),
                    checkNumber(new_password),
                    checkLength(new_password)
                  )
                }
              />
              <TouchableOpacity onPress={() => toggleNewPassword()}>
                <Text
                  style={{
                    fontFamily: Fonts['Poppins-Italic'],
                    color: Colors.Primary,
                    fontSize: Metrix.FontExtraSmall,
                    paddingTop: Metrix.VerticalSize(4),
                  }}>
                  {hideNewPassword ? 'show' : 'hide'}
                </Text>
              </TouchableOpacity>
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
                  width: Metrix.HorizontalSize(240),
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(13),
                  marginLeft: Metrix.HorizontalSize(3),
                  marginTop: Metrix.VerticalSize(5),
                }}
                placeholder={'Confirm Password'}
                placeholderTextColor={Colors.TextLight}
                value={passwords.confirmPassword}
                secureTextEntry={hideConfirmPassword}
                autoCapitalize={'none'}
                onChangeText={confirm_password =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: confirm_password,
                  })
                }
              />
              <TouchableOpacity onPress={() => toggleConfirmPassword()}>
                <Text
                  style={{
                    fontFamily: Fonts['Poppins-Italic'],
                    color: Colors.Primary,
                    fontSize: Metrix.FontExtraSmall,
                    paddingTop: Metrix.VerticalSize(4),
                  }}>
                  {hideConfirmPassword ? 'show' : 'hide'}
                </Text>
              </TouchableOpacity>
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
                    ? {color: 'green'}
                    : {color: Colors.TagFontColor},
                ]}
              />
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  color: Colors.TextLight,
                  fontSize: Metrix.customFontSize(13),
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
                  upperCase ? {color: 'green'} : {color: Colors.TagFontColor},
                ]}
              />
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  color: Colors.TextLight,
                  fontSize: Metrix.customFontSize(13),
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
                  specialChar ? {color: 'green'} : {color: Colors.TagFontColor},
                ]}
              />
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  color: Colors.TextLight,
                  fontSize: Metrix.customFontSize(13),
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
                  },
                  number ? {color: 'green'} : {color: Colors.TagFontColor},
                ]}
              />
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  color: Colors.TextLight,
                  fontSize: Metrix.customFontSize(13),
                  marginLeft: Metrix.HorizontalSize(12),
                }}>
                1 number
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              marginTop: Metrix.VerticalSize(260),
              marginBottom: Metrix.VerticalSize(55),
            }}>
            <TTButton
              isLoading={props.isLoading}
              text={'Continue'}
              onPress={() => changePassword()}
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
    signupData: state.Auth.signupData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changePassword: payload => dispatch(AuthActions.changePassword(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordScreen);

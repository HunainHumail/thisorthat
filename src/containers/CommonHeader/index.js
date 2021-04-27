import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Share,
  Platform,
  ScrollView
} from 'react-native';
import { Metrix, Images, NavigationService, Fonts, Colors } from '../../config';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BSList, TTButton } from '../../components/';
import AsyncStorage from '@react-native-community/async-storage';
import { HomeActions, AuthActions } from '../../store/actions';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { showToast, validatePassword } from '../../config/utills';

const CommonHeader = props => {
  var RBSheets;
  const { hideIcon, onPress } = props;

  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          title: 'Download our app',
          message: Platform.OS == "ios" ? 'https://apps.apple.com/us/app/this-or-that-products/id1552241400' : "https://play.google.com/store/apps/details?id=com.thisorthatapp",
          url: Platform.OS == "ios" ? 'https://apps.apple.com/us/app/this-or-that-products/id1552241400' : "https://play.google.com/store/apps/details?id=com.thisorthatapp",
        },
        { dialogTitle: 'Choose an app' },
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const logOut = () => {
    AsyncStorage.removeItem('user').then(user => {
      NavigationService.reset_0('IntroScreen');
    });
  };
  let changePasswordData = {
    confirmPassword: '',
    newPassword: '',
    password: '',
  };

  const [change_password_data, updateState] = useState(changePasswordData);
  const [showModal, setShowModal] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [specialChar, setSpecialChar] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [number, setNumber] = useState(false)
  const [passLength, setPassLength] = useState(false)

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

  const checkLength = pass => {
    if (pass.length > 7) {
      setPassLength(true)
    } else {
      setPassLength(false)
    }
  }
  // const updatePassword = () => {
  //   props.updatePassword({
  //     callBack: param => {
  //       //alert(param);
  //       setErrorMessage(param);
  //     },
  //     change_password_data,
  //   });
  // };

  const updatePassword = () => {
    const { password, newPassword, confirmPassword } = change_password_data;
    if (password && newPassword && confirmPassword) {
      // if (password == confirmPassword) {
      //   alert('The current password that you have entered does not match!');
      //   return showToast(
      //     'The current password that you have entered does not match!',
      //   );
      // }
      if (newPassword == confirmPassword) {
        if (validatePassword(newPassword)) {
          //console.log('pyaload', newPassword, props);
          props.updatePassword({
            callBack: param => {
              param ? setErrorMessage(param) : setShowModal(param);
            },
            change_password_data,
          });
        } else {
          alert(
            'The password must contain 8 to 16 characters, one Capital letter, one number and special character.',
          );
          showToast(
            'The password must contain 8 to 16 characters, one Capital letter, one number and special character.',
          );
        }
      } else {
        alert('The confirm new password does not match');
        showToast('The confirm new password does not match');
      }
    } else {
      alert('Required fields cannot be left empty');
      showToast('Required fields cannot be left empty');
    }
  };
  //console.log(errorMessage, 'This is error message');
  return (
    <>
      <View
        style={{
          width: Metrix.HorizontalSize(),
          alignItems: 'center',
          flexDirection: 'row',
          height: Metrix.VerticalSize(90),
          backgroundColor: Colors.AppBackgroud,
        }}>
        <View
          style={{
            width: '15%',
            height: '100%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => RBSheets.open()}
            style={{
              height: Metrix.VerticalSize(55),
              width: Metrix.VerticalSize(55),
              borderRadius: Metrix.VerticalSize(50),
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: Metrix.HorizontalSize(5),
            }}>
            <View
              style={{
                height: Metrix.VerticalSize(24),
                width: Metrix.HorizontalSize(24),
              }}>
              <Image
                resizeMode="contain"
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={Images.SettingsIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: Metrix.HorizontalSize(44),
            height: Metrix.VerticalSize(44),
            marginLeft: Metrix.HorizontalSize(110),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {hideIcon ? (
            <View />
          ) : (
            <Image
              resizeMode="contain"
              style={{
                height: '100%',
                width: '100%',
              }}
              source={Images.Logo}
            />
          )}
        </View>
        <View style={{ width: '15%', paddingLeft: Metrix.HorizontalSize(8) }} />
        <View
          style={{ width: '15%', height: '100%', justifyContent: 'center' }}
        />
      </View>

      <RBSheet
        ref={ref => (RBSheets = ref)}
        height={Metrix.VerticalSize(290)}
        duration={0}
        customStyles={{
          container: {
            borderTopLeftRadius: Metrix.Radius,
            borderTopRightRadius: Metrix.Radius,
          },
        }}>
        <View
          style={{
            width: Metrix.HorizontalSize(375),
            height: Metrix.VerticalSize(290),
            paddingHorizontal: Metrix.HorizontalSize(17),
          }}>
          <Text
            style={{
              fontFamily: Fonts['Lora-Bold'],
              fontSize: Metrix.customFontSize(18),
              color: Colors.TextDark,
              marginTop: Metrix.VerticalSize(15),
              marginBottom: Metrix.VerticalSize(15),
            }}>
            Settings
          </Text>
          <View>
            <BSList
              text={'Invite a friend'}
              icon={Images.PersonAdd}
              onPress={() => {
                // RBSheets.close();
                onShare();
              }}
            />
            <BSList
              text={'Change Password'}
              icon={Images.ShieldIcon}
              onPress={() => {
                RBSheets.close();
                Platform.OS == "ios" ?
                  setTimeout(() => { setShowModal(true) }, 500)
                  :
                  setShowModal(true);
              }}
            />
            <BSList
              text={'About Us'}
              icon={Images.InfoIcon}
              onPress={() => {
                RBSheets.close();
                NavigationService.navigate('AboutUs');
              }}
            />
            <BSList
              text={'Logout'}
              icon={Images.LogoutIcon}
              noBorder={true}
              onPress={() => {
                RBSheets.close();
                logOut();
              }}
            />
          </View>
        </View>
      </RBSheet>
      <Modal
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
          updateState({
            password: '',
            confirmPassword: '',
            newPassword: '',
          });
          setHideConfirmPassword(true);
          setHideNewPassword(true);
          setHidePassword(true)
          setUpperCase(false)
          setNumber(false)
          setSpecialChar(false)
          setPassLength(false)
        }}
        transparent={true}>
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={() => {
            setShowModal(false);
            updateState({
              password: '',
              confirmPassword: '',
              newPassword: '',
            });
            setHideConfirmPassword(true);
            setHideNewPassword(true);
            setHidePassword(true);
            setUpperCase(false);
            setNumber(false);
            setSpecialChar(false);
            setPassLength(false);
          }}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.9)',
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            style={{ width: "100%" }}
            contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: Metrix.HorizontalSize(311),
                height: Metrix.VerticalSize(430),
                borderRadius: Metrix.Radius,
                ...Metrix.createShadow(),
              }}>
              <View
                style={{
                  //paddingLeft: Metrix.HorizontalSize(10),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              />
              <View
                style={{
                  height: Metrix.VerticalSize(50),
                  paddingHorizontal: Metrix.HorizontalSize(17),
                  borderBottomColor: Colors.Border,
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
                    width: Metrix.HorizontalSize(220),
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(13),
                    marginTop: Metrix.VerticalSize(7),
                    marginLeft: Metrix.HorizontalSize(3),
                  }}
                  placeholder={'Current Password'}
                  placeholderTextColor={Colors.TextLight}
                  value={change_password_data.password}
                  secureTextEntry={hidePassword}
                  autoCapitalize={'none'}
                  onChangeText={password =>
                    updateState(
                      { ...change_password_data, password: password },
                      checkPassword(password),
                      checkSpecialChar(password),
                      checkNumber(password),
                      checkLength(password)
                    )
                  }
                />
                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                  <Text
                    style={{
                      fontFamily: Fonts['Poppins-Italic'],
                      color: Colors.Primary,
                      fontSize: Metrix.FontExtraSmall,
                      paddingTop: Metrix.VerticalSize(4),
                    }}>
                    {hidePassword ? 'show' : 'hide'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: Metrix.VerticalSize(50),
                  paddingHorizontal: Metrix.HorizontalSize(17),
                  borderBottomColor: Colors.Border,
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
                    width: Metrix.HorizontalSize(220),
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(13),
                    marginTop: Metrix.VerticalSize(7),
                    marginLeft: Metrix.HorizontalSize(3),
                  }}
                  placeholder={'New Password'}
                  placeholderTextColor={Colors.TextLight}
                  value={change_password_data.newPassword}
                  secureTextEntry={hideNewPassword}
                  autoCapitalize={'none'}
                  onChangeText={password =>
                    updateState(
                      { ...change_password_data, newPassword: password },
                      checkPassword(password),
                      checkSpecialChar(password),
                      checkNumber(password),
                      checkLength(password)
                    )
                  }
                />
                <TouchableOpacity
                  onPress={() => setHideNewPassword(!hideNewPassword)}>
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
                  paddingHorizontal: Metrix.HorizontalSize(17),
                  //borderBottomColor: Colors.Primary,
                  // borderBottomWidth: Metrix.VerticalSize(1),
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: Metrix.VerticalSize(10),
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
                    width: Metrix.HorizontalSize(220),
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(13),
                    marginTop: Metrix.VerticalSize(7),
                    marginLeft: Metrix.HorizontalSize(3),
                  }}
                  placeholder={'Confirm Password'}
                  placeholderTextColor={Colors.TextLight}
                  value={change_password_data.confirmPassword}
                  secureTextEntry={hideConfirmPassword}
                  autoCapitalize={'none'}
                  onChangeText={password =>
                    updateState(
                      { ...change_password_data, confirmPassword: password },
                      checkPassword(password),
                      checkSpecialChar(password),
                      checkNumber(password),
                      checkLength(password)
                    )
                  }
                />
                <TouchableOpacity
                  onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
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
                  marginHorizontal: Metrix.HorizontalSize(7),
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
                  marginHorizontal: Metrix.HorizontalSize(7),
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
                  marginHorizontal: Metrix.HorizontalSize(7),
                }}>
                <Icon
                  name="checkmark"
                  style={[
                    {
                      fontSize: Metrix.customFontSize(20),
                      color: Colors.TextLight,
                    },
                    specialChar ? { color: 'green' } : { color: Colors.TagFontColor },
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
                  marginHorizontal: Metrix.HorizontalSize(7),
                }}>
                <Icon
                  name="checkmark"
                  style={[
                    {
                      fontSize: Metrix.customFontSize(20),
                    },
                    number ? { color: 'green' } : { color: Colors.TagFontColor },
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
              <View
                style={{
                  alignSelf: 'center',
                  marginVertical: Metrix.VerticalSize(10),
                }}>
                <TTButton
                  text="Save"
                  onPress={updatePassword}
                  isLoading={props.isLoading}
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
          {/* </View> */}
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.Home.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updatePassword: payload => dispatch(HomeActions.updatePassword(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommonHeader);

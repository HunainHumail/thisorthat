import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  Linking
} from 'react-native';
import { Metrix, Colors, Images, Fonts, NavigationService } from '../../config';
import { TTButton } from '../../components/';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { connect } from 'react-redux';
import { AuthActions } from '../../store/actions';
import { AppleButton, appleAuth, appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'
// import WebView from 'react-native-webview';

class IntroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xValue: new Animated.Value(0),
      yValue: new Animated.Value(0),
      toTop: true,
      z_ndex: true,
      xWidth: new Animated.Value(250),
      yWidth: new Animated.Value(280),
    };
  }
  animation = () => {
    setTimeout(() => {
      this.setState({
        z_ndex: !this.state.z_ndex,
      });
    }, 700);
    this.setState({
      toTop: !this.state.toTop,
    });

    Animated.timing(this.state.xWidth, {
      toValue: this.state.toTop ? 280 : 250,
      duration: 700,
      asing: Easing.linear,
    }).start();
    Animated.timing(this.state.yWidth, {
      toValue: this.state.toTop ? 250 : 280,
      duration: 700,
      asing: Easing.linear,
    }).start();

    Animated.timing(this.state.xValue, {
      toValue: this.state.toTop ? 60 : 290,
      duration: 700,
      asing: Easing.linear,
    }).start(() => {
      Animated.timing(this.state.xValue, {
        toValue: 0,
        duration: 700,
        asing: Easing.linear,
      }).start();
    });
    //console.log('i am herererer');
    Animated.timing(this.state.yValue, {
      toValue: this.state.toTop ? 290 : 60,
      duration: 700,
      asing: Easing.linear,
    }).start(() => {
      Animated.timing(this.state.yValue, {
        toValue: 0,
        duration: 700,
        asing: Easing.linear,
      }).start();
    });
  };

  componentDidMount() {
    if (Platform.OS == 'ios') {
      GoogleSignin.configure({
        webClientId: '6615838368-a4bfafgjijlhmteb1iamskig8u9g08jg.apps.googleusercontent.com'
      });
    }
    else {
      GoogleSignin.configure({
        webClientId: '6615838368-6e2d9fmk3e30799mgiluniutf3khstc8.apps.googleusercontent.com'
      });
    }
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, "userinfo");
      //we need to modify the below code to use action

      this.props.socialLogin({
        ...userInfo.user,
        social_id: userInfo.user.id,
        platform: 'google',
        givenName: userInfo.user.givenName
      });

      // this.setState({ userInfo });
    } catch (error) {
      console.log(error, "error");
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  onAppleButtonPress = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });


    this.props.socialLogin({
      ...appleAuthRequestResponse,
      social_id: 1,
      platform: 'apple',
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);


    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
    // Send the authorization code to your backend for verification
  }
  //  onAppleButtonPress = async () => {
  //   // performs login request
  //   const appleAuthRequestResponse = await appleAuth.performRequest({
  //     requestedOperation: appleAuth.Operation.LOGIN,
  //     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //   });

  //   // get current authentication state for user
  //   // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  //   const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

  //   // use credentialState response to ensure the user is authenticated
  //   if (credentialState === appleAuth.State.AUTHORIZED) {
  //     // user is authenticated
  //   }
  // }





  fbLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const infoRequest = new GraphRequest(
              '/me?fields=first_name,last_name,email,birthday,gender',
              null,
              (error, result1) => {
                if (error) {
                  console.log(error, "error");
                } else {
                  console.log(result1, "result")
                  this.props.socialLogin({
                    ...result1,
                    social_id: result1.id,
                    platform: 'facebook',
                  });
                  //console.log(result1, 'result');
                }
              },
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
          // new GraphRequestManager().addRequest(req).start();
        }
      },
      function (error) {
        //console.log('Login fail with error: ' + error);
      },
    );
  };

  render() {
    const { toTop, z_ndex } = this.state;

    return (
      <View
        style={{
          backgroundColor: Colors.AppBackgroud,
          width: Metrix.HorizontalSize(),
          paddingBottom: Metrix.VerticalSize(100),
        }}>
        <View
          style={{
            marginTop: Metrix.VerticalSize(47),
            marginLeft: Metrix.HorizontalSize(19),
            height: Metrix.VerticalSize(47),
            width: Metrix.HorizontalSize(47),
          }}>
          <Image
            resizeMode="contain"
            style={{
              height: '100%',
              width: '100%',
            }}
            source={Images.Logo}
          />
        </View>
        <View
          style={{
            paddingHorizontal: Metrix.HorizontalSize(37),
            marginTop: Metrix.VerticalSize(30),
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: Metrix.VerticalSize(400),
            }}>
            <Animated.View
              style={[
                z_ndex
                  ? {
                    zIndex: 0,
                    ...Metrix.createShadow(4),
                    marginTop: Metrix.VerticalSize(-10),
                  }
                  : {
                    zIndex: 2,
                    ...Metrix.createShadow(6),
                    marginTop: Metrix.VerticalSize(-10),
                  },
                {
                  height: Metrix.VerticalSize(385),
                  // ...Metrix.createShadow(),
                  width: this.state.xWidth,
                  borderRadius: Metrix.Radius,
                },
                toTop ? { bottom: this.state.xValue } : { top: this.state.xValue },
              ]}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={this.animation}>
                <View
                  style={{
                    width: Metrix.HorizontalSize(235),
                    height: Metrix.VerticalSize(265),
                    marginTop: Metrix.VerticalSize(25),
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={Images.IntoImage2}
                  />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: Metrix.VerticalSize(26),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts['Lora-Bold'],
                      fontSize: Metrix.customFontSize(15),
                      color: Colors.TextDark,
                    }}>
                    Create a poll and invite {'\n'} your friends to vote!
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={[
                z_ndex
                  ? { marginTop: Metrix.VerticalSize(-415) }
                  : { marginTop: Metrix.VerticalSize(-355) },
                {
                  height: Metrix.VerticalSize(385),
                  ...Metrix.createShadow(),
                  width: this.state.yWidth,
                  borderRadius: Metrix.Radius,
                },
                toTop ? { top: this.state.yValue } : { bottom: this.state.yValue },
              ]}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={this.animation}>
                <View
                  style={{
                    width: Metrix.HorizontalSize(235),
                    height: Metrix.VerticalSize(304),
                    marginTop: Metrix.VerticalSize(25),
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={Images.IntoImage1}
                  />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts['Lora-Bold'],
                      fontSize: Metrix.customFontSize(16),
                      color: Colors.TextDark,
                    }}>
                    Can't decide on something?
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
          <View
            style={{
              marginTop: Metrix.VerticalSize(45),
              flexDirection: 'row',
            }}>
            <View
              style={[
                {
                  width: Metrix.VerticalSize(8),
                  height: Metrix.VerticalSize(8),
                  borderRadius: Metrix.VerticalSize(100),
                },
                toTop
                  ? {
                    backgroundColor: Colors.Primary,
                  }
                  : {
                    borderWidth: Metrix.VerticalSize(1),
                    borderColor: Colors.Primary,
                  },
              ]}
            />
            <View
              style={[
                {
                  width: Metrix.VerticalSize(8),
                  height: Metrix.VerticalSize(8),
                  borderRadius: Metrix.VerticalSize(100),
                  marginLeft: Metrix.HorizontalSize(5),
                },
                toTop
                  ? {
                    borderWidth: Metrix.VerticalSize(1),
                    borderColor: Colors.Primary,
                  }
                  : {
                    backgroundColor: Colors.Primary,
                  },
              ]}
            />
          </View>
          <View
            style={{
              width: Metrix.HorizontalSize(301),
              marginTop: Metrix.VerticalSize(35),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TTButton
              onPress={() => NavigationService.navigate('LoginScreen')}
              text={'Login'}
              width={118}
              color={Colors.White}
            />
            <TTButton
              text={'Create account'}
              onPress={() => NavigationService.navigate('SignupScreen')}
            />
          </View>

          <View style={{ marginTop: Metrix.VerticalSize(20), flexDirection: "row", justifyContent: 'center', alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => this.fbLogin()}
              style={{
                width: Metrix.HorizontalSize(60),
                height: Metrix.VerticalSize(60),
                borderRadius: Metrix.VerticalSize(8),
                flexDirection: 'row',
                backgroundColor: Colors.Blue,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: Metrix.HorizontalSize(5)
              }}
            >
              {/* <View
              style={{
                justifyContent: 'center',
                marginLeft: Metrix.HorizontalSize(75),
              }}> */}
              <View
                style={{
                  height: Metrix.VerticalSize(20),
                  width: Metrix.HorizontalSize(14),
                  alignItems: 'center',
                  justifyContent: 'center',
                  // marginRight: Metrix.HorizontalSize(15),
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={Images.FacebookIcon}
                />
              </View>
              {/* </View> */}
              {/* <View
              style={{
                justifyContent: 'center',
                paddingLeft: Metrix.HorizontalSize(20),
              }}> */}
              {/* <Text
              style={{
                fontFamily: Fonts['Poppins-Medium'],
                fontSize: Metrix.FontSmall,
                color: Colors.White,
                marginTop: Metrix.VerticalSize(2),
              }}>
              Continue with Facebook
            </Text> */}
              {/* </View> */}
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                width: Metrix.HorizontalSize(60),
                height: Metrix.VerticalSize(60),
                borderRadius: Metrix.VerticalSize(8),
                flexDirection: 'row',
                backgroundColor: Colors.White,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: Metrix.HorizontalSize(5)
              }}
              onPress={this.signIn}>
              <Image
                resizeMode="contain"
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={Images.GoogleIcon}
              />
            </TouchableOpacity> */}
            {Platform.OS == "ios" ?
              <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                  width: Metrix.HorizontalSize(60),
                  height: Metrix.VerticalSize(60),
                  borderRadius: Metrix.VerticalSize(15),
                  marginHorizontal: Metrix.HorizontalSize(5)
                  // You must specify a height
                }}
                onPress={() => this.onAppleButtonPress()}
              />
              : null
              // appleAuthAndroid.isSupported && (
              //   <AppleButton
              //     buttonStyle={AppleButton.Style.WHITE}
              //     buttonType={AppleButton.Type.SIGN_IN}
              //     onPress={() => this.onAppleButtonPressAndroid()}
              //   />
              // )
            }
          </View>

          <View
            style={{ flexDirection: 'row', marginTop: Metrix.VerticalSize(31) }}>
            <TouchableOpacity onPress={()=>Linking.openURL("http://www.thisorthatapp.net/terms-conditions/")}>
            <Text
              style={{
                fontFamily: Fonts['Poppins-Regular'],
                fontSize: Metrix.FontSmall,
                color: Colors.Primary,
                textDecorationLine: 'underline',
              }}>
              Privacy
            </Text>
            </TouchableOpacity>
              <View
                style={{
                  height: Metrix.VerticalSize(6),
                  width: Metrix.VerticalSize(6),
                  backgroundColor: Colors.Primary,
                  borderRadius: Metrix.VerticalSize(50),
                  marginTop: Metrix.VerticalSize(8),
                  marginLeft: Metrix.HorizontalSize(8),
                }}
              />
              <TouchableOpacity onPress={()=>Linking.openURL("http://www.thisorthatapp.net/terms-conditions/")}>
                <Text
                  style={{
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(13),
                    color: Colors.Primary,
                    textDecorationLine: 'underline',
                    marginLeft: Metrix.HorizontalSize(8),
                  }}>
                  Terms and Conditions
              </Text>
              </TouchableOpacity>
          </View>
          </View>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
          socialLogin: payload => dispatch(AuthActions.socialLogin(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IntroScreen);

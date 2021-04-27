import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import { Metrix, Colors, Images, Fonts, NavigationService } from '../../config';
import { TTButton, BackHeader } from '../../components/';
import { connect } from 'react-redux';
import { AuthActions } from '../../store/actions';

const VerifyCodeScreen = props => {
  // console.log('propss in verify screen', props);
  const [focusedInput, setFocusedInput] = useState(0);
  const [codes, setCodes] = useState({
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  });
  const [name, setName] = useState('');
  const [resendCount, setResendCount] = useState(0);
  let codeObj = {};
  const focusFunction = number => {
    if (number) setFocusedInput(number);
    else setFocusedInput(0);
  };

  const onChange = (name, text) => {
    console.log('valuesss====', name, text);
    console.log('codesss', codes);
    const textLength = text.length;
    switch (name) {
      case 'code1':
        codes.code1 = text;
        if (textLength) codeObj['code2'].focus();
        else codeObj['code1'].focus();
        break;
      case 'code2':
        codes.code2 = text;
        if (textLength) codeObj['code3'].focus();
        else codeObj['code1'].focus();
        break;
      case 'code3':
        codes.code3 = text;
        if (textLength) codeObj['code4'].focus();
        else codeObj['code2'].focus();
        break;
      case 'code4':
        codes.code4 = text;
        if (textLength) codeObj['code5'].focus();
        else codeObj['code3'].focus();
        break;
      case 'code5':
        codes.code5 = text;
        if (textLength) codeObj['code6'].focus();
        else codeObj['code4'].focus();
        break;
      case 'code6':
        codes.code6 = text;
        if (!textLength) {
          codeObj['code5'].focus();
        }
        break;
    }

    const code = codes.code1 + codes.code2 + codes.code3 + codes.code4 + codes.code5 + codes.code6;
    setCodes({ ...codes, [name]: text });
    setName(text);
    if (code.length == 6) {
      Keyboard.dismiss();
      verifyCode(code);
    }
  };

  const verifyCode = code => {
    props.verifyCode({
      code: code,
      email: props.signupData.email,
      ...props.route.params,
    });
  };

  useEffect(() => {
    if (!resendCount) return;
    const intervalId = setInterval(() => {
      setResendCount(resendCount - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [resendCount]);

  const resendCode = () => {
    setResendCount(59);
    props.resendCode({ email: props.signupData.email, ...props.route.params });
  };

  return (
    <>
      <BackHeader text={'Verify your email'} />
      <ScrollView>
        <View
          style={{
            backgroundColor: Colors.AppBackgroud,
            width: Metrix.HorizontalSize(),
          }}>
          <View
            style={{ marginTop: Metrix.VerticalSize(50), alignItems: 'center' }}>
            <Text
              style={{
                color: Colors.TextLight,
                fontFamily: Fonts['Poppins-Regular'],
                fontSize: Metrix.customFontSize(13),
                textAlign: 'center',
                width: Metrix.HorizontalSize(224),
              }}>
              Enter the verification code you received in your inbox
            </Text>
          </View>
          <View
            style={{
              marginTop: Metrix.VerticalSize(45),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              keyboardType="number-pad"
              style={[
                {
                  width: Metrix.HorizontalSize(45),
                  textAlign: 'center',
                  height: Metrix.HorizontalSize(45),
                  borderColor: Colors.peach,
                  borderRadius: Metrix.Radius,
                },
                focusedInput == 1 ? Metrix.createShadow() : { borderWidth: 1 },
              ]}
              value={codes.code1}
              maxLength={1}
              ref={ref => {
                codeObj['code1'] = ref;
              }}
              onChangeText={text => onChange('code1', text)}
              onKeyPressEvent={e => {
                if (e == 'Backspace') onChange('code1', '');
              }}
              onFocus={() => focusFunction(1)}
              onBlur={() => focusFunction()}
            />
            <TextInput
              keyboardType="number-pad"
              style={[
                {
                  width: Metrix.HorizontalSize(45),
                  textAlign: 'center',
                  height: Metrix.HorizontalSize(45),
                  borderColor: Colors.peach,
                  borderRadius: Metrix.Radius,
                  marginLeft: Metrix.HorizontalSize(12),
                },
                focusedInput == 2 ? Metrix.createShadow() : { borderWidth: 1 },
              ]}
              value={codes.code2}
              maxLength={1}
              ref={ref => {
                codeObj['code2'] = ref;
              }}
              onChangeText={text => onChange('code2', text)}
              onKeyPressEvent={e => {
                if (e == 'Backspace') onChange('code2', '');
              }}
              onFocus={() => focusFunction(2)}
              onBlur={() => focusFunction()}
            />
            <TextInput
              keyboardType="number-pad"
              style={[
                {
                  width: Metrix.HorizontalSize(45),
                  textAlign: 'center',
                  height: Metrix.HorizontalSize(45),
                  borderColor: Colors.peach,
                  borderRadius: Metrix.Radius,
                  marginLeft: Metrix.HorizontalSize(12),
                },
                focusedInput == 3 ? Metrix.createShadow() : { borderWidth: 1 },
              ]}
              value={codes.code3}
              maxLength={1}
              ref={ref => {
                codeObj['code3'] = ref;
              }}
              onChangeText={text => onChange('code3', text)}
              onKeyPressEvent={e => {
                if (e == 'Backspace') onChange('code3', '');
              }}
              onFocus={() => focusFunction(3)}
              onBlur={() => focusFunction()}
            />
            <TextInput
              keyboardType="number-pad"
              style={[
                {
                  width: Metrix.HorizontalSize(45),
                  textAlign: 'center',
                  height: Metrix.HorizontalSize(45),
                  borderColor: Colors.peach,
                  borderRadius: Metrix.Radius,
                  marginLeft: Metrix.HorizontalSize(12),
                },
                focusedInput == 4 ? Metrix.createShadow() : { borderWidth: 1 },
              ]}
              value={codes.code4}
              maxLength={1}
              ref={ref => {
                codeObj['code4'] = ref;
              }}
              onChangeText={text => onChange('code4', text)}
              onKeyPressEvent={e => {
                if (e == 'Backspace') onChange('code4', '');
              }}
              onFocus={() => focusFunction(4)}
              onBlur={() => focusFunction()}
            />
            <TextInput
              keyboardType="number-pad"
              style={[
                {
                  width: Metrix.HorizontalSize(45),
                  textAlign: 'center',
                  height: Metrix.HorizontalSize(45),
                  borderColor: Colors.peach,
                  borderRadius: Metrix.Radius,
                  marginLeft: Metrix.HorizontalSize(12),
                },
                focusedInput == 5 ? Metrix.createShadow() : { borderWidth: 1 },
              ]}
              value={codes.code5}
              maxLength={1}
              ref={ref => {
                codeObj['code5'] = ref;
              }}
              onChangeText={text => onChange('code5', text)}
              onKeyPressEvent={e => {
                if (e == 'Backspace') onChange('code5', '');
              }}
              onFocus={() => focusFunction(5)}
              onBlur={() => focusFunction()}
            />
            <TextInput
              keyboardType="number-pad"
              style={[
                {
                  width: Metrix.HorizontalSize(45),
                  textAlign: 'center',
                  height: Metrix.HorizontalSize(45),
                  borderColor: Colors.peach,
                  borderRadius: Metrix.Radius,
                  marginLeft: Metrix.HorizontalSize(12),
                },
                focusedInput == 6 ? Metrix.createShadow() : { borderWidth: 1 },
              ]}
              value={codes.code6}
              maxLength={1}
              ref={ref => {
                codeObj['code6'] = ref;
              }}
              onChangeText={text => onChange('code6', text)}
              onKeyPressEvent={e => {
                if (e == 'Backspace') onChange('code6', '');
              }}
              onFocus={() => focusFunction(6)}
              onBlur={() => focusFunction()}
            />
          </View>
          <View
            style={{ marginTop: Metrix.VerticalSize(35), alignItems: 'center' }}>
            {resendCount == 60 ? null : (
              <Text
                style={{
                  fontSize: Metrix.FontExtraSmall,
                  fontFamily: Fonts['Poppins-Italic'],
                  color: resendCount
                    ? Colors.TextColorOpacity(0.5)
                    : Colors.Primary,

                  textDecorationLine: 'underline',
                  letterSpacing: 0.42,
                }}
                onPress={() => {
                  if (resendCount) {
                  } else {
                    console.log('i clickeddddd');
                    resendCode();
                  }
                }}
              // onPress={resendCount ? () => {} : resendCode}
              >
                Resend Code {resendCount ? resendCount : ''}
              </Text>
            )}
          </View>
          <View
            style={{
              marginTop: Metrix.VerticalSize(400),
              marginBottom: Metrix.VerticalSize(65),
              alignItems: 'center',
            }}>
            <TTButton
              text={'Verify'}
              onPress={verifyCode}
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
    signupData: state.Auth.signupData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    verifyCode: payload => dispatch(AuthActions.verifyCode(payload)),
    resendCode: payload => dispatch(AuthActions.resendCode(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyCodeScreen);

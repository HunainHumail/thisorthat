import React, {useState} from 'react';
import {View, Text, Image, TextInput, ScrollView} from 'react-native';
import {Metrix, Colors, Images, Fonts} from '../../config';
import {showToast, validateEmail} from '../../config/utills';
import {TTButton, BackHeader} from '../../components/';
import {AuthActions} from '../../store/actions';
import {connect} from 'react-redux';

const ResetPasswordScreen = props => {
  const [email, setEmail] = useState('');
  const resetPassword = () => {
    if (email) {
      if (validateEmail(email)) {
        props.resetPassword({email: email});
      } else {
        showToast('Please enter valid email address');
      }
    } else {
      showToast('Required fields cannot be left empty');
    }
  };

  return (
    <>
      <BackHeader text={'Reset Password'} />
      <ScrollView>
        <View
          style={{
            backgroundColor: Colors.AppBackgroud,
            width: Metrix.HorizontalSize(),
            paddingHorizontal: Metrix.HorizontalSize(32),
          }}>
          <View
            style={{marginTop: Metrix.VerticalSize(50), alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: Fonts['Poppins-Regular'],
                fontSize: Metrix.customFontSize(13),
                color: Colors.TextLight,
                textAlign: 'center',
              }}>
              Enter your email address to {'\n'}receive a verification code
            </Text>
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(50),
              paddingLeft: Metrix.HorizontalSize(10),
              marginTop: Metrix.VerticalSize(45),
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.White,
              ...Metrix.createShadow(),
              borderRadius: Metrix.Radius,
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
                  width: '70%',
                  height: '85%',
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
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: Metrix.VerticalSize(470),
              marginBottom: Metrix.VerticalSize(55),
            }}>
            <TTButton
              text={'Continue'}
              onPress={resetPassword}
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
    resetPassword: payload => dispatch(AuthActions.resetPassword(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordScreen);

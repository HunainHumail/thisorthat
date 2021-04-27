import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import { Metrix, Colors, Images, Fonts } from '../../config';
import { showToast, validateEmail } from '../../config/utills';
import { TTButton, BackHeader } from '../../components/';
import { AuthActions } from '../../store/actions';
import { connect } from 'react-redux';
 import {myToken} from '../../config/NotificationService';

const SocialSignupScreen = props => {
  const [userName, setUserName] = useState('');
  const socialSignup = () => {
    console.log('paramsssss', props.route.params);
    const {
      first_name,
      last_name,
      email,
      social_id,
      givenName,
      platform,
    } = props.route.params;
    if(platform == 'google') {
      var full_name = givenName;
    }else {
      var full_name = `${first_name} ${last_name}`;
    }
    
    let payload = {
      username: userName,
      full_name,
      email,
      social_id,
      platform,
      device_token: myToken?.token,
    };
    if (userName) {
      if (userName.length > 3 || userName.length < 20) {
        props.socialSignup(payload);
      } else {
        showToast(
          'Username should be greater than 3 and less than 20 characters',
        );
      }
    } else {
      showToast('Required fields cannot be left empty');
    }
  };

  return (
    <>
      <BackHeader text={'Choose a Username'} />
      <ScrollView>
        <View
          style={{
            backgroundColor: Colors.AppBackgroud,
            width: Metrix.HorizontalSize(),
            paddingHorizontal: Metrix.HorizontalSize(32),
          }}>
          <View
            style={{ marginTop: Metrix.VerticalSize(50), alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: Fonts['Poppins-Regular'],
                fontSize: Metrix.customFontSize(13),
                color: Colors.TextLight,
              }}>
              Choose a unique username
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
              placeholder={'Username'}
              placeholderTextColor={Colors.TextLight}
              autoCapitalize={'none'}
              value={userName}
              onChangeText={userName => setUserName(userName)}
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
              onPress={socialSignup}
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
    socialSignup: payload => dispatch(AuthActions.signup(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocialSignupScreen);

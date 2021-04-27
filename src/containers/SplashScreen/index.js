import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {Metrix, Colors, Images, NavigationService} from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {AuthActions} from '../../store/actions';
import LottieView from 'lottie-react-native';

const SplashScreen = props => {
  getUser = () => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        let parsedData = JSON.parse(user);
        props.loginSuccess(parsedData);
        setTimeout(() => {
          NavigationService.reset_0('Tabs');
        }, 2400);
      } else {
        setTimeout(() => {
          NavigationService.reset_0('IntroScreen');
        }, 2400);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors.Primary,
        height: Metrix.VerticalSize(850),
        width: Metrix.HorizontalSize(),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: Metrix.VerticalSize(80),
          width: Metrix.HorizontalSize(80),
        }}>
        {/* <Image
          resizeMode="contain"
          //source={Images.LogoWhite}
          source={Images.AnimatedLogo} //for gif
          style={{height: '100%', width: '100%'}}
        /> */}
        <LottieView
          source={require('../../assets/SplashAnimation.json')}
          autoPlay={true}
          loop
        />
      </View>
    </View>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: payload => dispatch(AuthActions.loginSuccess(payload)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(SplashScreen);

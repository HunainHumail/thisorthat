/**
 * @format
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Colors } from './src/config/';

import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  PushNotification.localNotification({
    message: remoteMessage.notification.title
  })
  console.log('Message handled in the bsackground!', remoteMessage);
});
class AppView extends Component {
  render() {
    return Platform.OS == 'ios' ? (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Primary }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <App />
        </KeyboardAvoidingView>
      </SafeAreaView>
    ) : (
      <App />
    );
  }
}

AppRegistry.registerComponent(appName, () => AppView);


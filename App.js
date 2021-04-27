/**
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { StatusBar, Platform, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationService, Colors, NotificationService } from './src/config';
import { Provider } from 'react-redux';
import { store } from './src/store/';
import { Root } from 'native-base';
import { MainStack } from './src/stacks/MainStack';

NotificationService()

const App = props => {
  
  return (
    <Provider store={store}>
      {Platform.OS == 'android' ? (
        <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
      ) : (
        <></>
      )}
      <Root>
        <NavigationContainer
          ref={ref => NavigationService.setTopLevelNavigator(ref)}>
          <MainStack />
        </NavigationContainer>
      </Root>
    </Provider>
  );
};

export default App;

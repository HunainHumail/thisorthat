import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { InitialStack } from './InititalStack';
import { AuthStack } from './AuthStack';
import { HomeStack } from './HomeStack';
import { TabStack } from './TabStack';

export const MainStack = props => {
  //console.log('propsss', props);
  const MainStack = createStackNavigator();
  const AppStacks = [...InitialStack, ...AuthStack, ...HomeStack];
  return (
    <>
      <MainStack.Navigator
        initialRouteName={'SplashScreen'}
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        {AppStacks.map(stack => (
          <MainStack.Screen {...stack} />
        ))}
        <MainStack.Screen component={TabStack} name="Tabs" />
      </MainStack.Navigator>
    </>
  );
};

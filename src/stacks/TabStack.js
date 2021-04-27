import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  HomeScreen,
  SearchScreen,
  NotificationScreen,
  ProfileScreen,
  CreatePollScreen,
} from '../containers';
import {Colors, Metrix, NavigationService, Images} from '../config';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {Icon} from 'native-base';

function CustomTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        height: Metrix.VerticalSize(55),
        position: 'absolute',
        marginTop: Metrix.VerticalSize(20),
        bottom: Metrix.VerticalSize(20),
        left: Metrix.HorizontalSize(0),
        right: Metrix.HorizontalSize(0),
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <>
            {index == 0 ? (
              <View
                style={{
                  marginLeft: Metrix.HorizontalSize(17),
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.Primary,
                    height: Metrix.VerticalSize(52),
                    width: Metrix.VerticalSize(52),
                    borderRadius: Metrix.VerticalSize(100),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={
                    () => NavigationService.navigate('CreatePollScreen')
                    //NavigationService.navigate('InviteFriendScreen')
                  }>
                  <View
                    style={{
                      height: Metrix.VerticalSize(24),
                      width: Metrix.HorizontalSize(24),
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{height: '100%', width: '100%'}}
                      source={Images.HomeEmptyState}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={[
                  Platform.OS === 'ios'
                    ? {}
                    : {
                        ...Metrix.createShadow(),
                      },
                  {
                    backgroundColor: Colors.White,
                    width: Metrix.HorizontalSize(72),
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  index == 1
                    ? {
                        marginLeft: Metrix.HorizontalSize(9),
                        borderTopLeftRadius: Metrix.VerticalSize(35),
                        borderBottomLeftRadius: Metrix.VerticalSize(35),
                      }
                    : index == 4
                    ? {
                        borderTopRightRadius: Metrix.VerticalSize(35),
                        borderBottomRightRadius: Metrix.VerticalSize(35),
                        // marginRight:Metrix.HorizontalSize(2)
                      }
                    : {},
                ]}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityStates={isFocused ? ['selected'] : []}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{
                    height: Metrix.VerticalSize(50),
                    width: Metrix.HorizontalSize(50),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {label == 'Home' ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <MaterialCommunityIcons
                          style={{
                            marginTop: Metrix.VerticalSize(4),
                          }}
                          name="home"
                          color={Colors.Secondary}
                          size={
                            isFocused
                              ? Metrix.VerticalSize(18)
                              : Metrix.VerticalSize(23)
                          }
                        /> */}
                      <View
                        style={{
                          height: isFocused
                            ? Metrix.VerticalSize(13.5)
                            : Metrix.VerticalSize(18),
                          width: isFocused
                            ? Metrix.VerticalSize(12.5)
                            : Metrix.VerticalSize(16.2),
                        }}>
                        <Image
                          source={Images.Home}
                          resizeMode="contain"
                          style={{
                            height: '100%',
                            width: '100%',
                          }}
                        />
                      </View>
                      {isFocused ? (
                        <MaterialCommunityIcons
                          style={{
                            marginTop: Metrix.VerticalSize(-7),
                          }}
                          name="circle-small"
                          color={Colors.Primary}
                          size={25}
                        />
                      ) : (
                        <View />
                      )}
                    </View>
                  ) : label == 'Search' ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <MaterialCommunityIcons
                          style={{
                            marginTop: Metrix.VerticalSize(4),
                          }}
                          name="magnify"
                          color={Colors.Secondary}
                          size={
                            isFocused
                              ? Metrix.VerticalSize(18)
                              : Metrix.VerticalSize(23)
                          }
                        /> */}
                      <View
                        style={{
                          height: isFocused
                            ? Metrix.VerticalSize(13.5)
                            : Metrix.VerticalSize(18.01),
                          width: isFocused
                            ? Metrix.VerticalSize(13.5)
                            : Metrix.VerticalSize(18.01),
                        }}>
                        <Image
                          source={Images.Search}
                          resizeMode="contain"
                          style={{
                            height: '100%',
                            width: '100%',
                          }}
                        />
                      </View>
                      {isFocused ? (
                        <MaterialCommunityIcons
                          style={{
                            marginTop: Metrix.VerticalSize(-7),
                            marginRight: Metrix.HorizontalSize(1),
                          }}
                          name="circle-small"
                          color={Colors.Primary}
                          size={20}
                        />
                      ) : (
                        <View />
                      )}
                    </View>
                  ) : label == 'Notification' ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <MaterialCommunityIcons
                          style={{
                            marginTop: Metrix.VerticalSize(4),
                          }}
                          name="bell"
                          color={Colors.Secondary}
                          size={
                            isFocused
                              ? Metrix.VerticalSize(18)
                              : Metrix.VerticalSize(23)
                          }
                        /> */}
                      <View
                        style={{
                          height: isFocused
                            ? Metrix.VerticalSize(13.5)
                            : Metrix.VerticalSize(18),
                          width: isFocused
                            ? Metrix.VerticalSize(12.4)
                            : Metrix.VerticalSize(16.18),
                        }}>
                        <Image
                          source={Images.Bell}
                          resizeMode="contain"
                          style={{
                            height: '100%',
                            width: '100%',
                          }}
                        />
                      </View>
                      {isFocused ? (
                        <MaterialCommunityIcons
                          style={{
                            marginTop: Metrix.VerticalSize(-7),
                            marginRight: Metrix.HorizontalSize(1),
                          }}
                          name="circle-small"
                          color={Colors.Primary}
                          size={20}
                        />
                      ) : (
                        <View />
                      )}
                    </View>
                  ) : label == 'Profile' ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <MaterialCommunityIcons
                        style={{
                          marginTop: Metrix.VerticalSize(4),
                        }}
                        name="account"
                        color={Colors.Secondary}
                        size={
                          isFocused
                            ? Metrix.VerticalSize(18)
                            : Metrix.VerticalSize(24)
                        }
                      />
                      {/* <Icon name="person" /> */}
                      {isFocused ? (
                        <MaterialCommunityIcons
                          style={{
                            marginTop: Metrix.VerticalSize(-7),
                            marginRight: Metrix.HorizontalSize(1),
                          }}
                          name="circle-small"
                          color={Colors.Primary}
                          size={20}
                        />
                      ) : (
                        <View />
                      )}
                    </View>
                  ) : (
                    <View />
                  )}
                </TouchableOpacity>
              </View>
            )}
          </>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();
export const TabStack = () => (
  <Tab.Navigator
    initialRouteName="HomeScreen"
    tabBarOptions={{
      activeTintColor: '#e91e63',
      backgroundColor: 'red',
    }}
    tabBar={props => <CustomTabBar {...props} />}
    barStyle={{
      backgroundColor: Colors.Primary,
    }}>
    <Tab.Screen
      name="Create"
      component={CreatePollScreen}
      options={{
        tabBarLabel: 'Create',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="create" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          //<MaterialCommunityIcons name="home" color={color} size={size} />
          <Image source={Images.Search} />
        ),
      }}
    />
    <Tab.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({color, size}) => (
          //<MaterialCommunityIcons name="bell" color={color} size={size} />
          <Image source={Images.Search} />
        ),
      }}
    />
    <Tab.Screen
      name="NotificationScreen"
      component={NotificationScreen}
      options={{
        tabBarLabel: 'Notification',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="bell" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

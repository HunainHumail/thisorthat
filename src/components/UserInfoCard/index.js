import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Metrix, Images, NavigationService, Fonts, Colors} from '../../config';
import {Icon} from 'native-base';

export const UserInfoCard = ({
  marginTop,
  userImage,
  userName,
  userFullName,
  userBio,
  userPollCount,
  userFriendCount,
  userInterests,
  handleEditProfile,
  handleMoreFriends = () => alert('Friends'),
  me = true,
  friend = false,
}) => (
  <View
    style={{
      backgroundColor: Colors.White,
      width: Metrix.HorizontalSize(321),
      height: Metrix.VerticalSize(290),
      ...Metrix.createShadow(),
      borderRadius: Metrix.Radius,
      marginTop: marginTop
        ? Metrix.VerticalSize(marginTop)
        : Metrix.VerticalSize(29),
    }}>
    <View
      style={{
        // backgroundColor: 'red',
        width: Metrix.HorizontalSize(120),
        height: Metrix.VerticalSize(145),
        borderRadius: Metrix.Radius,
        alignSelf: 'center',
        //position: 'absolute',
        marginTop: Metrix.VerticalSize(-72.5),
        borderRadius: Metrix.Radius,
      }}>
      <View
        style={{
          // backgroundColor: 'red',
          width: Metrix.HorizontalSize(120),
          height: Metrix.VerticalSize(145),
          borderRadius: Metrix.Radius,
          alignSelf: 'center',
          //position: 'absolute',
          //borderColor: 'red',
          //borderWidth: 1,
          //  marginTop: Metrix.VerticalSize(37),
          borderRadius: Metrix.Radius,
        }}>
        <Image
          source={{uri: userImage}}
          resizeMode="cover"
          // height={Metrix.VerticalSize(145)}
          // width={Metrix.HorizontalSize(120)}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: Metrix.Radius,
          }}
        />
      </View>
      {me && (
        <TouchableOpacity
          onPress={handleEditProfile}
          style={{
            backgroundColor: Colors.Primary,
            width: Metrix.HorizontalSize(32),
            height: Metrix.HorizontalSize(32),
            borderRadius: Metrix.Radius,
            alignSelf: 'center',
            //position: 'absolute',
            marginTop: Metrix.VerticalSize(-20),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Images.EditProfile}
            resizeMode="cover"
            height={Metrix.VerticalSize(24)}
            width={Metrix.VerticalSize(24)}
          />
        </TouchableOpacity>
      )}
    </View>
    <Text
      style={{
        marginTop: Metrix.VerticalSize(45),
        alignSelf: 'center',
        fontFamily: Fonts['Lora-Bold'],
        fontSize: Metrix.customFontSize(18),
        color: Colors.Secondary,
      }}>
      {userFullName}
    </Text>
    <Text
      style={{
        marginTop: Metrix.VerticalSize(5),
        alignSelf: 'center',
        fontFamily: Fonts['Poppins-Regular'],
        fontSize: Metrix.customFontSize(13),
        color: Colors.Secondary,
      }}>
      {userName}
    </Text>
      <Text
        style={{
          width: Metrix.HorizontalSize(246),
          // height: Metrix.VerticalSize(39),
          marginTop: Metrix.VerticalSize(10),
          alignSelf: 'center',
          fontFamily: Fonts['Poppins-Regular'],
          fontSize: Metrix.customFontSize(13),
          color: Colors.TextLight,
          textAlign: 'center',
        }}>
        {userBio || "This is my bio here. I'm fun to play with. try me now!"}
      </Text>
    <View
      style={{
        //borderColor: 'black',
        //borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: Metrix.VerticalSize(16),
      }}>
      <View
        style={{
          //borderColor: 'black',
          //borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: Metrix.VerticalSize(24),
            height: Metrix.VerticalSize(24),
          }}>
          <Image
            resizeMode="contain"
            source={Images.PollCount}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <Text
          style={{
            paddingHorizontal: Metrix.HorizontalSize(5),
            fontFamily: Fonts['Poppins-Regular'],
            fontSize: Metrix.customFontSize(12),
            color: Colors.Secondary,
            //alignSelf: 'flex-end'
            //marginVertical: Metrix.VerticalSize(2),
          }}>
          {userPollCount}
        </Text>
      </View>

      <TouchableOpacity
        disabled={friend}
        onPress={handleMoreFriends}
        style={{
          //borderColor: 'black',
          //borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: Metrix.VerticalSize(18),
            height: Metrix.VerticalSize(16.2),
          }}>
          <Image
            resizeMode="contain"
            source={Images.PeopleIcon}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <Text
          style={{
            paddingHorizontal: Metrix.HorizontalSize(8),
            fontFamily: Fonts['Poppins-Regular'],
            fontSize: Metrix.customFontSize(12),
            color: Colors.Secondary,
            // marginVertical: Metrix.VerticalSize(2),
            // alignSelf: 'flex-end'
          }}>
          {userFriendCount}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

import React from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import {Metrix, Images, NavigationService, Fonts, Colors} from '../../config';
import moment from 'moment';

export const PeopleCard = ({
  name = 'abc',
  userImage,
  count = 0,
  onPress,
  isFriendRequest,
  handleRejectRequest,
  handleAcceptRequest,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      //disabled={isFriendRequest}
      style={{
        width: Metrix.HorizontalSize(341),
        //height: Metrix.VerticalSize(70),
        borderRadius: Metrix.Radius,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Metrix.HorizontalSize(15),
        marginBottom: Metrix.VerticalSize(10),
        ...Metrix.createShadow(),
        paddingVertical: Metrix.VerticalSize(19),
      }}>
      <View
        style={{
          width: '50%',
          //borderWidth: 1,
          //borderColor: 'red',
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={userImage ? {uri: userImage} : Images.EmptyUser}
            style={{
              height: Metrix.VerticalSize(32),
              width: Metrix.VerticalSize(32),
              borderRadius: Metrix.VerticalSize(5),
            }}
          />

          <View style={{marginHorizontal: Metrix.HorizontalSize(10)}}>
            <Text
              style={{
                fontFamily: Fonts['Poppins-Medium'],
                fontSize: Metrix.customFontSize(14),
                color: Colors.TextDark,
              }}>
              {name + '\n'}
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(12),
                  color: Colors.TextDark,
                }}>
                {`${count}${isFriendRequest ? ' Polls' : ' Active Polls'}`}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      {isFriendRequest && (
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            width: '50%',
            //borderWidth: 1,
            //borderColor: 'red',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={handleAcceptRequest}
            style={{
              height: Metrix.VerticalSize(32),
              width: Metrix.VerticalSize(32),
              borderRadius: Metrix.VerticalSize(5),
              marginRight: Metrix.HorizontalSize(10),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#06D41426',
            }}>
            <View
              style={{
                height: Metrix.VerticalSize(17.06),
                width: Metrix.HorizontalSize(18),
              }}>
              <Image
                source={Images.AcceptRequest}
                resizeMode="contain"
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRejectRequest}
            style={{
              height: Metrix.VerticalSize(32),
              width: Metrix.VerticalSize(32),
              borderRadius: Metrix.VerticalSize(5),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FD5E5A26',
            }}>
            <View
              style={{
                height: Metrix.VerticalSize(17.06),
                width: Metrix.HorizontalSize(18),
              }}>
              <Image
                resizeMode="contain"
                source={Images.RejectPerson}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

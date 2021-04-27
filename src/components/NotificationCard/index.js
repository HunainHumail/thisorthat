import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Metrix, Images, NavigationService, Fonts, Colors} from '../../config';
import moment from 'moment';

export const NotificationCard = ({
  type,
  name = 'abc',
  userImage,
  text = 'xyz',
  additionalText = 'lmn',
  onPress,
  isFriendRequest,
  handleRejectRequest,
  handleAcceptRequest,
  prefixed,
  loader,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      //disabled={isFriendRequest}
      style={{
        width: Metrix.HorizontalSize(341),
        // borderWidth: 1,
        //borderColor: 'red',
        ...Metrix.createShadow(),
        borderRadius: Metrix.Radius,
        backgroundColor: Colors.White,
        paddingHorizontal: Metrix.HorizontalSize(15),
        marginBottom: Metrix.VerticalSize(10),
      }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',

          marginBottom: isFriendRequest
            ? Metrix.VerticalSize(15)
            : Metrix.VerticalSize(10),
          marginTop: Metrix.VerticalSize(19),
          //marginBottom: Metrix.VerticalSize(20),
          //borderWidth: 1,
          //borderColor: 'green',
        }}>
        <Image
          source={userImage ? {uri: userImage} : Images.EmptyUser}
          style={{
            height: Metrix.VerticalSize(32),
            width: Metrix.VerticalSize(32),
            borderRadius: Metrix.VerticalSize(5),
          }}
        />

        <View
          style={{
            marginHorizontal: Metrix.HorizontalSize(10),
            // height: additionalText
            //   ? Metrix.VerticalSize(42)
            //   : Metrix.VerticalSize(20),
            //borderWidth: 1,
            //borderColor: 'red',
          }}>
          <Text
            style={{
              fontFamily: Fonts['Poppins-Regular'],
              fontSize: Metrix.customFontSize(12),
              color: Colors.TextDark,
            }}>
            {prefixed}
            <Text
              style={{
                fontFamily: Fonts['Poppins-Medium'],
                fontSize: Metrix.customFontSize(14),
                color: Colors.TextDark,
              }}>
              {`${name} `}
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(12),
                  color: Colors.TextDark,
                }}>
                {text}
              </Text>
            </Text>
          </Text>
          {additionalText && (
            <Text
              style={{
                fontFamily: Fonts['Poppins-Regular'],
                fontSize: Metrix.customFontSize(12),
                color: Colors.Primary,
              }}>
              {additionalText}
            </Text>
          )}
        </View>
      </View>

      {isFriendRequest &&
        (!loader ? (
          <View
            style={{
              //width: Metrix.HorizontalSize(),
              //height: Metrix.VerticalSize(),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: Metrix.VerticalSize(21),
              marginBottom: Metrix.VerticalSize(20),
            }}>
            <ActivityIndicator color={Colors.Secondary} size="small" />
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: Metrix.VerticalSize(21),
              marginBottom: Metrix.VerticalSize(20),
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={handleAcceptRequest}>
              <View
                style={{
                  height: Metrix.VerticalSize(18),
                  width: Metrix.VerticalSize(18),
                  borderRadius: Metrix.VerticalSize(5),
                  marginRight: Metrix.HorizontalSize(8),
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
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(12),
                  color: Colors.TextLight,
                }}>
                Accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                //marginBottom: Metrix.VerticalSize(20),
              }}
              onPress={handleRejectRequest}>
              <View
                style={{
                  height: Metrix.VerticalSize(18),
                  width: Metrix.VerticalSize(18),
                  borderRadius: Metrix.VerticalSize(5),
                  marginRight: Metrix.HorizontalSize(8),
                  //marginBottom: Metrix.VerticalSize(20),
                }}>
                <Image
                  source={Images.RejectPerson}
                  resizeMode="contain"
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(12),
                  color: Colors.TextLight,
                }}>
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        ))}
    </TouchableOpacity>
  );
};

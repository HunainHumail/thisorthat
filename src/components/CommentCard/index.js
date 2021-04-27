import React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { Metrix, Images, NavigationService, Fonts, Colors } from '../../config';
import { DropDown } from '../DropDown';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';

export const CommentCard = ({
  name = 'abc',
  userImage,
  comment = 'hello world',
  //onPress,
  myComment,
  handlePress,
  handleNavigate,
}) => {
  return (
    <TouchableOpacity
      onPress={handleNavigate}
      disabled={true}
      style={{
        width: Metrix.HorizontalSize(341),
        flexDirection: 'row',
        alignSelf: 'center',
        // alignItems: 'center',
        justifyContent: 'space-between',
        //...Metrix.createShadow(),
        marginBottom: Metrix.VerticalSize(10),
        padding: Metrix.HorizontalSize(5),
        borderRadius: Metrix.Radius,
      }}>
      <View style={{ width: '60%' }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: Metrix.VerticalSize(42),
              width: Metrix.VerticalSize(42),
              borderRadius: Metrix.Radius,
            }}>
            <Image
              resizeMode="cover"
              source={userImage ? { uri: userImage } : Images.EmptyUser}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: Metrix.Radius,
              }}
            />
          </View>

          <View style={{ marginHorizontal: Metrix.HorizontalSize(10) }}>
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
                  color: Colors.TextLight,
                }}>
                {comment}
              </Text>
            </Text>
          </View>
        </View>
      </View>

      {myComment && (
        <View>
          <DropDown handlePress={handlePress} />
        </View>
      )}
    </TouchableOpacity>
  );
};

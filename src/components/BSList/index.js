import React from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';
import {Metrix, Colors, Fonts, Images} from '../../config';

export const BSList = ({
  text,
  icon,
  onPress,
  noBorder,
  isChecked = false,
  topBorder = false,
  imgHeight = 24,
  imgWidth = 24,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      {
        flexDirection: 'row',
        height: Metrix.VerticalSize(55),
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      noBorder
        ? {borderBottomWidth: 0}
        : {borderBottomColor: Colors.Border, borderBottomWidth: 1},
      !topBorder
        ? {borderTopWidth: 0}
        : {borderTopColor: Colors.Border, borderTopWidth: 1},
    ]}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          alignItems: 'center',
          marginLeft: Metrix.HorizontalSize(10),
        }}>
        <View
          style={{
            width: Metrix.VerticalSize(imgWidth),
            alignItems: 'center',
            justifyContent: 'center',
            height: Metrix.VerticalSize(imgHeight),
          }}>
          <Image
            resizeMode="contain"
            style={{
              height: '100%',
              width: '100%',
            }}
            source={icon}
          />
        </View>
      </View>
      <View style={{marginLeft: Metrix.HorizontalSize(10)}}>
        <Text
          style={{
            fontFamily: Fonts['Poppins-Regular'],
            fontSize: Metrix.FontExtraSmall,
            color: Colors.TextLight,
          }}>
          {text}
        </Text>
      </View>
    </View>
    {isChecked && (
      <View
        style={{
          height: Metrix.VerticalSize(24),
          width: Metrix.VerticalSize(24),
        }}>
        <Image
          resizeMode="contain"
          style={{
            height: '100%',
            width: '100%',
          }}
          source={Images.Check}
        />
      </View>
    )}
  </TouchableOpacity>
);

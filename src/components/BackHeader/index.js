import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Metrix, Images, NavigationService, Fonts, Colors } from '../../config';
import Feather from 'react-native-vector-icons/Feather';

export const BackHeader = ({ text, onPress, onPressRight }) => (

  <View
    style={{
      width: Metrix.HorizontalSize(),
      alignItems: 'center',
      flexDirection: 'row',
      height: Metrix.VerticalSize(70),
      backgroundColor: Colors.AppBackgroud,
    }}>
    <View
      style={{
        width: '15%',
        height: '100%',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={onPress ? onPress : () => NavigationService.goBack()}
        style={{
          height: Metrix.VerticalSize(55),
          width: Metrix.VerticalSize(55),
          borderRadius: Metrix.VerticalSize(50),
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: Metrix.HorizontalSize(5),
        }}>
        <View
          style={{
            width: Metrix.HorizontalSize(24),
            height: Metrix.VerticalSize(24),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{
              height: '70%',
              width: '70%',
            }}
            source={Images.ArrowBack}
          />
        </View>
      </TouchableOpacity>
    </View>
    <View
      style={{
        width: '70%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontFamily: Fonts['Poppins-Medium'],
          fontSize: Metrix.FontSmall,
          color: Colors.TextLight,
        }}>
        {text}
      </Text>
    </View>
    {
      onPressRight &&
      <View style={{ width: '15%', paddingLeft: Metrix.HorizontalSize(8) }}>
        <TouchableOpacity onPress={onPressRight}>
          <Feather color={Colors.TextDark} name="more-horizontal" size={24} ></Feather>
        </TouchableOpacity>
      </View>

    }

  </View>
);

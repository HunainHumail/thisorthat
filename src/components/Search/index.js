import React from 'react';
import {View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import {Metrix, Images, NavigationService, Fonts, Colors} from '../../config';
import {Icon} from 'native-base';

export const Search = ({searchText, marginTop, onChange, onSearch}) => (
  <View
    style={{
      width: Metrix.HorizontalSize(299),
      height: Metrix.VerticalSize(50),
      alignSelf: 'center',
      // alignItems: 'center',
      // justifyContent: 'center',
      paddingLeft: Metrix.HorizontalSize(18.85),
      //flexDirection: 'row',
      backgroundColor: Colors.White,
      ...Metrix.createShadow(),
      borderRadius: Metrix.Radius,
      marginTop: marginTop ? marginTop : Metrix.VerticalSize(26.23),
      //borderColor: 'black',
      //borderWidth: 1,
    }}>
    <View
      style={{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // borderColor: 'black',
        // borderWidth: 1,
      }}>
      <View
        style={{
          width: Metrix.HorizontalSize(18),
          height: Metrix.VerticalSize(18),
          //borderColor: 'red',
          //borderWidth: 1
        }}>
        <Image
          source={Images.SearchPrimary}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
            //borderColor: 'red',
            //borderWidth: 1
          }}
        />
      </View>
      <TextInput
        onChangeText={onChange}
        value={searchText}
        placeholder="Search"
        placeholderTextColor={Colors.TextLight}
        style={{
          width: Metrix.HorizontalSize(248),
          height: Metrix.VerticalSize(50),
          marginLeft: Metrix.HorizontalSize(14.15),
          borderRadius: Metrix.Radius,
          fontFamily: Fonts['Poppins-Regular'],
          fontSize: Metrix.customFontSize(13),
          color: Colors.TextLight,
          // borderColor: 'red',
          //borderWidth: 1,
        }}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />
    </View>
  </View>
);

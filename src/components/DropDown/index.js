import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import {Metrix, Images, NavigationService, Fonts, Colors} from '../../config';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export const DropDown = ({handlePress}) => {
  const [open, setOpen] = useState(false);

  const onTriggerPress = () => {
    setOpen(!open);
  };

  const onBackdropPress = () => {
    setOpen(false);
  };
  const onOptionSelect = value => {
    //alert(`Selected number: ${value}`);
    handlePress();
    setOpen(false);
  };

  return (
    <MenuProvider
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Metrix.VerticalSize(30),
        marginRight: Metrix.HorizontalSize(30),
        marginLeft: Metrix.HorizontalSize(100),
      }}>
      <Menu
        opened={open}
        onBackdropPress={onBackdropPress}
        onSelect={value => onOptionSelect(value)}>
        <MenuTrigger
          text={
            <Feather color={Colors.TextDark} name="more-horizontal" size={24} />
          }
          onPress={onTriggerPress}
        />
        <MenuOptions optionsContainerStyle={{}}>
          <MenuOption
            style={{
              width: Metrix.HorizontalSize(111),
            }}
            value={1}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Images.TrashIcon}
                style={{
                  width: Metrix.VerticalSize(18),
                  height: Metrix.VerticalSize(18),
                }}
              />
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  marginLeft: Metrix.HorizontalSize(5),
                  fontSize: Metrix.customFontSize(11),
                }}>
                Delete Comment
              </Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
};

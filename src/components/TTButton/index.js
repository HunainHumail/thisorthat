import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {Metrix, Colors, Fonts} from '../../config';

export const TTButton = ({
  text,
  item,
  onPress,
  isLoading,
  width = 170,
  height = 50,
  disabled,
  color = Colors.Primary,
  textColor = Colors.Secondary,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      borderRadius: Metrix.VerticalSize(25),
      backgroundColor: disabled ? Colors.DisabledColor : color,
      height: Metrix.VerticalSize(height),
      width: Metrix.HorizontalSize(width),
      justifyContent: 'center',
      alignItems: 'center',
    }}
    disabled={disabled || isLoading}>
    {isLoading ? (
      <ActivityIndicator color={textColor} />
    ) : (
      item || (
        <Text
          style={{
            fontFamily: Fonts['Poppins-SemiBold'],
            fontSize: Metrix.FontSmall,
            color: textColor,
          }}>
          {text}
        </Text>
      )
    )}
  </TouchableOpacity>
);

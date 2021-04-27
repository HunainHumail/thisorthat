import React from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Colors, Metrix, Fonts, Images } from '../../config';

export const WarningModal = ({
  showWarningModal,
  toggleWarningModal,
  text,
  handleOkPress,
  loader,
  whichModal
}) => {
  return (
    <Modal transparent={true} visible={showWarningModal} style={{ width: 100, height: 100, backgroundColor: "pink" }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          whichModal == "commentDelete" ? toggleWarningModal("commentDeleteDone") : toggleWarningModal()
        }
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}>
        <TouchableHighlight>
          <View
            style={{
              width: Metrix.HorizontalSize(311),
              height: Metrix.VerticalSize(166),
              borderRadius: Metrix.Radius,
              ...Metrix.createShadow(),
              paddingLeft: Metrix.HorizontalSize(15),
              paddingRight: Metrix.HorizontalSize(13),
            }}>
            <Text
              style={{
                fontFamily: Fonts['Poppins-Regular'],
                fontSize: Metrix.customFontSize(13),
                color: Colors.TextLight,
                marginTop: Metrix.VerticalSize(29.5),
                marginBottom: Metrix.VerticalSize(32),
                textAlign: 'center',
              }}>
              {text}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={handleOkPress}
                style={{
                  height: Metrix.VerticalSize(40),
                  width: Metrix.HorizontalSize(86),
                  borderRadius: Metrix.VerticalSize(86 / 2),
                  ...Metrix.createShadow(),
                  backgroundColor: Colors.AppBackgroud,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: Metrix.VerticalSize(10),
                }}>
                {loader ? (
                  <View
                    style={{
                      width: Metrix.HorizontalSize(24),
                      height: Metrix.HorizontalSize(24),

                    }}>
                    <ActivityIndicator color={Colors.Primary} size="small" />
                  </View>
                ) :
                  <Text
                    style={{
                      fontFamily: Fonts['Poppins-Medium'],
                      fontSize: Metrix.customFontSize(12),
                      color: Colors.TextDark,

                      //textAlign: 'center',
                    }}>
                    Yes
                </Text>}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  whichModal == "commentDelete" ? toggleWarningModal("commentDeleteDone") : toggleWarningModal()
                }
                style={{
                  height: Metrix.VerticalSize(40),
                  width: Metrix.HorizontalSize(86),
                  borderRadius: Metrix.VerticalSize(86 / 2),
                  ...Metrix.createShadow(),
                  backgroundColor: Colors.Primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts['Poppins-Medium'],
                    fontSize: Metrix.customFontSize(12),
                    color: Colors.White,

                    //textAlign: 'center',
                  }}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
};

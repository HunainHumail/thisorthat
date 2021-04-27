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
} from 'react-native';
import {Colors, Metrix, Fonts, Images} from '../../config';

export const InterestModal = ({
  showModal,
  toggleModal,
  interests,
  selected,
  itemPress,
}) => {
  return (
    <Modal transparent={true} visible={showModal}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          toggleModal();
        }}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}>
        <TouchableHighlight>
          <View
            style={{
              width: Metrix.HorizontalSize(321),
              height: Metrix.VerticalSize(398),
              borderRadius: Metrix.Radius,
              ...Metrix.createShadow(),
              paddingLeft: Metrix.HorizontalSize(8),
              paddingRight: Metrix.HorizontalSize(13),
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: Metrix.VerticalSize(25),
              }}>
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(14),
                }}>
                Choose a category to filter polls.
              </Text>
            </View>
            <View
              style={{
                height: Metrix.VerticalSize(305),
              }}>
              <ScrollView>
                <FlatList
                  //numColumns="3"
                  contentContainerStyle={{
                    marginTop: Metrix.VerticalSize(25),
                    marginBottom: Metrix.VerticalSize(25),
                    flexDirection: 'row',
                    flex: 1,
                    flexWrap: 'wrap',
                  }}
                  data={interests}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() => {
                        itemPress(item.id);
                        toggleModal();
                      }}
                      style={[
                        {
                          height: Metrix.VerticalSize(40),
                          borderRadius: Metrix.VerticalSize(25),
                          marginLeft: Metrix.HorizontalSize(5),
                          marginTop: Metrix.VerticalSize(20),
                          paddingHorizontal: Metrix.HorizontalSize(22),
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                        item.id == selected
                          ? {backgroundColor: Colors.AlertRed}
                          : {backgroundColor: Colors.DisabledGrey},
                      ]}>
                      <Text
                        style={[
                          {
                            fontFamily: Fonts['Poppins-Medium'],
                            fontSize: Metrix.customFontSize(11),
                          },
                          item.id == selected
                            ? {color: Colors.White}
                            : {color: Colors.TextDark},
                        ]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index}
                  scrollEnabled={false}
                />
              </ScrollView>
            </View>
          </View>
        </TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
};

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

export const UserInterestModal = ({
  showModal,
  toggleModal,
  interests,
  selected,
  itemPress,
  name = 'abc',
  count = 0,
  userImage,
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
              width: Metrix.HorizontalSize(311),
              height: Metrix.VerticalSize(330),
              borderRadius: Metrix.Radius,
              ...Metrix.createShadow(),
              paddingLeft: Metrix.HorizontalSize(15),
              paddingRight: Metrix.HorizontalSize(13),
            }}>
            <View
              style={{
                alignItems: 'center',
                //justifyContent: 'center',
                marginTop: Metrix.VerticalSize(28),
                flexDirection: 'row',
              }}>
              <View>
                <Image
                  source={userImage ? {uri: userImage} : Images.EmptyUser}
                  style={{
                    height: Metrix.VerticalSize(32),
                    width: Metrix.VerticalSize(32),
                    borderRadius: Metrix.VerticalSize(5),
                  }}
                />
              </View>
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
                    {count + ' Polls'}
                  </Text>
                </Text>
              </View>
            </View>
            {/* <View
              style={{
                height: Metrix.VerticalSize(200),
                borderWidth: 1,
                borderColor: 'red',
              }}> */}
            <ScrollView
              contentContainerStyle={{
                // height: Metrix.VerticalSize(150),
                marginBottom: Metrix.VerticalSize(10),
              }}>
              <FlatList
                //nestedScrollEnabled
                contentContainerStyle={{
                  marginTop: Metrix.VerticalSize(25),
                  marginBottom: Metrix.VerticalSize(25),
                  flexDirection: 'row',
                  flex: 1,
                  flexWrap: 'wrap',
                }}
                //numColumns="3"
                data={interests}
                showsVerticalScrollIndicator={true}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    //onPress={() => { alert('hey') }}
                    style={[
                      {
                        height: Metrix.VerticalSize(40),
                        borderRadius: Metrix.VerticalSize(25),
                        marginLeft: Metrix.HorizontalSize(5),
                        marginTop: Metrix.VerticalSize(10),
                        paddingHorizontal: Metrix.HorizontalSize(22),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: item.color_code,
                      },
                    ]}>
                    <Text
                      style={[
                        {
                          fontFamily: Fonts['Poppins-Medium'],
                          fontSize: Metrix.customFontSize(11),
                          color: Colors.White,
                        },
                      ]}>
                      {item.item || item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index}
                scrollEnabled={false}
              />
            </ScrollView>
            {/* </View> */}
          </View>
        </TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
};

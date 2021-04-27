import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal
} from 'react-native';
import { Metrix, Colors, Images, Fonts, NavigationService } from '../../config';
import { TTButton, BackHeader, ImagePickerModal } from '../../components/';
import { AuthActions } from '../../store/actions';
import { connect } from 'react-redux';
// import ImagePicker from 'react-native-image-picker';
import { showToast, validateTitle } from '../../config/utills';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const CreatePollScreen = props => {
  const [title, setTitle] = useState('');
  const [imageModal, setImageModal] = useState(false)
  const [imageIndex, setImageIndex] = useState('')
  const [images, setImages] = useState([
    {
      type: 'image',
      url: '',
    },
    {
      type: 'image',

      url: '',
    },
    {
      type: 'add_image',
    },
  ]);
  const addAnother = () => {
    let newImage = [...images];
    newImage.splice(newImage.length - 1, 0, { type: 'image', url: '' });
    setImages(newImage);
  };

  const addImage = (response, index) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      console.log('ImagePicker ', response);
      const source = {
        name: response.fileName || response.uri.split("/")[response.uri.split("/").length - 1],
        type: response.type,
        uri:
          Platform.OS === 'android'
            ? response.uri
            : response.uri.replace('file://', ''),
      };
      let new_image = [...images];
      new_image[index].url = source;
      setImages(new_image);
    }
  }

  const openCamera = index => {
    launchCamera({ mediaType: "photo", cameraType: "back" }, (response) => {
      addImage(response, index)
    })
  };

  const openGallery = index => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      addImage(response, index)
    })
  }

  const goToStep2 = () => {
    let new_images = [...images];
    new_images.pop();
    let final_data = new_images.filter(item => !item.url == '');
    console.log('final data from create poll', final_data);
    if (title) {
      if (validateTitle(title)) {
        if (final_data.length > 1) {
          NavigationService.navigate('CreatePollScreen2', {
            title,
            options: final_data,
            from: 'CreatePoll',
          });
        } else {
          showToast('Please select atleast 2 images');
        }
      } else {
        showToast(
          'Title should be minimum 3 and maximum of 50 alphanumeric characters',
        );
      }
    } else {
      showToast('Required field cannot be left empty');
    }
  };

  return (
    <View>
      <BackHeader text={'Create new poll'} />
      <ScrollView>
        <View
          style={{
            backgroundColor: Colors.AppBackgroud,
            width: Metrix.HorizontalSize(),
            paddingHorizontal: Metrix.HorizontalSize(17),
          }}>
          <View
            style={{
              width: Metrix.HorizontalSize(311),
              height: Metrix.VerticalSize(100),
              borderRadius: Metrix.Radius,
              ...Metrix.createShadow(),
              backgroundColor: Colors.White,
              marginTop: Metrix.VerticalSize(40),
              paddingTop: Metrix.VerticalSize(8),
              alignSelf: 'center',
            }}>
            <TextInput
              numberOfLines={2}
              textAlignVertical={'top'}
              style={{
                height: Metrix.VerticalSize(70),
                width: Metrix.HorizontalSize(311),
                fontFamily: Fonts['Poppins-Regular'],
                fontSize: Metrix.customFontSize(13),
                paddingHorizontal: Metrix.HorizontalSize(15),
                borderRadius: Metrix.Radius,
              }}
              placeholder={'Give a title to your poll'}
              placeholderTextColor={Colors.TextLight}
              multiline={true}
              value={title}
              onChangeText={title => setTitle(title)}
              maxLength={50}
            />
            <Text
              style={{
                alignSelf: 'flex-end',
                marginRight: Metrix.HorizontalSize(10),
                fontFamily: Fonts['Poppins-Regular'],
                fontSize: Metrix.FontExtraSmall,
                color: Colors.Primary,
                // marginTop: Metrix.VerticalSize(5),
              }}>
              {title.length}/50
            </Text>
          </View>
          <View
            style={{
              marginTop: Metrix.VerticalSize(35),
            }}>
            <Text
              style={{
                fontFamily: Fonts['Lora-Bold'],
                fontSize: Metrix.FontMedium,
                color: Colors.TextDark,
              }}>
              Add Options
            </Text>
            <Text
              style={{
                fontFamily: Fonts['Poppins-Regular'],
                fontSize: Metrix.customFontSize(13),
                color: Colors.TextLight,
              }}>
              You can add upto 05 options
            </Text>
          </View>
          <View>
            <FlatList
              data={images}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <>
                    {item.type == 'image' ? (
                      <TouchableOpacity
                        onPress={() => {
                          setImageIndex(index);
                          setImageModal(true)
                        }}
                        // activeOpacity={item.url ? 1 : 0}
                        // disabled={item.url ? true : false}
                        style={{
                          width: Metrix.HorizontalSize(220),
                          height: Metrix.VerticalSize(336),
                          borderStyle: 'dashed',
                          borderRadius: 1,
                          borderWidth: 1,
                          borderColor: Colors.Primary,
                          marginLeft: Metrix.HorizontalSize(10),
                          marginTop: Metrix.VerticalSize(25),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: Metrix.Radius,
                          zIndex: 2,
                          padding: Metrix.VerticalSize(15),
                        }}>
                        {item.url ? (
                          <View
                            style={{
                              width: Metrix.VerticalSize(230),
                              height: Metrix.VerticalSize(320),
                            }}>
                            <Image
                              style={{
                                height: '100%',
                                width: '100%',
                                borderRadius: Metrix.Radius,
                              }}
                              source={item.url}
                            />
                          </View>
                        ) : (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                width: Metrix.VerticalSize(31),
                                height: Metrix.VerticalSize(31),
                              }}>
                              <Image
                                style={{
                                  height: '100%',
                                  width: '100%',
                                }}
                                source={Images.ImageIcon}
                              />
                            </View>

                            <Text
                              style={{
                                fontFamily: Fonts['Poppins-Regular'],
                                fontSize: Metrix.customFontSize(13),
                                color: Colors.TextLight,
                                marginTop: Metrix.VerticalSize(15),
                              }}>
                              Tap to add an image
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    ) : images.length >= 6 ? (
                      <View />
                    ) : (
                      <TouchableOpacity
                        onPress={() => addAnother()}
                        style={{
                          width: Metrix.HorizontalSize(210),
                          height: Metrix.VerticalSize(336),
                          marginLeft: Metrix.HorizontalSize(10),
                          marginTop: Metrix.VerticalSize(25),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            width: Metrix.VerticalSize(31),
                            height: Metrix.VerticalSize(31),
                          }}>
                          <Image
                            style={{
                              height: '100%',
                              width: '100%',
                            }}
                            source={Images.AddIcon}
                          />
                        </View>
                        <Text
                          style={{
                            fontFamily: Fonts['Poppins-Regular'],
                            fontSize: Metrix.customFontSize(13),
                            color: Colors.TextLight,
                            marginTop: Metrix.VerticalSize(15),
                          }}>
                          Add another option
                        </Text>
                      </TouchableOpacity>
                    )}
                    <View
                      style={[
                        {
                          height: Metrix.VerticalSize(40),
                          marginTop: Metrix.VerticalSize(370),
                          justifyContent: 'center',
                          // backgroundColor: 'red',
                        },
                        index == 0
                          ? {
                            width: Metrix.HorizontalSize(210),
                            marginLeft: Metrix.HorizontalSize(-210),
                          }
                          : {
                            width: Metrix.HorizontalSize(223),
                            marginLeft: Metrix.HorizontalSize(-222),
                          },
                      ]}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View
                          style={[
                            {
                              // backgroundColor: 'blue',
                              marginTop: Metrix.VerticalSize(12),
                              width: Metrix.HorizontalSize(90),
                              borderTopWidth: 0,
                              borderTopColor: Colors.Primary,
                            },
                            index == 0
                              ? {
                                width: Metrix.HorizontalSize(100),
                                borderTopWidth: 0,
                              }
                              : {
                                width: Metrix.HorizontalSize(112),
                                borderTopWidth: 1,
                                borderTopColor: Colors.Primary,
                              },
                          ]}
                        />
                        <View
                          style={[
                            {
                              height: Metrix.VerticalSize(24),
                              width: Metrix.VerticalSize(24),
                              borderRadius: Metrix.VerticalSize(24 / 2),
                              borderWidth: Metrix.VerticalSize(1),
                              borderColor: Colors.Primary,
                              alignItems: 'center',
                              justifyContent: 'center',
                            },
                            index == images.length - 1 && index != 5
                              ? {
                                backgroundColor: Colors.Primary,
                              }
                              : {},
                          ]}>
                          <Text
                            style={{
                              fontFamily: Fonts['Lora-Bold'],
                              fontSize: Metrix.FontExtraSmall,
                              color: Colors.TextLight,
                              marginTop: Metrix.VerticalSize(-4),
                            }}>
                            {index == images.length - 1 ? '' : `0${index + 1}`}
                          </Text>
                        </View>

                        <View
                          style={[
                            {
                              marginTop: Metrix.VerticalSize(12),
                              width: Metrix.HorizontalSize(92),
                            },
                            index == images.length - 1 || index == 4
                              ? {
                                borderTopWidth: 0,
                              }
                              : {
                                width: Metrix.HorizontalSize(112),
                                borderTopWidth: 1,
                                borderTopColor: Colors.Primary,
                              },
                          ]}
                        />
                      </View>
                    </View>
                  </>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: Metrix.VerticalSize(30),
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: Metrix.VerticalSize(100),
            }}>
            <Text
              style={{
                fontFamily: Fonts['Poppins-Regular'],
                fontSize: Metrix.customFontSize(13),
                color: Colors.TextLight,
              }}>
              Step 01 of 03
            </Text>
            <TTButton text={'Next Step'} onPress={() => goToStep2()} />
          </View>
        </View>
      </ScrollView>

      <ImagePickerModal
        visible={imageModal}
        onRequestClose={() => { setImageModal(false) }}
        onPressCamera={() => { openCamera(imageIndex) }}
        onPressGallery={() => { openGallery(imageIndex) }}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePollScreen);

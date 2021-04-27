import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Metrix, Colors, Images, Fonts, NavigationService } from '../../config';
import {
  TTButton,
  BackHeader,
  UserInfoCard,
  UserInterestModal,
  PollCard,
  ImagePickerModal
} from '../../components/';
import { ProfileActions, HomeActions } from '../../store/actions';
import { connect } from 'react-redux';
import CommonHeader from '../CommonHeader';
import RBSheet from 'react-native-raw-bottom-sheet';
import { editProfile } from '../../store/sagas/ProfileSaga';
import { showToast } from '../../config/utills';
//import { editProfile } from '../../store/sagas/ProfileSaga';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const EditProfile = props => {
  const [selected, setSelected] = useState([]);
  const [interestName, setInterestName] = useState([]);
  const [bioText, setBioText] = useState('');
  const [bioTextCount, setBioTextCount] = useState(0);
  const [image, setImage] = useState(null);
  const [isImageChanged, setImageChanged] = useState(false);
  const [imageModal, setImageModal] = useState(false)

  const select = params => {
    console.log(params, 'param from edit profile func');
    let selectedState = [...selected];
    let selectedInterests = [...interestName];
    if (!selectedState.includes(params.item)) {
      selectedState.push(params.item);
      selectedInterests.push(params.item);
    } else {
      selectedState.splice(selectedState.indexOf(params.item), 1);
      selectedInterests.splice(selectedState.indexOf(params.item), 1);
    }
    setSelected(selectedState);
    setInterestName(selectedInterests);
  };

  const addImage = (response) => {
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
      let new_image = {};
      new_image = source;
      console.log(
        new_image,
        'new image var',
        source,
        'source const from edit profile addImage func',
      );
      setImage(new_image);
      setImageChanged(true);
    }
  }

  const openCamera = () => {
    launchCamera({ mediaType: "photo", cameraType: "back" }, (response) => {
      addImage(response)
    })
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      addImage(response)
    })
  }

  useEffect(() => {
    props.getUserDetail({
      callBack: param => {
        console.log(param, 'from call back');
        setInterestName(param.user_interests.map(p => p.item));
        setSelected(param.user_interests.map(p => p.item));
        setBioText(param.user_description);
        setImage({ uri: param.user_image });
      },
    });
  }, []);
  const editProfile = () => {
    if (interestName.length < 4) return showToast('Select at least 4 interest');
    props.editProfile({
      description: bioText,
      //'interests[]': interestName.map(intrest => intrest),
      interests: JSON.stringify(interestName),
      profile_image: isImageChanged ? image : null,
    });
  };
  console.log(image, 'this is intrests names from edit profile');
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.AppBackgroud }}>
      <BackHeader text="Edit Profile" />
      {props.isLoading ? (
        <View
          style={{
            width: Metrix.HorizontalSize(),
            height: Metrix.VerticalSize(),
            paddingBottom: Metrix.VerticalSize(100),
            backgroundColor: Colors.AppBackgroud,
            paddingTop: Metrix.VerticalSize(320),
          }}>
          <ActivityIndicator color={Colors.Secondary} size="large" />
        </View>
      ) : (
        <View>
          <View
            style={{
              // backgroundColor: 'red',
              width: Metrix.HorizontalSize(120),
              height: Metrix.VerticalSize(145),
              borderRadius: Metrix.Radius,
              alignSelf: 'center',
              //position: 'absolute',
              //borderColor: 'red',
              //borderWidth: 1,
              marginTop: Metrix.VerticalSize(37),
              borderRadius: Metrix.Radius,
            }}>
            <View
              style={{
                // backgroundColor: 'red',
                width: Metrix.HorizontalSize(120),
                height: Metrix.VerticalSize(145),
                borderRadius: Metrix.Radius,
                alignSelf: 'center',
                //position: 'absolute',
                // borderColor: 'red',
                //borderWidth: 1,
                //  marginTop: Metrix.VerticalSize(37),
                borderRadius: Metrix.Radius,
              }}>
              <Image
                source={image?.uri ? { uri: image?.uri } : Images.EmptyUser}
                resizeMode="cover"
                // height={Metrix.VerticalSize(145)}
                // width={Metrix.HorizontalSize(120)}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: Metrix.Radius,
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => setImageModal(true)}
              style={{
                backgroundColor: Colors.Primary,
                width: Metrix.HorizontalSize(32),
                height: Metrix.HorizontalSize(32),
                borderRadius: Metrix.Radius,
                alignSelf: 'center',
                //position: 'absolute',
                marginTop: Metrix.VerticalSize(-20),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={Images.UploadImage}
                resizeMode="cover"
                height={Metrix.VerticalSize(24)}
                width={Metrix.VerticalSize(24)}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: Metrix.VerticalSize(39),
              height: Metrix.VerticalSize(200),
              width: Metrix.HorizontalSize(311),
              borderRadius: Metrix.Radius,
              ...Metrix.createShadow(),
              alignSelf: 'center',
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.Border,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: Metrix.HorizontalSize(20),
                paddingVertical: Metrix.HorizontalSize(10),
              }}>
              <View
                style={{
                  width: Metrix.HorizontalSize(18),
                  height: Metrix.VerticalSize(18),
                  marginRight: Metrix.HorizontalSize(15),
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={Images.PersonIcon}
                />
              </View>
              <Text
                style={{
                  //borderWidth: 1,
                  //borderColor: 'red',
                  color: Colors.DisabledGrey,
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(13),
                  flex: 1,
                }}>
                {props?.userDetail?.user_fullname}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.Border,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: Metrix.HorizontalSize(20),
                paddingVertical: Metrix.HorizontalSize(10),
              }}>
              <View
                style={{
                  width: Metrix.VerticalSize(22),
                  height: Metrix.VerticalSize(22),
                  marginRight: Metrix.HorizontalSize(15),
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={Images.MapPin}
                />
              </View>
              <Text
                style={{
                  //borderWidth: 1,
                  //borderColor: 'red',
                  color: Colors.DisabledGrey,
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(13),
                  flex: 1,
                }}>
                {props?.userDetail?.username}
              </Text>
            </View>
            <View
              style={{
                height: Metrix.VerticalSize(70),
                //borderWidth: 1,
                //borderColor: 'black',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: Metrix.HorizontalSize(20),
              }}>
              <View
                style={{
                  width: Metrix.HorizontalSize(18),
                  height: Metrix.VerticalSize(18),
                  marginRight: Metrix.HorizontalSize(15),
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={Images.InfoIcon}
                />
              </View>
              <TextInput
                maxLength={90}
                value={bioText}
                placeholder="Enter your bio.."
                placeholderTextColor={Colors.TextLight}
                onChangeText={e => {
                  setBioText(e);
                  setBioTextCount(e.length);
                }}
                style={{
                  //borderWidth: 1,
                  //borderColor: 'red',
                  color: Colors.TextLight,
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(13),
                  flex: 1,
                }}
              />
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                padding: Metrix.VerticalSize(10),
              }}>
              <Text
                style={{
                  color: Colors.Primary,
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(12),
                }}>
                {`${bioTextCount}/90`}
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginHorizontal: Metrix.HorizontalSize(17),
              marginTop: Metrix.VerticalSize(29),
              marginBottom: Metrix.VerticalSize(15),
              fontFamily: Fonts['Lora-Bold'],
              fontSize: Metrix.customFontSize(18),
              color: Colors.TextDark,
            }}>
            {' '}
            Your Interests
          </Text>
          <ScrollView
            style={{
              height: Metrix.VerticalSize(365),
              width: Metrix.HorizontalSize(335),

              alignSelf: 'center',
              //borderWidth: 1,
              //borderColor: 'red',
            }}>
            <FlatList
              data={props.interests}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                //marginTop: Metrix.VerticalSize(25),
                marginBottom: Metrix.VerticalSize(25),
                flexDirection: 'row',
                flex: 1,
                flexWrap: 'wrap',
                //alignSelf: 'center',
              }}
              //numColumns={3}
              ListEmptyComponent={() => {
                return (
                  <View>
                    {props.isLoading ? (
                      <View style={{ marginTop: Metrix.VerticalSize(150) }}>
                        <ActivityIndicator
                          size="large"
                          color={Colors.Secondary}
                        />
                      </View>
                    ) : (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text>there is no data</Text>
                      </View>
                    )}
                  </View>
                );
              }}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => select({ id: index, item: item.name })}
                      style={[
                        {
                          height: Metrix.VerticalSize(40),
                          borderRadius: Metrix.VerticalSize(25),
                          marginLeft: Metrix.HorizontalSize(5),
                          marginTop: Metrix.VerticalSize(20),
                          paddingHorizontal: Metrix.HorizontalSize(24),
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                        selected.includes(item.name)
                          ? { backgroundColor: item.color_code }
                          : { backgroundColor: Colors.DisabledGrey },
                      ]}>
                      <Text
                        style={[
                          {
                            fontFamily: Fonts['Poppins-Medium'],
                            fontSize: Metrix.FontExtraSmall,
                          },
                          selected.includes(item.name)
                            ? { color: Colors.White }
                            : { color: Colors.TextDark },
                        ]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index}
            //numColumns={3}
            />
          </ScrollView>
          <View
            style={{
              alignSelf: 'center',
              marginTop: Metrix.VerticalSize(60),
              marginBottom: Metrix.VerticalSize(25),
            }}>
            <TTButton text="Save Changes" onPress={editProfile} />
          </View>
        </View>
      )}
      <ImagePickerModal
        visible={imageModal}
        onRequestClose={() => { setImageModal(false) }}
        onPressCamera={openCamera}
        onPressGallery={openGallery}
      />
    </ScrollView>

  );
};

const mapStateToProps = state => {
  //console.log('from map state edit profile screen', state.Profile.userDetail);
  return {
    isLoading: state.Profile.isLoading,
    userDetail: state.Profile.userDetail,
    interests: state.Auth.interests,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserDetail: payload => dispatch(ProfileActions.getUserDetail(payload)),
    editProfile: payload => dispatch(ProfileActions.editProfile(payload)),
    getInterests: payload => dispatch(AuthActions.getInterests(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile);

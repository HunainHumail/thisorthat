import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Metrix, Colors, Images, Fonts} from '../../config';
import {
  UserInterestModal,
  Search,
  BackHeader,
  TTButton,
} from '../../components/';
import {HomeActions, ProfileActions} from '../../store/actions';
import {connect} from 'react-redux';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';

//const friends_data = [];
const InviteFriendScreen = props => {
  const [selected, setSelected] = useState([]);
  const [disableUnselect, setDisableUnselect] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [intrestsState, setIntrestsState] = useState(null);
  const toggleModal = i => {
    //alert(i);
    //console.log('\n\n');
    // console.log(i, 'from toggle func invite friend screen');
    setIntrestsState(i);
    setShowModal(!showModal);
  };
  const handleSearch = e => {
    setSearch(e);
    //alert(e)
    props.getUserFriends({id: props.user?.user_id, search: e});
  };

  const select = params => {
    console.log(
      params,
      'in func select',
      selected,
      'this is selected',
      props?.route?.params?.from,
      'from',
    );
    //return;
    let selectedState = [...selected];
    if (!disableUnselect?.includes(params.id)) {
      if (!selectedState?.includes(params.id)) {
        selectedState?.push(params.id);
      } else {
        selectedState?.splice(selectedState?.indexOf(params.id), 1);
      }
      setSelected(selectedState);
    }
  };

  useEffect(() => {
    if (props?.route?.params?.from != 'CreatePoll') {
      setSelected(props?.route?.params?.members);
      setDisableUnselect(props?.route?.params?.members);
    }
    props.getUserFriends({id: props.user?.user_id, search: ''});
    // props.navigation.addListener('focus', () => {
    //   setSearch('');
    //   props.getUserFriends({id: props.user?.user_id, search: ''});
    // });
  }, []);
  const createPoll = () => {
    props.createPoll({
      //...props.route.params,
      title: props?.route?.params?.title,
      'options[]': props?.route?.params?.options?.map(img => img.url),
      expiration_time: props?.route?.params?.new_utc_time,
      privacy_type: props?.route?.params?.toggle ? 'Public' : 'Friends',
      interest_ids: JSON.stringify(props?.route?.params?.interest_ids),
      // members: JSON.stringify([...new Set(selected.map(m => +m))]),
      ...(selected?.length > 0 && {
        members: JSON.stringify([...new Set(selected?.map(m => +m))]),
      }),
    });
  };
  const editPoll = () => {
    const newSelection = selected.filter(s => !disableUnselect.includes(s));
    console.log(
      newSelection,
      'newSelection',
      disableUnselect,
      'old selection',
      selected,
      'selected',
    );
    //return;
    props.editPoll({
      expiration_time: props?.route?.params?.new_utc_time,
      //interests_ids: JSON.stringify(props.route.params.interest_ids),
      interest_ids: props?.route?.params?.interest_ids,
      id: props?.route?.params?.pollId,
      //members: JSON.stringify([...new Set(selected.map(m => +m))]),
      members: newSelection,
    });
  };
  console.log(props?.route?.params, 'params');
  return (
    <View style={{flex: 1, backgroundColor: Colors.AppBackgroud}}>
      <ScrollView>
        <View>
          <BackHeader
            text={
              props?.route?.params?.from == 'CreatePoll'
                ? 'Invite friends'
                : 'Edit your poll'
            }
          />
          <View
            style={{
              backgroundColor: Colors.AppBackgroud,
              width: Metrix.HorizontalSize(),
              paddingHorizontal: Metrix.HorizontalSize(17),
            }}>
            <View style={{marginTop: Metrix.VerticalSize(50)}}>
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(13),
                  color: Colors.TextLight,
                  textAlign: 'center',
                }}>
                Invite your friends to vote on your poll. You {'\n'} can add as
                many friends as you want.
              </Text>
            </View>
            <Search onChange={handleSearch} searchText={search} />

            <View
              style={{
                marginTop: Metrix.VerticalSize(25),
                width: Metrix.HorizontalSize(361),
                //borderWidth: 1,
                //borderColor: 'black',
                alignSelf: 'center',
                //height: Metrix.VerticalSize(),
                //borderWidth: 1,
                //borderColor: 'red',
              }}>
              <FlatList
                nestedScrollEnabled
                data={props.userFriends}
                contentContainerStyle={{
                  marginTop: Metrix.VerticalSize(35),
                  backgroundColor: Colors.AppBackgroud,
                }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => {
                  return (
                    <View>
                      {props.isLoading ? (
                        <View style={{marginTop: Metrix.VerticalSize(220)}}>
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
                            marginTop: Metrix.VerticalSize(88),
                          }}>
                          <View
                            style={{
                              height: Metrix.VerticalSize(62),
                              width: Metrix.HorizontalSize(62),
                            }}>
                            <Image
                              resizeMode="contain"
                              style={{
                                height: '100%',
                                width: '100%',
                              }}
                              source={Images.FriendsEmpty}
                            />
                          </View>
                          <Text
                            style={{
                              fontFamily: Fonts['Poppins-Regular'],
                              fontSize: Metrix.customFontSize(13),
                              textAlign: 'center',
                              marginTop: Metrix.VerticalSize(25),
                            }}>
                            You have added no friends! {'\n'} Go to Search and
                            find someone who shares {'\n'} your interests.
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                }}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={[
                        {
                          alignItems: 'center',
                        },
                        index == props.userFriends.length - 1
                          ? {marginBottom: Metrix.VerticalSize(100)}
                          : {},
                      ]}>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          //alert('hey')
                          select({id: item.user_contact_id});
                        }}
                        style={[
                          {
                            // height: Metrix.VerticalSize(180),
                            width: Metrix.HorizontalSize(341),
                            borderRadius: Metrix.Radius,
                            marginTop: Metrix.VerticalSize(10),
                            paddingBottom: Metrix.VerticalSize(20),
                            paddingHorizontal: Metrix.HorizontalSize(15),
                            ...Metrix.createShadow(),
                            //borderWidth: 1,
                            //borderColor: 'red',
                          },
                          selected?.includes(item.user_contact_id)
                            ? {
                                borderWidth: Metrix.VerticalSize(2),
                                borderColor: Colors.Primary,
                              }
                            : {},
                        ]}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: Metrix.VerticalSize(20),
                          }}>
                          <View
                            style={{
                              width: Metrix.HorizontalSize(32),
                              height: Metrix.VerticalSize(32),
                              borderRadius: Metrix.VerticalSize(5),
                              // backgroundColor:"red"
                            }}>
                            <Image
                              resizeMode="cover"
                              style={{
                                height: '100%',
                                width: '100%',
                                borderRadius: Metrix.VerticalSize(5),
                              }}
                              source={{
                                uri: item.profile_pic,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              marginLeft: Metrix.HorizontalSize(10),
                            }}>
                            <Text
                              style={[
                                {
                                  fontFamily: Fonts['Poppins-Medium'],
                                  fontSize: Metrix.FontSmall,
                                  color: Colors.TextDark,
                                  marginTop: Metrix.VerticalSize(-4),
                                },
                              ]}>
                              {item.user_fullname}
                            </Text>
                            <Text
                              style={[
                                {
                                  fontFamily: Fonts['Poppins-Regular'],
                                  fontSize: Metrix.FontExtraSmall,
                                  color: Colors.TextLight,
                                  marginTop: Metrix.VerticalSize(-5),
                                },
                              ]}>
                              {item.poll_count} Polls
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            flexWrap: 'wrap',
                          }}>
                          {item.interests.map(
                            (innerItem, innerIndex, interestArr) => {
                              return (
                                <>
                                  {innerIndex < 6 ? (
                                    <View>
                                      {innerIndex == 5 ? (
                                        <TouchableOpacity
                                          onPress={() => toggleModal(item)}
                                          style={{
                                            marginTop: Metrix.VerticalSize(20),
                                            marginLeft: Metrix.HorizontalSize(
                                              5,
                                            ),
                                          }}>
                                          <Text
                                            style={{
                                              fontFamily:
                                                Fonts['Poppins-Medium'],
                                              fontSize: Metrix.FontExtraSmall,
                                              color: Colors.Primary,
                                              textDecorationLine: 'underline',
                                            }}>
                                            View All
                                          </Text>
                                          {/* {showModal && (
                                            <UserInterestModal
                                              intrestArr={item}
                                              // interests={
                                              //   props.userFriends[index]
                                              //     .interests
                                              // }
                                              showModal={showModal}
                                              toggleModal={toggleModal}
                                              // name={item.user_fullname}
                                              // count={item.poll_count}
                                              // userImage={
                                              //   'https://thisorthat.5stardesigners.net/thisorthat_uat' +
                                              //   item.profile_pic
                                              // }
                                            />
                                          )} */}
                                        </TouchableOpacity>
                                      ) : (
                                        <View
                                          style={{
                                            height: Metrix.VerticalSize(40),
                                            borderRadius: Metrix.VerticalSize(
                                              25,
                                            ),
                                            paddingHorizontal: Metrix.HorizontalSize(
                                              20,
                                            ),
                                            marginTop: Metrix.VerticalSize(10),
                                            backgroundColor:
                                              innerItem.color_code,
                                            marginLeft: Metrix.HorizontalSize(
                                              5,
                                            ),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                          }}>
                                          <Text
                                            style={[
                                              {
                                                fontFamily:
                                                  Fonts['Poppins-Medium'],
                                                fontSize: Metrix.FontExtraSmall,
                                                color: Colors.White,
                                              },
                                            ]}>
                                            {innerItem.name}
                                          </Text>
                                        </View>
                                      )}
                                    </View>
                                  ) : (
                                    <View />
                                  )}
                                </>
                              );
                            },
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                keyExtractor={item => item.user_contact_id}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: Metrix.HorizontalSize(375),
          height: Metrix.VerticalSize(90),
          backgroundColor: Colors.AppBackgroud,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TTButton
          text={
            props?.route?.params?.from == 'CreatePoll'
              ? 'Create Poll'
              : 'Update Poll'
          }
          onPress={
            props?.route?.params?.from == 'CreatePoll' ? createPoll : editPoll
          }
          isLoading={
            // props?.route?.params?.from == 'CreatePoll'
            //?
            props.isLoadingPoll
            //: props.isLoadingEditPoll
          }
        />
      </View>
      <UserInterestModal
        interests={intrestsState?.interests}
        showModal={showModal}
        toggleModal={toggleModal}
        name={intrestsState?.user_fullname}
        count={intrestsState?.poll_count}
        userImage={
          'https://thisorthat.5stardesigners.net/thisorthat_uat' +
          intrestsState?.profile_pic
        }
      />
    </View>
  );
};

const mapStateToProps = state => {
  // state.Profile.userFriends.map(t =>
  //  // console.log('inite friend screen map state', t.interests),
  // );
  //console.log('inite friend screen map state', state.Auth.user);

  return {
    isLoading: state.Profile.isLoading,
    userFriends: state.Profile.userFriends,
    user: state.Auth.user,
    isLoadingPoll: state.Home.isLoading,
    isLoadingEditPoll: state.Home.isLoadingPoll,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserFriends: payload => dispatch(ProfileActions.getUserFriends(payload)),
    createPoll: payload => dispatch(HomeActions.createPoll(payload)),
    editPoll: payload => dispatch(HomeActions.editPoll(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InviteFriendScreen);

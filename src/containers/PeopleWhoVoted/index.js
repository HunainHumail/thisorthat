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
import {Metrix, Colors, Images, Fonts, NavigationService} from '../../config';
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

const PeopleWhoVoted = props => {
  const [showModal, setShowModal] = useState(false);
  const [intrestsState, setIntrestsState] = useState(null);

  const toggleModal = i => {
    setIntrestsState(i);
    setShowModal(!showModal);
  };

  useEffect(() => {
    props.getPollDetail({id: props?.route?.params?.id});
  }, []);

  const handleAcceptRequest = id => {
    //alert(id);
    props.respondToRequest({id, action: 'accept'});
    props.getPollDetail({
      id: props?.route?.params?.id,
    });
  };
  const handleRejectRequest = id => {
    //alert(id);

    props.respondToRequest({id, action: 'reject'});
    props.getPollDetail({
      id: props?.route?.params?.id,
    });
  };
  return (
    <ScrollView
      // contentContainerStyle={{
      //   height: Metrix.VerticalSize(),
      // }}
      style={{
        flex: 1,
        backgroundColor: Colors.AppBackgroud,
      }}>
      <BackHeader text={'People who voted'} />
      <ScrollView
        style={{
          height: Metrix.VerticalSize(),
        }}>
        <FlatList
          //nestedScrollEnabled
          data={props?.pollDetail?.people_who_voted}
          contentContainerStyle={{
            marginTop: Metrix.VerticalSize(35),
            marginBottom: Metrix.VerticalSize(100),
            padding: 10,
            backgroundColor: Colors.AppBackgroud,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View>
                {props.isLoading ? (
                  <View style={{marginTop: Metrix.VerticalSize(220)}}>
                    <ActivityIndicator size="large" color={Colors.Secondary} />
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: Metrix.VerticalSize(88),
                      //marginBottom: Metrix.VerticalSize(88),
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
                      You have added no friends! {'\n'} Go to Search and find
                      someone who shares {'\n'} your interests.
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
                    //height: Metrix.VerticalSize(),
                  },
                ]}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    NavigationService.navigate('OtherUserProfile', {
                      id: item.user_id,
                    });

                    //alert('hey');
                    // select({id: item.user_contact_id});
                  }}
                  style={{
                    //height: Metrix.VerticalSize(180),
                    width: Metrix.HorizontalSize(341),
                    borderRadius: Metrix.Radius,
                    marginTop: Metrix.VerticalSize(10),
                    paddingBottom: Metrix.VerticalSize(20),
                    paddingHorizontal: Metrix.HorizontalSize(15),
                    ...Metrix.createShadow(),
                    //borderWidth: 1,
                    //borderColor: 'red',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      //borderWidth: 1,
                      //borderColor: 'red',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: Metrix.VerticalSize(20),
                        marginBottom: Metrix.VerticalSize(13),
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
                            uri: item.profile_image,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginLeft: Metrix.HorizontalSize(10),
                        }}>
                        <Text
                          style={{
                            fontFamily: Fonts['Poppins-Medium'],
                            fontSize: Metrix.FontSmall,
                            color: Colors.TextDark,
                            marginTop: Metrix.VerticalSize(-4),
                          }}>
                          {item.full_name}
                        </Text>
                        <Text
                          style={[
                            {
                              fontFamily: Fonts['Poppins-Regular'],
                              fontSize: Metrix.FontExtraSmall,
                              color: item.optionColor,
                              marginTop: Metrix.VerticalSize(-5),
                            },
                          ]}>
                          {`Voted on Option ${item.optionNo}`}
                        </Text>
                      </View>
                    </View>
                    {item.friend_status && item.friend_status != 'FRIENDS' && (
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        {item.friend_status == 'RESPONDTOREQUEST' && (
                          <TouchableOpacity
                            onPress={() => handleAcceptRequest(item.user_id)}
                            style={{
                              height: Metrix.VerticalSize(32),
                              width: Metrix.VerticalSize(32),
                              borderRadius: Metrix.VerticalSize(5),
                              marginRight: Metrix.HorizontalSize(10),
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#06D41426',
                            }}>
                            <View
                              style={{
                                height: Metrix.VerticalSize(17.06),
                                width: Metrix.HorizontalSize(18),
                              }}>
                              <Image
                                source={Images.AcceptRequest}
                                resizeMode="contain"
                                style={{
                                  height: '100%',
                                  width: '100%',
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          onPress={
                            item.friend_status == 'NOTFRIENDS' ||
                            item.friend_status == 'REQUESTSENT'
                              ? () => {
                                  props.sendFriendRequest({
                                    id: item.user_id,
                                  });
                                  props.getPollDetail({
                                    id: props?.route?.params?.id,
                                  });
                                }
                              : () => handleRejectRequest(item.user_id)
                          }
                          style={{
                            height: Metrix.VerticalSize(32),
                            width: Metrix.VerticalSize(32),
                            borderRadius: Metrix.VerticalSize(5),
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor:
                              item.friend_status == 'NOTFRIENDS'
                                ? Colors.Primary
                                : item.friend_status == 'REQUESTSENT'
                                ? Colors.White
                                : '#FD5E5A26',
                          }}>
                          <View
                            style={{
                              height: Metrix.VerticalSize(17.06),
                              width: Metrix.HorizontalSize(18),
                            }}>
                            <Image
                              resizeMode="contain"
                              source={
                                item.friend_status == 'NOTFRIENDS'
                                  ? Images.AddFriend
                                  : item.friend_status == 'REQUESTSENT'
                                  ? Images.RejectFriend
                                  : Images.RejectPerson
                              }
                              style={{
                                height: '100%',
                                width: '100%',
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      flexWrap: 'wrap',
                    }}>
                    {item?.user_interests.map(
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
                                      marginLeft: Metrix.HorizontalSize(5),
                                    }}>
                                    <Text
                                      style={{
                                        fontFamily: Fonts['Poppins-Medium'],
                                        fontSize: Metrix.FontExtraSmall,
                                        color: Colors.Primary,
                                        textDecorationLine: 'underline',
                                      }}>
                                      View All
                                    </Text>
                                  </TouchableOpacity>
                                ) : (
                                  <View
                                    style={{
                                      height: Metrix.VerticalSize(40),
                                      borderRadius: Metrix.VerticalSize(25),
                                      paddingHorizontal: Metrix.HorizontalSize(
                                        20,
                                      ),
                                      marginTop: Metrix.VerticalSize(10),
                                      backgroundColor: innerItem.color_code,
                                      marginLeft: Metrix.HorizontalSize(5),
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    <Text
                                      style={[
                                        {
                                          fontFamily: Fonts['Poppins-Medium'],
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
      </ScrollView>

      {/* </View> */}

      {showModal && (
        <UserInterestModal
          interests={intrestsState?.user_interests}
          showModal={showModal}
          toggleModal={toggleModal}
          name={intrestsState?.full_name}
          count={intrestsState?.poll_count}
          userImage={
            'https://thisorthat.5stardesigners.net/thisorthat_uat' +
            intrestsState?.profile_pic
          }
        />
      )}
    </ScrollView>
  );
};

const mapStateToProps = state => {
  console.log(
    state.Home.pollDetail?.people_who_voted,
    'From people who voted screen map state to props',
  );
  return {
    isLoading: state.Profile.isLoading,
    pollDetail: state.Home.pollDetail,
    user: state.Auth.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPollDetail: payload => dispatch(HomeActions.getPollDetail(payload)),
    respondToRequest: payload =>
      dispatch(ProfileActions.respondToRequest(payload)),
    sendFriendRequest: payload =>
      dispatch(ProfileActions.sendFriendRequest(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeopleWhoVoted);

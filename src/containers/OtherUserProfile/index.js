import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Metrix, Colors, Images, Fonts, NavigationService } from '../../config';
import {
  TTButton,
  BackHeader,
  BSList,
  UserInfoCard,
  UserInterestModal,
  PollCard,
} from '../../components/';
import { ProfileActions, HomeActions } from '../../store/actions';
import { connect } from 'react-redux';
import CommonHeader from '../CommonHeader';
import RBSheet from 'react-native-raw-bottom-sheet';
const OtherUserProfile = props => {
  const [showModal, setShowModal] = useState(false);
  const [runLoader, setRunLoader] = useState(true);
  const [filterFlag, setFilterFlag] = useState({
    all: true,
    public: false,
    private: false,
  });
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const pollDetail = id => {
    NavigationService.navigate('PollDetailScreen', {
      pollId: id,
    });
  };
  const getUserPolls = type =>
    props.getUserPolls({ id: props?.route?.params?.id || props?.route?.params?.params?.id, type });

  useEffect(() => {
    props.getOtherUserDetail({ id: props?.route?.params?.id || props?.route?.params?.params?.id });
    props.getUserPolls({ id: props?.route?.params?.id || props?.route?.params?.params?.id, type: 'all' });
    props.navigation.addListener('focus', () => {
      setFilterFlag({
        all: true,
        public: false,
        private: false,
      });
      props.getUserPolls({ id: props?.route?.params?.id || props?.route?.params?.params?.id, type: 'all' });
    });
  }, []);
  var RBSheets;
  console.log(props.route, 'props in other user profile');
  const handleAcceptRequest = () => {
    setRunLoader(false);
    props.respondToRequest({
      callBack: () => setRunLoader(true),
      id: props?.userDetail?.user_id,
      action: 'accept',
    });
    props.getUserPolls({ id: props?.route?.params?.id, type: 'all' });
    props.getOtherUserDetail({ id: props?.route?.params?.id });
    //alert(id);
  };
  const handleRejectRequest = () => {
    //alert(id);
    setRunLoader(false);
    props.respondToRequest({
      callBack: () => setRunLoader(true),
      id: props?.userDetail?.user_id,
      action: 'reject',
    });
    props.getUserPolls({ id: props?.route?.params?.id, type: 'all' });
    props.getOtherUserDetail({ id: props?.route?.params?.id });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.AppBackgroud }}>
      {/* {props.isLoading || props.isLoadingRequest ? ( */}
      {props.isLoading && runLoader ? (
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
        <View style={{ flex: 1 }}>
          <ScrollView
            //stickyHeaderIndices={[0]}
            contentContainerStyle={{
              backgroundColor: Colors.AppBackgroud,
              alignItems: 'center',
            }}>
            {/* <BasicHeader hideIcon={true} /> */}
            <BackHeader text="Profile Details" />
            <UserInfoCard
              marginTop={60}
              userImage={props.userDetail.user_image}
              userFullName={props.userDetail.user_fullname}
              userName={'@' + props.userDetail.username}
              userBio={props.userDetail.user_description}
              userPollCount={props.userDetail.user_poll_count}
              userFriendCount={props.userDetail?.user_friends_count}
              me={false}
              friend={props.userDetail?.friend_status !== 'friends'}
              handleMoreFriends={() =>
                // NavigationService.navigate('UserFriends', {
                //   from: 'OtherProfile',
                //   name: props.userDetail.user_fullname,
                //   id: props.userDetail?.user_id,
                // })
                NavigationService.push('UserFriends', {
                  from: 'OtherProfile',
                  name: props.userDetail.user_fullname,
                  id: props.userDetail?.user_id,
                })
              }
            />
            <View
              style={{
                width: Metrix.HorizontalSize(321),
                ...Metrix.createShadow(),
                borderRadius: Metrix.Radius,
                marginTop: Metrix.VerticalSize(10),
                //marginBottom: Metrix.VerticalSize(30),
              }}>
              <FlatList
                contentContainerStyle={{
                  //alignItems: 'center',
                  paddingHorizontal: Metrix.HorizontalSize(12),
                  flexDirection: 'row',
                  flex: 1,
                  flexWrap: 'wrap',
                  marginBottom: Metrix.VerticalSize(30),

                  paddingBottom: Metrix.VerticalSize(10),
                  //height: 1290,
                }}
                //numColumns="3"
                data={
                  props.userDetail?.user_interests?.length > 5
                    ? //&&
                    //props.userDetail?.friend_status == 'Not friends'
                    //   ||
                    // props.userDetail?.friend_status == 'respond to request' ||
                    // props.userDetail?.friend_status == 'request sent'
                    //   ? props.userDetail?.user_interests?.slice(0, 6)
                    //   : props.userDetail?.user_interests?.length > 5 &&
                    //     props.userDetail?.friend_status == 'friends'
                    props.userDetail?.user_interests?.slice(0, 6)
                    : props.userDetail?.user_interests
                }
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    disabled={
                      index != 5 ||
                      (index == 5 &&
                        props.userDetail?.friend_status !== 'friends' &&
                        true)
                    }
                    onPress={() => {
                      index == 5 && toggleModal();
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
                        backgroundColor: item.color_code,
                      },
                    ]}>
                    <Text
                      style={[
                        {
                          fontFamily: Fonts['Poppins-Medium'],
                          fontSize: Metrix.customFontSize(12),
                          color: Colors.White,
                        },
                      ]}>
                      {index != 5
                        ? item.item
                        : `+${props.userDetail?.user_interests?.length - 5}`}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index}
                scrollEnabled={false}
              />
              <UserInterestModal
                interests={props.userDetail?.user_interests}
                showModal={showModal}
                toggleModal={toggleModal}
                name={props.userDetail?.user_fullname}
                count={props.userDetail.user_poll_count}
                userImage={props.userDetail.user_image}
              />
            </View>
            <View
              style={{
                marginTop: Metrix.VerticalSize(25),
                width: Metrix.HorizontalSize(341),
                height: Metrix.VerticalSize(30),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: Fonts['Lora-Bold'],
                  fontSize: Metrix.customFontSize(18),
                  color: Colors.TextDark,
                }}>
                Polls
              </Text>
              {props.userDetail?.friend_status == 'friends' && (
                <TouchableOpacity onPress={() => RBSheets.open()}>
                  <Image
                    source={Images.Filter}
                    style={{
                      height: Metrix.VerticalSize(24),
                      width: Metrix.VerticalSize(24),
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View>
              {props.isLoadingUserPoll ? (
                <View
                  style={{
                    width: Metrix.HorizontalSize(341),
                    height: Metrix.VerticalSize(415),

                    backgroundColor: Colors.AppBackgroud,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <ActivityIndicator color={Colors.Secondary} size="large" />
                </View>
              ) :

                <View
                  style={{
                    marginTop: Metrix.VerticalSize(15),
                    width: Metrix.HorizontalSize(341),
                    height: Metrix.VerticalSize(415),
                    marginBottom: Metrix.VerticalSize(50),
                    //borderColor: 'red',
                    //borderWidth: 1,
                    borderRadius: Metrix.Radius,
                    //backgroundColor: 'red'
                  }}>
                  <FlatList
                    contentContainerStyle={{
                      alignItems: 'center',
                    }}
                    data={props.userPolls}
                    nestedScrollEnabled
                    // refreshControl={
                    //   <RefreshControl
                    //     refreshing={refreshing}
                    //     onRefresh={() => _onRefresh()}
                    //   />
                    // }
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => {
                      return (
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            style={{
                              height: Metrix.VerticalSize(72),
                              width: Metrix.HorizontalSize(72),
                              marginTop: Metrix.VerticalSize(25),
                            }}
                            resizeMode="contain"
                            source={Images.HomeEmptyState}
                          />
                          <Text
                            style={{
                              fontFamily: Fonts['Poppins-Regular'],
                              fontSize: Metrix.customFontSize(13),
                              color: Colors.TextLight,
                              marginTop: Metrix.VerticalSize(25),
                              textAlign: 'center',
                            }}>
                            No Polls so far!
                      </Text>
                        </View>
                      );
                    }}
                    renderItem={({ item, index }) => {
                      return (
                        <View
                          style={
                            index == props.userPolls.length - 1
                              ? { marginBottom: Metrix.VerticalSize(280) }
                              : { marginBottom: Metrix.VerticalSize(0) }
                          }>
                          <PollCard
                            profileMeasurements={true}
                            pollData={item}
                            onPress={() => pollDetail(item.poll_id)}
                          />
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              }</View>
          </ScrollView>
          {!runLoader ? (
            <View
              style={{
                width: Metrix.HorizontalSize(375),
                height: Metrix.VerticalSize(79),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator color={Colors.Secondary} size="small" />
            </View>
          ) :
            <>
              {props.userDetail?.friend_status !== 'friends' &&
                props.isLoadingRequest ? (
                <View
                  style={{
                    width: Metrix.HorizontalSize(375),
                    height: Metrix.VerticalSize(79),
                    backgroundColor:
                      props.message == 'Request Sent Successfully'
                        ? Colors.White
                        : Colors.Primary,
                    borderTopRightRadius: Metrix.Radius,
                    borderTopLeftRadius: Metrix.Radius,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator color={Colors.Secondary} size="large" />
                </View>
              ) : props.userDetail?.friend_status == 'request sent' ? (
                <TouchableOpacity
                  onPress={() => {
                      setRunLoader(false);
                      props.sendFriendRequest({
                        callBack: () => {
                          setRunLoader(true);
                          props.getOtherUserDetail({ id: props?.route?.params?.id });
                        },
                        id: props?.route?.params?.id,
                      });
                  }}
                  style={{
                    width: Metrix.HorizontalSize(375),
                    height: Metrix.VerticalSize(79),
                    backgroundColor: Colors.White,
                    borderTopRightRadius: Metrix.Radius,
                    borderTopLeftRadius: Metrix.Radius,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Text
                      style={{
                        fontFamily: Fonts['Poppins-Medium'],
                        fontSize: Metrix.customFontSize(14),
                        color: Colors.TextDark,
                      }}>
                      Request Sent!
                    </Text>
                </TouchableOpacity>
              ) : props.userDetail?.friend_status == 'Not friends' ? (
                <TouchableOpacity
                  onPress={() => {
                      setRunLoader(false);
                      props.sendFriendRequest({
                        id: props?.route?.params?.id,
                        callBack: () => {
                          setRunLoader(true)
                          props.getOtherUserDetail({ id: props?.route?.params?.id });
                        },
                      });
                  }}
                  style={{
                    width: Metrix.HorizontalSize(375),
                    height: Metrix.VerticalSize(79),
                    backgroundColor: Colors.Primary,
                    borderTopRightRadius: Metrix.Radius,
                    borderTopLeftRadius: Metrix.Radius,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: Metrix.HorizontalSize(375),
                        height: Metrix.VerticalSize(79),
                        backgroundColor: Colors.Primary,
                        borderTopRightRadius: Metrix.Radius,
                        borderTopLeftRadius: Metrix.Radius,
                      }}>
                      <View
                        style={{
                          width: Metrix.HorizontalSize(17.5),
                          height: Metrix.VerticalSize(18),
                          marginRight: Metrix.HorizontalSize(8),
                        }}>
                        <Image
                          resizeMode="contain"
                          source={Images.AddPerson}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          fontFamily: Fonts['Poppins-Medium'],
                          fontSize: Metrix.customFontSize(14),
                          textAlign: 'left',
                        }}>
                        Add as Friend
                  </Text>
                    </View>
                </TouchableOpacity>
              ) : props.userDetail?.friend_status == 'respond to request' ? (
                  <View
                    style={{
                      width: Metrix.HorizontalSize(375),
                      height: Metrix.VerticalSize(150),
                      backgroundColor: Colors.White,
                      borderTopRightRadius: Metrix.Radius,
                      borderTopLeftRadius: Metrix.Radius,
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      // flexDirection: 'row',
                      //justifyContent: 'center',
                      //alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        marginTop: Metrix.VerticalSize(15),
                        fontFamily: Fonts['Poppins-Medium'],
                        fontSize: Metrix.customFontSize(14),
                        textAlign: 'center',
                        color: Colors.TextDark,
                      }}>
                      {`This person has sent you a friend \n request!`}
                    </Text>
                    <View
                      style={{
                        //borderWidth: 1,
                        //borderColor: 'red',
                        marginTop: Metrix.VerticalSize(38),
                        width: Metrix.HorizontalSize(),
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={handleAcceptRequest}>
                        <View
                          style={{
                            height: Metrix.VerticalSize(18),
                            width: Metrix.VerticalSize(18),
                            borderRadius: Metrix.VerticalSize(5),
                            marginRight: Metrix.HorizontalSize(8),
                          }}>
                          <Image
                            resizeMode="contain"
                            source={Images.AcceptRequest}
                            style={{
                              height: '100%',
                              width: '100%',
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            fontFamily: Fonts['Poppins-Regular'],
                            fontSize: Metrix.customFontSize(12),
                            color: Colors.TextLight,
                          }}>
                          Accept
                    </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={handleRejectRequest}>
                        <View
                          style={{
                            height: Metrix.VerticalSize(18),
                            width: Metrix.VerticalSize(18),
                            borderRadius: Metrix.VerticalSize(5),
                            marginRight: Metrix.HorizontalSize(8),
                          }}>
                          <Image
                            resizeMode="contain"
                            source={Images.RejectPerson}
                            style={{
                              height: '100%',
                              width: '100%',
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            fontFamily: Fonts['Poppins-Regular'],
                            fontSize: Metrix.customFontSize(12),
                            color: Colors.TextLight,
                          }}>
                          Reject
                    </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              ) : (
                <View />
              )}
            </>
          }
        </View>
      )}

      <RBSheet
        ref={ref => (RBSheets = ref)}
        height={Metrix.VerticalSize(228)}
        duration={0}
        customStyles={{
          container: {
            borderTopLeftRadius: Metrix.Radius,
            borderTopRightRadius: Metrix.Radius,
          },
        }}>
        <View
          style={{
            width: Metrix.HorizontalSize(375),
            height: Metrix.VerticalSize(290),
            paddingHorizontal: Metrix.HorizontalSize(17),
          }}>
          <Text
            style={{
              fontFamily: Fonts['Lora-Bold'],
              fontSize: Metrix.customFontSize(18),
              color: Colors.TextDark,
              marginTop: Metrix.VerticalSize(15),
              marginBottom: Metrix.VerticalSize(15),
            }}>
            Filter Polls
          </Text>
          <View>
            <BSList
              text={'View All'}
              topBorder={true}
              icon={Images.PrimaryEdit}
              isChecked={filterFlag.all && true}
              onPress={() => {
                setFilterFlag({ all: true, public: false, private: false });
                getUserPolls('all');
                RBSheets.close();
              }}
            />
            <BSList
              text={'Public Only'}
              icon={Images.Global}
              isChecked={filterFlag.public && true}
              onPress={() => {
                setFilterFlag({ all: false, public: true, private: false });
                getUserPolls('public');
                RBSheets.close();
                // NavigationService.navigate('ResetPasswordScreen');
              }}
            />
            <BSList
              text={'Private Only'}
              icon={Images.LockIcon2}
              isChecked={filterFlag.private && true}
              noBorder={true}
              onPress={() => {
                setFilterFlag({ all: false, public: false, private: true });
                getUserPolls('friends');
                RBSheets.close();
                // NavigationService.navigate('');
              }}
            />
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

const mapStateToProps = state => {
  console.log(
    'from map state other user profile screen',
    state.Profile.otherUserDetail,
  );
  return {
    isLoading: state.Profile.isLoading,
    isLoadingUserPoll: state.Profile.isLoadingUserPoll,
    isLoadingRequest: state.Profile.isLoadingRequest,
    userDetail: state.Profile.otherUserDetail,
    userPolls: state.Profile.otherUserPolls,
    message: state.Profile.message,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    respondToRequest: payload =>
      dispatch(ProfileActions.respondToRequest(payload)),
    getUserPolls: payload =>
      dispatch(ProfileActions.getOtherUserPolls(payload)),
    getOtherUserDetail: payload =>
      dispatch(ProfileActions.getOtherUserDetail(payload)),
    sendFriendRequest: payload =>
      dispatch(ProfileActions.sendFriendRequest(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OtherUserProfile);

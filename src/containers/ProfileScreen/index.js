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
  BSList,
  UserInfoCard,
  UserInterestModal,
  PollCard,
} from '../../components/';
import { ProfileActions, HomeActions } from '../../store/actions';
import { connect } from 'react-redux';
import CommonHeader from '../CommonHeader';
import RBSheet from 'react-native-raw-bottom-sheet';
const ProfileScreen = props => {
  const [filterFlag, setFilterFlag] = useState({
    all: true,
    public: false,
    private: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [runLoader, setRunLoader] = useState(true);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const pollDetail = id => {
    NavigationService.navigate('PollDetailScreen', {
      pollId: id,
    });
  };
  const getUserPolls = type => props.getUserPolls({ type });

  useEffect(() => {
    props.getUserDetail();
    props.getUserPolls({ type: 'all' });
    props.navigation.addListener('focus', () => {
      setFilterFlag({
        all: true,
        public: false,
        private: false,
      });
      props.getUserPolls({ type: 'all' });
      props.getUserDetail();
    });
  }, []);
  var RBSheets;
  return (
    <>
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
          <ScrollView
            //stickyHeaderIndices={[0]}
            contentContainerStyle={{
              backgroundColor: Colors.AppBackgroud,
              alignItems: 'center',
            }}>
            {/* <BasicHeader hideIcon={true} /> */}
            <CommonHeader hideIcon={true} />
            <UserInfoCard
              userImage={props.userDetail.user_image}
              userFullName={props.userDetail.user_fullname}
              userName={'@' + props.userDetail.username}
              userBio={props.userDetail.user_description}
              userPollCount={props.userDetail.user_poll_count}
              userFriendCount={props.userDetail?.user_friends_count}
              handleEditProfile={() => NavigationService.navigate('EditProfile')}
              handleMoreFriends={() =>
                NavigationService.navigate('UserFriends', {
                  from: 'MyProfile',
                })
              }
            />
            <View
              style={{
                //height: Metrix.VerticalSize(200),
                width: Metrix.HorizontalSize(321),
                ...Metrix.createShadow(),
                borderRadius: Metrix.Radius,
                marginTop: Metrix.VerticalSize(10),
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
                }}
                //numColumns="3"
                data={
                  props.userDetail?.user_interests?.length > 5
                    ? props.userDetail?.user_interests?.slice(0, 6)
                    : props.userDetail?.user_interests
                }
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    disabled={index != 5 && true}
                    onPress={() => {
                      index == 5 && toggleModal();
                    }}
                    style={[
                      {
                        height: Metrix.VerticalSize(40),
                        borderRadius: Metrix.VerticalSize(25),
                        marginLeft: Metrix.HorizontalSize(5),
                        marginTop: Metrix.VerticalSize(20),
                        paddingHorizontal: Metrix.HorizontalSize(12),
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
              <TouchableOpacity onPress={() => RBSheets.open()}>
                <Image
                  source={Images.Filter}
                  style={{
                    height: Metrix.VerticalSize(24),
                    width: Metrix.VerticalSize(24),
                  }}
                />
              </TouchableOpacity>
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
                    marginBottom: Metrix.VerticalSize(100),
                    //borderColor: 'red',
                    //borderWidth: 1,
                    borderRadius: Metrix.Radius,
                    //backgroundColor: 'red'
                  }}>
                  <FlatList
                    contentContainerStyle={{ alignItems: 'center' }}
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
                </View>}
            </View>
            {/* <Text>Profile comming soon</Text> */}
          </ScrollView>
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
            height: Metrix.VerticalSize(228),
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
    </>
  );
};

const mapStateToProps = state => {
  console.log('from map state profile screen', state.Profile.userPolls);
  return {
    isLoading: state.Profile.isLoading,
    isLoadingUserPoll: state.Profile.isLoadingUserPoll,
    userDetail: state.Profile.userDetail,
    userPolls: state.Profile.userPolls,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserPolls: payload => dispatch(ProfileActions.getUserPolls(payload)),
    getUserDetail: payload => dispatch(ProfileActions.getUserDetail(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);

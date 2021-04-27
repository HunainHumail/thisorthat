import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Metrix, Colors, Images, Fonts, NavigationService } from '../../config';
import {
  UserInterestModal,
  Search,
  BackHeader,
  BSList,
  PeopleCard,
} from '../../components';
import { HomeActions, ProfileActions } from '../../store/actions';
import { connect } from 'react-redux';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
//const friends_data = [];
const UserFriends = props => {
  var RBSheets;
  //const [selected, setSelected] = useState([]);
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
  };
  
  const onSearch = () =>{
    props.getUserFriends({
      id:
        props?.route?.params?.from == 'MyProfile'
          ? props.user?.user_id
          : props?.route?.params?.id,
      search: search,
    });  
  }

  useEffect(() => {
    // setTimeout(() => {
    //   setWhichRoute(false);
    // }, 5000);
    // props.getPendingRequest();
    // props.getUserFriends({
    //   id:
    //     props?.route?.params?.from == 'MyProfile' || props?.route?.params?.params?.from == 'MyProfile'
    //       ? props.user?.user_id
    //       : props?.route?.params?.params?.id,
    //   search: '',
    // });
    //setWhichRoute(props?.route?.params?.from);
    props.navigation.addListener('focus', () => {
      props.getUserFriends({
        id:
          props?.route?.params?.from == 'MyProfile' || props?.route?.params?.params?.from == 'MyProfile'
            ? props.user?.user_id
            : props?.route?.params?.params?.id,
        search: '',
        callBack:()=>{
          props.getPendingRequest();
        }
      });
    });
  }, [props?.route?.params?.from || props?.route?.params?.params?.from]);
  const handleAcceptRequest = id => {
    props.respondToRequest({ 
      id, 
      action: 'accept',
      callBack:()=>{
        props.getUserFriends({
          id: props.user?.user_id,
          search: '',
          callBack:()=>{
            props.getPendingRequest();
          }
        });
      }
  });
  };
  const handleRejectRequest = id => {
    props.respondToRequest({ 
      id, 
      action: 'reject', 
      callBack:()=>{
        props.getUserFriends({
          id: props.user?.user_id,
          search: '',
          callBack:()=>{
            props.getPendingRequest();
          }
        });
      }
    });
  };
  console.log(
    props?.route?.params,
    'from user friend screen\n\n',
    props?.userFriends?.length,
  );
  return (<View style={{ flex: 1, backgroundColor: Colors.AppBackgroud }}>{
    props.isLoading ?
      <View style={{ flex: 1, backgroundColor: Colors.AppBackgroud, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={Colors.Secondary} size='large' />
      </View>
      :
      <View style={{ flex: 1, backgroundColor: Colors.AppBackgroud }}>
        <ScrollView>

          <View>
            <BackHeader
              text={
                props?.route?.params?.from == 'MyProfile' || props?.route?.params?.params?.from == 'MyProfile'
                  ? 'Your Friends'
                  : `${props?.route?.params?.params?.name
                    ? `${props?.route?.params?.params?.name}'s`
                    : 'User '
                  } Friends`
              }
            />
            <View
              style={{
                backgroundColor: Colors.AppBackgroud,
                width: Metrix.HorizontalSize(),
                paddingHorizontal: Metrix.HorizontalSize(17),
              }}>
              <Search onChange={handleSearch} searchText={search} onSearch={onSearch} />

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
                  extraData={props.userFriends?.length}
                  contentContainerStyle={{
                    marginTop: Metrix.VerticalSize(35),
                    backgroundColor: Colors.AppBackgroud,
                  }}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => {
                    return (
                      <View>
                        {props.isLoading ? (
                          <View style={{ marginTop: Metrix.VerticalSize(220) }}>
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
                              {props?.route?.params?.from == 'MyProfile' || props?.route?.params?.params?.from == 'MyProfile'
                                ? 'You have added no friends!\nGo to Search and find someone who shares\nyour interests.'
                                : `${props?.route?.params?.params?.name
                                } has added no friends!`}
                            </Text>
                          </View>
                        )}
                      </View>
                    );
                  }}
                  renderItem={({ item, index }) => {
                    return (
                      props.isLoading ? 
                        <View style={{ marginTop: Metrix.VerticalSize(220) }}>
                          <ActivityIndicator
                            size="large"
                            color={Colors.Secondary}
                          />
                        </View>
                        :
                      <View
                        style={[
                          {
                            alignItems: 'center',
                          },
                          index == props.userFriends.length - 1
                            ? { marginBottom: Metrix.VerticalSize(100) }
                            : {},
                        ]}>
                        <TouchableOpacity
                          disabled={props?.route?.params?.from !== 'MyProfile' && true}
                          activeOpacity={1}
                          onPress={() => {
                            // NavigationService.navigate('OtherUserProfile', {
                            //   id: item.user_contact_id,
                            // });
                            NavigationService.push('OtherUserProfile', {
                              id: item.user_contact_id,
                            });

                          }}
                          style={[
                            {
                              //height: Metrix.VerticalSize(100),
                              width: Metrix.HorizontalSize(341),
                              borderRadius: Metrix.Radius,
                              marginTop: Metrix.VerticalSize(10),
                              paddingHorizontal: Metrix.HorizontalSize(15),
                              ...Metrix.createShadow(),
                              paddingBottom: Metrix.VerticalSize(20),
                              //borderWidth: 1,
                              //borderColor: 'red',
                            },
                            //   selected.includes(item.user_contact_id)
                            //     ? {
                            //         borderWidth: Metrix.VerticalSize(2),
                            //         borderColor: Colors.Primary,
                            //       }
                            //     : {},
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
        {props?.route?.params?.from == 'MyProfile' && (
          <TouchableOpacity
            onPress={() => RBSheets.open()}
            style={{
              width: Metrix.HorizontalSize(375),
              height: Metrix.VerticalSize(70),
              backgroundColor: Colors.White,
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Tap here for pending requests</Text>
          </TouchableOpacity>
        )}
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
        <RBSheet
          ref={ref => (RBSheets = ref)}
          height={Metrix.VerticalSize(376)}
          duration={0}
          customStyles={{
            container: {
              borderTopLeftRadius: Metrix.Radius,
              borderTopRightRadius: Metrix.Radius,
              backgroundColor: Colors.White,
            },
          }}>
          {props.isLoading ? (
            <View
              style={{
                // width: Metrix.HorizontalSize(),
                // height: Metrix.VerticalSize(290),
                flex: 1,
                justifyContent: 'center',
                backgroundColor: Colors.AppBackgroud,
              }}>
              <ActivityIndicator color={Colors.Secondary} size="large" />
            </View>
          ) : (
            <View
              style={{
                width: Metrix.HorizontalSize(375),
                height: Metrix.VerticalSize(290),
                //paddingHorizontal: Metrix.HorizontalSize(17),
                marginVertical: Metrix.VerticalSize(41),
              }}>
                  {props.pendingRequest?.length > 0 ? (
                     <FlatList
                     nestedScrollEnabled
                     data={props.pendingRequest}
                     extraData={props.pendingRequest?.length}   
                     showsVerticalScrollIndicator={false}
                     renderItem={({ item }) => {
                       return(
                         <PeopleCard
                              name={item.user_fullname}
                              count={item.poll_count}
                              userImage={item.profile_pic}
                              isFriendRequest={true}
                              handleAcceptRequest={() =>
                                handleAcceptRequest(item.user_id)
                              }
                              handleRejectRequest={() =>
                                handleRejectRequest(item.user_id)
                              }
                              onPress={() => {
                                NavigationService.navigate('OtherUserProfile', {
                                  id: item.user_id,
                                });
                                RBSheets.close();
                                //alert('hey');
                                // select({id: item.user_contact_id});
                              }}
                            />
                       )
                     }}
                     />
                  ) : (
                    <View
                      style={{
                        marginTop: Metrix.VerticalSize(135),
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: Metrix.VerticalSize(62),
                          width: Metrix.VerticalSize(62),
                        }}>
                        <Image
                          style={{ height: '100%', width: '100%' }}
                          source={Images.EmptyPendingRequest}
                        />
                      </View>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontFamily: Fonts['Poppins-Regular'],
                          fontSize: Metrix.customFontSize(13),
                          color: Colors.TextLight,
                          marginTop: Metrix.VerticalSize(25),
                        }}>
                        No one has sent you a friend request!
                  </Text>
                    </View>
                  )}
            </View>
          )}
        </RBSheet>
      </View>}
  </View>
  );
};

const mapStateToProps = state => {
  // state.Profile.userFriends.map(t =>
  console.log(
    '\n\nuser friend screen map state\n\n',
    state.Profile?.pendingRequest,
  );

  //console.log('inite friend screen map state', state.Auth.user);

  return {
    isLoading: state.Profile.isLoading,
    isLoadingFriendRequest: state.Profile.isLoadingFriendRequest,
    userFriends: state.Profile.userFriends,
    pendingRequest: state.Profile.pendingRequest,
    user: state.Auth.user,
    isLoadingPoll: state.Home.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserFriends: payload => dispatch(ProfileActions.getUserFriends(payload)),
    respondToRequest: payload =>
      dispatch(ProfileActions.respondToRequest(payload)),
    getPendingRequest: payload =>
      dispatch(ProfileActions.getPendingRequest(payload)),
    createPoll: payload => dispatch(HomeActions.createPoll(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserFriends);

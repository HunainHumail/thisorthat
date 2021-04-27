import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Metrix,
  Colors,
  Images,
  Fonts,
  NavigationService,
  NotificationService,
} from '../../config';
import {NotificationCard} from '../../components/';
import {
  ProfileActions,
  AuthActions,
  NotificationActions,
} from '../../store/actions';
import {connect} from 'react-redux';
import CommonHeader from '../CommonHeader';
import moment from 'moment';

const NotificationScreen = props => {
  const [runLoader, setRunLoader] = useState(true);
  useEffect(() => {
    props.getNotifications();
    props.navigation.addListener('focus', () => {
      props.getNotifications();
    });
  }, []);
  //console.log(Object.keys(props.notifications), 'notifications hai ye');
  const pollDetail = id => {
    NavigationService.navigate('PollDetailScreen', {
      pollId: id,
    });
  };
  const handleAcceptRequest = id => {
    setRunLoader(false);
    props.respondToRequest({
      callBack: () => setRunLoader(true),
      id,
      action: 'accept',
    });
    props.getNotifications({dontRunLoader: true});
    //alert(id);
  };
  const handleRejectRequest = id => {
    setRunLoader(false);
    props.respondToRequest({
      callBack: () => setRunLoader(true),
      id,
      action: 'reject',
    });
    props.getNotifications({dontRunLoader: true});
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.AppBackgroud,
      }}>
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
        <ScrollView
          style={
            {
              //marginBottom: Metrix.VerticalSize(100),
            }
          }
          contentContainerStyle={{
            // marginTop: Metrix.VerticalSize(15),
            width: Metrix.HorizontalSize(),
            //height: Metrix.VerticalSize(),
            backgroundColor: Colors.AppBackgroud,
            marginBottom: Metrix.VerticalSize(200),
            alignSelf: 'center',
          }}>
          <CommonHeader hideIcon={true} />
          {/* <Button
        style={{marginTop: 200}}
        title="click"
        onPress={handleButtonPress}
      /> */}
          <FlatList
            contentContainerStyle={{
              marginBottom: Metrix.VerticalSize(100),
              //paddingHorizontal: Metrix.HorizontalSize(17),
              backgroundColor: Colors.AppBackgroud,
              //borderWidth: 1,
              //borderColor: 'red',
              //width: Metrix.VerticalSize(321),
              //height: Metrix.VerticalSize(),
              //alignSelf: 'center',
            }}
            // data={[]}
            data={Object.keys(props.notifications)}
            extraData={Object.keys(props.notifications).length}
            ListEmptyComponent={(item, index) => {
              return (
                <View
                  style={{
                    height: Metrix.VerticalSize(600),
                    width: Metrix.HorizontalSize(),

                    backgroundColor: Colors.AppBackgroud,
                    justifyContent: 'center',
                    // borderWidth: 1,
                    //bc: 'red',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: Metrix.VerticalSize(62),
                      width: Metrix.VerticalSize(62),
                    }}>
                    <Image
                      source={Images.EmptyNotification}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: Metrix.VerticalSize(25),
                      textAlign: 'center',
                      fontFamily: Fonts['Poppins-Regular'],
                      fontSize: Metrix.customFontSize(13),
                      color: Colors.TextLight,
                    }}>{`No notifications!\n Create polls, Add friends and explore the app\n to get notified.`}</Text>
                </View>
              );
            }}
            renderItem={(item, index) => {
              //console.log(item, 'in flat list');
              return (
                <View>
                  <View
                    style={{
                      width: Metrix.HorizontalSize(),
                      paddingHorizontal: Metrix.HorizontalSize(17),
                      //flexDirection: "row",
                      //alignItems: 'center',
                      // justifyContent: "space-between",
                      marginVertical: Metrix.VerticalSize(15),
                      // borderWidth: 1,
                      //borderColor: 'red'
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts['Lora-Bold'],
                        fontSize: Metrix.customFontSize(18),
                        color: Colors.TextDark,
                        //textAlign: "center"
                      }}>
                      {moment(item.item, 'YYYY-MM-DD').calendar(null, {
                        sameDay: `[Today]`,
                        lastDay: `[Yesterday]`,
                        lastWeek: '[Last] dddd',
                        sameElse: function() {
                          return (
                            '[' + moment(item.item).fromNow(true) + ' ago' + ']'
                          );
                        },
                      })}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts['Poppins-Regular'],
                        fontSize: Metrix.customFontSize(13),
                        color: Colors.TextLight,
                        //textAlign: "center"
                      }}>
                      {moment(item.item, 'YYYY-MM-DD').format('DD-MMM-YYYY')}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    {props.notifications[item.item].map(innerItem => {
                      //return <Text>{innerItem.type}</Text>
                      switch (innerItem.type) {
                        case 'Poll invitation':
                          return (
                            <NotificationCard
                              name={innerItem.title}
                              text={innerItem.body}
                              userImage={innerItem.profile_image}
                              additionalText={innerItem.description}
                              onPress={() => pollDetail(innerItem.poll_id)}
                            />
                          );
                        case 'Poll comment':
                          return (
                            <NotificationCard
                              name={innerItem.title}
                              text={innerItem.body}
                              userImage={innerItem.profile_image}
                              additionalText={innerItem.description}
                              onPress={() => pollDetail(innerItem.poll_id)}
                            />
                          );
                        case 'Poll ended':
                          return (
                            <NotificationCard
                              name={innerItem.title}
                              text={innerItem.body}
                              userImage={innerItem.profile_image}
                              additionalText={'See results'}
                              onPress={() => pollDetail(innerItem.poll_id)}
                            />
                          );
                        case 'Friend request':
                          console.log(
                            innerItem.invite_approval,
                            'inside friend req case',
                          );
                          return (
                            <NotificationCard
                              onPress={() => {
                                NavigationService.navigate('OtherUserProfile', {
                                  id: innerItem.sender_id,
                                });
                              }}
                              prefixed={
                                innerItem.invite_approval == '2' &&
                                'You rejected '
                              }
                              name={
                                innerItem.invite_approval == '2'
                                  ? `${innerItem.title}'s`
                                  : innerItem.title
                              }
                              text={
                                innerItem.invite_approval == '0'
                                  ? innerItem.body
                                  : innerItem.invite_approval == '1'
                                  ? 'is now your friend'
                                  : 'request'
                              }
                              userImage={innerItem.profile_image}
                              isFriendRequest={
                                innerItem.invite_approval == '0' ? true : false
                              }
                              additionalText={false}
                              handleAcceptRequest={() =>
                                handleAcceptRequest(innerItem.sender_id)
                              }
                              handleRejectRequest={() =>
                                handleRejectRequest(innerItem.sender_id)
                              }
                              loader={runLoader}
                            />
                          );

                        case 'Confirmed friend request':
                          return (
                            <NotificationCard
                              onPress={() => {
                                NavigationService.navigate('OtherUserProfile', {
                                  id: innerItem.sender_id,
                                });
                              }}
                              name={innerItem.title}
                              text={innerItem.body}
                              userImage={innerItem.profile_image}
                              additionalText={false}
                            />
                          );

                        default:
                          break;
                      }
                    })}
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = state => {
  console.log('from notification mapstate', state.Notification.notifications);

  return {
    notifications: state.Notification.notifications,
    isLoading: state.Notification.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    respondToRequest: payload =>
      dispatch(ProfileActions.respondToRequest(payload)),
    getNotifications: payload =>
      dispatch(NotificationActions.getNotifications(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationScreen);

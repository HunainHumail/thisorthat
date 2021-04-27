import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  RefreshControl,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Platform
} from 'react-native';
import { Metrix, Colors, Images, NavigationService, Fonts } from '../../config';
import {
  WarningModal,
  BSList,
  PollCard,
  InterestModal,
  TTButton,
} from '../../components';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import SwitchToggle from 'react-native-switch-toggle';
import { AppActions, HomeActions, AuthActions } from '../../store/actions';

import moment from 'moment';
import CommonHeader from '../CommonHeader';

const HomeScreen = props => {
  var RBSheets;
  var RBSheetPollMenu;
  var RBSheetHidePoll;
  let { interests } = props;
  interests = [
    { name: 'Voted pulls' },
    { name: 'toggle' },
    { id: 0, name: 'All' },
    ...interests,
  ];

  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalPollMenu, setShowModalPollMenu] = useState(false);
  const [refreshing, setRefresh] = useState(false);
  const [warningText, setWarningText] = useState('');
  const [whichModal, setWhichModal] = useState('');
  const [showModalExperience, setShowModalExperience] = useState(false);
  const [experience, setExperience] = useState('');
  const [tappedPollId, setTappedPollId] = useState(null);
  const [selected_poll_interests, setSelectedPollInterest] = useState([]);
  const [privacy_type, setPrivacyType] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [status, setStatus] = useState('');
  const [members, setMembers] = useState([]);

  const toggleHandler = () => {
    setToggle(!toggle);
    getPolls(null, !toggle);
  };

  const pollDetail = () => {
    NavigationService.navigate('PollDetailScreen', {
      pollId: props?.polls?.poll_id,
    });
  };

  const logOut = () => {
    AsyncStorage.removeItem('user').then(user => {
      NavigationService.reset_0('IntroScreen');
    });
  };

  const getPolls = (id, voted) => {
    props.getPolls({
      interest: id == null ? selected : id,
      voted_poll: voted == null ? toggle : voted,
    });
  };
  useEffect(() => {
    props.getPolls({
      interest: selected,
      voted_poll: toggle,
    }),
      props.getInterests();

    props.navigation.addListener('focus', () => {
      setToggle(false);
      setSelected(0);
      props.getPolls({
        interest: selected,
        voted_poll: toggle,
      }),
        props.getInterests();
    });
  }, []);

  const toggleModalPollMenu = (whichField, item) => {
    if (whichField == 'remove') {
      setWhichModal('remove');
      setWarningText('Do you really want to remove this\npoll?');
    } else if (whichField == 'commentDelete') {
      setWhichModal('commentDelete');
      setCommentItem(item);
      setWarningText(`Do you really want to delete this\ncomment?`);
    } else {
      setWhichModal('end');
      setWarningText(`Do you really want to end the poll\nbefore its time?`);
    }
    setShowModalPollMenu(!showModalPollMenu);
  };
  const endPoll = () => {
    //setShowModalPollMenu(false);
    RBSheetPollMenu.close();
    props.endPoll({
      callBack: () => {
        setShowModalPollMenu(false)
        setShowModalExperience(false)
      }, id: tappedPollId, experience: experience
    });
    //props.getPollDetail({id: props?.route?.params?.pollId});
  };
  const removePoll = () => {
    //toggleModalPollMenu(false);
    RBSheetPollMenu.close();
    props.removePoll({ callBack: () => toggleModalPollMenu(false), id: tappedPollId });
    //props.getPollDetail({id: props?.route?.params?.pollId});
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const myExperience = e => {
    setExperience(e);
  };

  const itemPress = id => {
    setSelected(id);
    props.getPolls({
      interest: id,
      voted_poll: toggle,
    });
  };

  const _onRefresh = () => {
    setRefresh(true);
    props.getPolls({
      interest: selected,
      voted_poll: toggle,
    });
    setRefresh(false);
  };
  //console.log('from home', props.polls[0].poll_id);
  return (
    <>
      <CommonHeader />
      {props.isLoading || props.interestLoading ? (
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
        <View
          style={{
            backgroundColor: Colors.AppBackgroud,
            width: Metrix.HorizontalSize(),
          }}>
          <InterestModal
            interests={props.interests}
            showModal={showModal}
            toggleModal={toggleModal}
            selected={selected}
            itemPress={itemPress}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: Metrix.HorizontalSize(17),
            }}>
            <FlatList
              data={interests}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <>
                    {index < 6 ? (
                      item.name == 'Voted pulls' ? (
                        <Text
                          style={{
                            fontFamily: Fonts['Poppins-Medium'],
                            fontSize: Metrix.FontSmall,
                            color: Colors.TextDark,
                            marginTop: Metrix.VerticalSize(10),
                          }}>
                          Voted Polls
                        </Text>
                      ) : item.name == 'toggle' ? (
                        <SwitchToggle
                          containerStyle={{
                            width: Metrix.HorizontalSize(40),
                            height: Metrix.VerticalSize(20),
                            borderRadius: 25,
                            backgroundColor: '#ccc',
                            padding: 2,
                            marginTop: Metrix.VerticalSize(12),
                            marginLeft: Metrix.HorizontalSize(15),
                          }}
                          circleStyle={{
                            width: 12,
                            height: 12,
                            borderRadius: 50,
                            backgroundColor: '#4EF892',
                          }}
                          switchOn={toggle}
                          backgroundColorOn={Colors.Primary}
                          circleColorOn={Colors.White}
                          backgroundColorOff={Colors.Secondary}
                          circleColorOff={Colors.White}
                          onPress={toggleHandler}
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            setSelected(item.id), getPolls(item.id, null);
                          }}
                          style={[
                            item.id == selected
                              ? {
                                backgroundColor: Colors.AlertRed,
                              }
                              : {
                                backgroundColor: Colors.DisabledGrey,
                              },
                            {
                              height: Metrix.VerticalSize(40),
                              paddingHorizontal: Metrix.HorizontalSize(30),
                              borderRadius: Metrix.VerticalSize(25),
                              alignItems: 'center',
                              justifyContent: 'center',
                            },
                            index == 2
                              ? { marginLeft: Metrix.HorizontalSize(25) }
                              : { marginLeft: Metrix.HorizontalSize(5) },
                          ]}>
                          <Text
                            style={[
                              {
                                fontFamily: Fonts['Poppins-Medium'],
                                fontSize: Metrix.FontExtraSmall,
                              },
                              item.id == selected
                                ? { color: Colors.White }
                                : { color: Colors.TextDark },
                            ]}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      )
                    ) : index == 6 ? (
                      <TouchableOpacity
                        onPress={() => toggleModal()}
                        style={{
                          marginTop: Metrix.VerticalSize(10),
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
                      <View />
                    )}
                  </>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={{ marginTop: Metrix.VerticalSize(20) }}>
            <FlatList
              data={props.polls}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => _onRefresh()}
                />
              }
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
                        marginTop: Metrix.VerticalSize(140),
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
                      No Polls so far!{'\n'} Explore and add friends to view
                      polls or {'\n'} create your own polls.
                    </Text>
                    <View
                      style={{
                        marginTop: Metrix.VerticalSize(35),
                        marginBottom: Metrix.VerticalSize(330),
                      }}>
                      {/* <TTButton text={'Explore'} /> */}
                    </View>
                  </View>
                );
              }}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={
                      index == props.polls.length - 1
                        ? { marginBottom: Metrix.VerticalSize(280) }
                        : { marginBottom: Metrix.VerticalSize(0) }
                    }>
                    <PollCard
                      isSettingEnable={true}
                      onPressMoreHorizontal={
                        item.who_is == 'You'
                          ? () => {
                            setTappedPollId(item?.poll_id);
                            setSelectedPollInterest(
                              item?.selected_poll_interests,
                            );
                            setMembers(item?.members);
                            setPrivacyType(item?.privacy_type);
                            setCreatedAt(item?.created_at)
                            setExpirationTime(item?.expiration_time)
                            setStatus(item?.status)
                            RBSheetPollMenu.open();
                          }
                          : () => {
                            RBSheetHidePoll.open();
                            setTappedPollId(item?.poll_id);
                          }
                      }
                      pollData={item}
                      onPress={() => {
                        NavigationService.navigate('PollDetailScreen', {
                          pollId: item?.poll_id,
                        });
                      }}
                    />
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      )}
      <RBSheet
        ref={ref => (RBSheets = ref)}
        height={Metrix.VerticalSize(290)}
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
            Settings
          </Text>
          <View>
            <BSList
              text={'Invite a friend'}
              icon={Images.PersonAdd}
              onPress={() => {
                RBSheets.close();
              }}
            />
            <BSList
              text={'Change Password'}
              icon={Images.ShieldIcon}
              onPress={() => {
                RBSheets.close();
                // NavigationService.navigate('ResetPasswordScreen');
              }}
            />
            <BSList
              text={'About Us'}
              icon={Images.InfoIcon}
              onPress={() => {
                RBSheets.close();
                // NavigationService.navigate('');
              }}
            />
            <BSList
              text={'Logout'}
              icon={Images.LogoutIcon}
              noBorder={true}
              onPress={() => {
                RBSheets.close();
                logOut();
              }}
            />
          </View>
        </View>
      </RBSheet>
      <RBSheet
        ref={ref => (RBSheetPollMenu = ref)}
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
            Poll Options
          </Text>
          <View>
            <BSList
              topBorder={true}
              text={'Edit'}
              icon={Images.PrimaryEdit}
              onPress={() => {
                RBSheetPollMenu.close();
                NavigationService.navigate('CreatePollScreen2', {
                  from: 'EditPoll',
                  pollId: tappedPollId,
                  privacyType: privacy_type,
                  selectedMembers: members,
                  selectedInterests: selected_poll_interests,
                  created_at: createdAt,
                  expiration_time: expirationTime,
                  status: status
                });
              }}
              imgHeight={24}
              imgWidth={18}
            />
            <BSList
              imgHeight={16}
              imgWidth={16}
              text={'End'}
              icon={Images.PowerIcon}
              onPress={() => {
                RBSheetPollMenu.close();
                setTimeout(() => {
                  toggleModalPollMenu('end')
                }, Platform.OS == "ios" ? 400 : 0);
                // NavigationService.navigate('ResetPasswordScreen');
              }}
            />
            <BSList
              noBorder={true}
              imgHeight={18}
              imgWidth={16}
              text={'Remove'}
              icon={Images.TrashIcon}
              onPress={() => {
                RBSheetPollMenu.close();
                setTimeout(() => {
                  toggleModalPollMenu('remove')
                }, Platform.OS == "ios" ? 400 : 0);
                // NavigationService.navigate('ResetPasswordScreen');
              }}
            />
          </View>
        </View>
      </RBSheet>

      <RBSheet
        ref={ref => (RBSheetHidePoll = ref)}
        height={Metrix.VerticalSize(128)}
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
            height: Metrix.VerticalSize(128),
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
            Poll Options
          </Text>
          <View>
            <BSList
              noBorder={true}
              text={'Hide'}
              icon={Images.EyeIcon}
              onPress={() => {
                RBSheetHidePoll.close();
                props.hidePoll({ id: tappedPollId });
              }}
              imgHeight={14}
              imgWidth={18}
            />
          </View>
        </View>
      </RBSheet>

      <WarningModal
        loader={whichModal == 'remove' ? props.isLoadingPoll1 : props.isLoadingComment}
        text={warningText}
        showWarningModal={showModalPollMenu}
        toggleWarningModal={toggleModalPollMenu}
        handleOkPress={
          whichModal == 'end'
            ? () => {
              setShowModalPollMenu(false);
              setShowModalExperience(true);
            }
            : whichModal == 'commentDelete'
              ? () => deleteComment(commentItem)
              : removePoll
        }
      />
      <Modal
        transparent={true}
        visible={showModalExperience}
        onRequestClose={() => setShowModalExperience(false)}>
        <TouchableOpacity
          //activeOpacity={1}
          onPress={() => {
            setShowModalExperience(false);
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
                height: Metrix.VerticalSize(473),
                borderRadius: Metrix.Radius,
                ...Metrix.createShadow(),
                paddingLeft: Metrix.HorizontalSize(15),
                paddingRight: Metrix.HorizontalSize(13),
              }}>
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(13),
                  textAlign: 'center',
                  marginTop: Metrix.VerticalSize(29.5),
                  color: Colors.TextLight,
                }}>{`Would you like to add your experience \nwith this poll?`}</Text>
              <View
                style={{
                  width: Metrix.HorizontalSize(281),
                  height: Metrix.VerticalSize(200),
                  borderRadius: Metrix.Radius,
                  marginTop: Metrix.VerticalSize(25.5),
                  backgroundColor: Colors.AppBackgroud,
                  paddingLeft: Metrix.HorizontalSize(15),
                  paddingRight: Metrix.HorizontalSize(13),
                }}>
                <TextInput
                  value={experience}
                  onChangeText={myExperience}
                  multiline={true}
                  maxLength={180}
                  placeholder="Write something..."
                  style={{
                    textAlignVertical: 'top',
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(13),
                    color: Colors.TextLight,
                    width: Metrix.HorizontalSize(266),
                    height: Metrix.VerticalSize(170),
                    borderRadius: Metrix.Radius,
                    paddingHorizontal: Metrix.HorizontalSize(10),
                  }}
                />
                <Text
                  style={{
                    fontFamily: Fonts['Poppins-Regular'],
                    fontSize: Metrix.customFontSize(12),
                    textAlign: 'right',
                    marginBottom: Metrix.VerticalSize(14),
                    color: Colors.Primary,
                  }}>
                  {`${experience.length}/180`}
                </Text>
              </View>
              <View
                style={{
                  marginTop: Metrix.VerticalSize(51),
                  alignSelf: 'center',
                }}>
                <TTButton
                  text="Add Experience"
                  onPress={() => {
                    //setShowModalExperience(false);
                    setShowModalPollMenu(false);
                    endPoll();
                    setExperience('')
                  }}
                  isLoading={props.isLoadingPoll1}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowModalExperience(false);
                  setShowModalPollMenu(false);
                  endPoll();
                  setExperience('')
                }}>
                <Text
                  style={{
                    fontFamily: Fonts['Poppins-Italic'],
                    fontSize: Metrix.customFontSize(12),
                    textAlign: 'center',
                    marginTop: Metrix.VerticalSize(26),
                    color: Colors.Primary,
                    textDecorationLine: 'underline',
                  }}>
                  No, Thanks!
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableHighlight>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  //console.log(state.Home.polls, 'from mapstate home');
  return {
    user: state.Auth.user,
    isLoadingPoll1: state.Home.isLoadingPoll,
    interests: state.Auth.interests,
    isLoading: state.Home.isLoading,
    interestLoading: state.Auth.isLoading,
    polls: state.Home.polls,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateTabStack: payload => dispatch(AppActions.updateTabStack(payload)),
    getPolls: payload => dispatch(HomeActions.getPolls(payload)),
    getInterests: payload => dispatch(AuthActions.getInterests(payload)),
    removePoll: payload => dispatch(HomeActions.removePoll(payload)),
    endPoll: payload => dispatch(HomeActions.endPoll(payload)),
    hidePoll: payload => dispatch(HomeActions.hidePoll(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);

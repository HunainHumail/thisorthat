import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
  Alert,
  Platform
} from 'react-native';
import { Metrix, Colors, Images, Fonts, NavigationService } from '../../config';
import {
  BSList,
  BackHeader,
  CommentCard,
  WarningModal,
  TTButton,
} from '../../components/';
import { AuthActions, HomeActions } from '../../store/actions';
import { connect } from 'react-redux';
import { showToast, validateTitle } from '../../config/utills';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Icon } from 'native-base';

const options = {
  title: 'Select Image',
  takePhotoButtonTitle: 'Take Photo from your camera',
  chooseFromLibraryButtonTitle: 'Choose Photo from Library',
};
const PollDetailScreen = props => {
  var RBSheets;
  var RBSheet1;

  const [experience, setExperience] = useState('');
  const [commentText, setCommentText] = useState('');
  const [warningText, setWarningText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalExperience, setShowModalExperience] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [whichModal, setWhichModal] = useState('');
  const [commentItem, setCommentItem] = useState(null);
  const [localTime, setLocalTime] = useState(null);
  const [runLoader, setRunLoader] = useState(true);

  useEffect(() => {
    //alert('hey');
    props.getPollDetail({
      id: props?.route?.params?.pollId,
      callBack: (votedPoll) => {
        setSelectedId(votedPoll?.poll_option_id);
      }
    });
    setLocalTime(
      moment
        .utc(props.pollDetail.expiration_time)
        .local()
        .format('YYYY-MM-DD HH:mm:ss'),
    );
  }, []);


  const myExperience = e => {
    setExperience(e);
  };
  const handleAddComment = e => {
    setCommentText(e);
  };
  const addComment = () => {
    //RBSheets.close();
    setCommentText('');
    props.addComment({
      callBack: () => props.getPollDetail({ dontRunLoader: true, id: props?.route?.params?.pollId }),
      id: props?.route?.params?.pollId,
      commentText,
    });
    //props.getPollDetail({ dontRunLoader: true, id: props?.route?.params?.pollId });
  };
  const selectedOption = id => {
    setSelectedId(id);
    setRunLoader(false)
    props.votePoll({
      callBack: () => {
        // props.getPollDetail({ dontRunLoader: true, id: props?.route?.params?.pollId })
        setRunLoader(true)
      },
      pollId: props?.route?.params?.pollId,
      optionId: id,
      voted: 1,
    });
    props.getPollDetail({ dontRunLoader: true, id: props?.route?.params?.pollId })
  };
  console.log(selectedId, 'selecteds');

  const toggleModal = (whichField, item) => {
    if (whichField == 'remove') {
      setWhichModal('remove');
      setWarningText('Do you really want to remove this\npoll?');
      setShowModal(!showModal)
    }
    else if (whichField == 'commentDelete') {
      RBSheets.close();
      setTimeout(() => { setShowModal(!showModal) }, Platform.OS == "ios" ? 400 : 0);
      setWhichModal('commentDelete');
      setCommentItem(item);
      setWarningText(`Do you really want to delete this\ncomment?`);
    }
    else if (whichField == "end") {
      setWhichModal('end');
      setWarningText(`Do you really want to end the poll\nbefore its time?`);
      setShowModal(!showModal)
    }
    else if (whichField == "commentDeleteDone") {
      setShowModal(!showModal);
      RBSheets.open()
    }
    else setShowModal(!showModal)
  };

  const toggleModalExperience = () => {
    setShowModalExperience(!showModalExperience);
  };


  const endPoll = () => {
    //toggleModal(false);
    RBSheet1.close();
    props.endPoll({
      callBack: () => {

        toggleModal(false)
        setShowModalExperience(false);
      }, id: props?.route?.params?.pollId, experience: experience
    });
    //props.getPollDetail({id: props?.route?.params?.pollId});
  };
  const deleteComment = (item) => {
    // RBSheets.close();
    // toggleModal(false);
    let Sheets = RBSheets
    props.deleteComment({
      id: item.Poll_comments_id,
      pollId: item.poll_id,
      callBack: () => {
        props.getPollDetail({ dontRunLoader: true, id: props?.route?.params?.pollId })
        toggleModal(false)
        Sheets.open()
      }
    });

    //props.getPollDetail({ dontRunLoader: true, id: props?.route?.params?.pollId });
  };
  const removePoll = () => {
    //toggleModal(false);
    RBSheet1.close();
    props.removePoll({ callBack: () => toggleModal(false), id: props?.route?.params?.pollId });
    //props.getPollDetail({id: props?.route?.params?.pollId});
  };
  const timeConverter = time => {
    let current_time = moment().format('x');
    let local_time = moment.utc(time).toDate();
    let to_local = moment(local_time).format('YYYY-MM-DD HH:mm:ss');
    let that_time = moment(to_local).format('x');
    let diff = current_time - that_time;
    var final_time = Math.floor(diff / 1000 / 60);
    if (final_time < 1) {
      return 'just now';
    } else if (final_time >= 1 && final_time < 60) {
      if (final_time < 2) {
        return `${final_time} minute ago`;
      } else {
        return `${final_time} minutes ago`;
      }
    } else if (final_time >= 60 && final_time < 1440) {
      let new_hour = Math.floor(final_time / 60);
      if (new_hour <= 1) {
        return `${new_hour} hour ago`;
      } else {
        return `${new_hour} hours ago`;
      }
    } else {
      return moment(time).calendar(null, {
        lastDay: `[Yesterday ${moment(time).format('HH:mm')}]`,
        lastWeek: `[${moment(time).format('DD, MMM YYYY  HH:mm')}]`,
        sameElse: `[${moment(time).format('DD, MMM YYYY  HH:mm')}]`,
      });
    }
  };

  var t = moment
    .utc(props?.pollDetail?.expiration_time)
    .local()
    .format('YYYY-MM-DD HH:mm:ss');

  console.log(
    'local time',
    localTime,
    'utc time',
    props?.pollDetail?.expiration_time,
  );
  return (
    <>
      <View style={{ flex: 1, backgroundColor: Colors.AppBackgroud }}>
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
        ) : props?.errorMessage == 'Invalid poll id' ? (
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.AppBackgroud,
            }}>
            <BackHeader
              text="Poll Details"
              onPressRight={
                props?.pollDetail?.who_is == 'You'
                  ? () => RBSheet1.open()
                  : null
              }
            />
            <View
              style={{
                flex: 1,
                marginTop: Metrix.VerticalSize(224),
                //justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.AppBackgroud,
              }}>
              <Image
                source={Images.HomeEmptyState}
                style={{
                  width: Metrix.VerticalSize(62),
                  height: Metrix.VerticalSize(62),
                }}
              />
              <Text
                style={{
                  marginTop: Metrix.VerticalSize(25),
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(13),
                  color: Colors.TextLight,
                  textAlign: 'center',
                }}>
                This poll might have been{'\n'}deleted!
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, backgroundColor: Colors.AppBackgroud }}>
            <BackHeader
              text="Poll Details"
              onPressRight={
                props?.pollDetail?.who_is == 'You'
                  ? () => RBSheet1.open()
                  : null
              }
            />
            <ScrollView
              style={{ flex: 1, marginBottom: Metrix.VerticalSize(100) }}>
              <View
                style={{
                  backgroundColor: Colors.AppBackgroud,
                  width: Metrix.HorizontalSize(),
                  paddingHorizontal: Metrix.HorizontalSize(17),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: Metrix.VerticalSize(18),
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{ uri: props?.pollDetail?.profile_image }}
                    style={{
                      height: Metrix.VerticalSize(32),
                      width: Metrix.VerticalSize(32),
                      borderRadius: Metrix.VerticalSize(5),
                    }}
                  />
                  <View
                    style={{
                      marginLeft: Metrix.HorizontalSize(10),
                      width: Metrix.HorizontalSize(250),
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts['Lora-Bold'],
                        fontSize: Metrix.customFontSize(18),
                        marginTop: Metrix.VerticalSize(-3),
                        color: Colors.TextDark,
                      }}>
                      {props?.pollDetail?.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: Metrix.VerticalSize(2),
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts['Poppins-Regular'],
                          fontSize: Metrix.customFontSize(13),
                          color: Colors.TextLight,
                        }}>
                        {timeConverter(props?.pollDetail?.created_at)}
                      </Text>
                      <View
                        style={{
                          height: Metrix.VerticalSize(5),
                          width: Metrix.VerticalSize(5),
                          borderRadius: Metrix.VerticalSize(100),
                          backgroundColor: Colors.Primary,
                          marginLeft: Metrix.HorizontalSize(5),
                          marginTop: Metrix.VerticalSize(8),
                        }}
                      />
                      <View
                        style={{
                          width: Metrix.HorizontalSize(16),
                          height: Metrix.VerticalSize(16),
                          marginTop: Metrix.VerticalSize(1),
                          marginLeft: Metrix.HorizontalSize(2),
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{ height: '100%', width: '100%' }}
                          source={
                            props?.pollDetail?.privacy_type == 'Public'
                              ? Images.EarthIcon
                              : Images.LockIcon2
                          }
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View>
                  <FlatList
                    data={props?.pollDetail?.options}
                    extraData={selectedId}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                      return (
                        <>
                          {
                            <View
                              style={{
                                width: Metrix.HorizontalSize(211),
                                height: Metrix.VerticalSize(336),

                                // borderRadius: Metrix.Radius,
                                // borderWidth: 1,
                                //borderColor: Colors.Primary,
                                marginLeft: Metrix.HorizontalSize(10),
                                marginTop: Metrix.VerticalSize(37),
                                paddingHorizontal: Metrix.VerticalSize(10),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: Metrix.Radius,
                                zIndex: 2,
                              }}>
                              {
                                <ImageBackground
                                  resizeMode="cover"
                                  imageStyle={{
                                    //borderWidth: 1,
                                    //borderColor: Colors.Primary,
                                    borderRadius: Metrix.Radius,
                                  }}
                                  source={{ uri: item.image_url }}
                                  style={{
                                    width: Metrix.VerticalSize(230),
                                    height: Metrix.VerticalSize(336),
                                    //borderWidth: 1,
                                    //borderColor: 'black',
                                  }}>
                                  {props?.pollDetail?.who_is !== 'Other' ? (
                                    <View
                                      style={{
                                        width: Metrix.HorizontalSize(164),
                                        height: Metrix.VerticalSize(45),
                                        backgroundColor: Colors.White,
                                        borderRadius: Metrix.Radius,
                                        ...Metrix.createShadow(),
                                        marginTop: Metrix.VerticalSize(281),
                                        marginLeft: Metrix.HorizontalSize(10),
                                        marginBottom: Metrix.VerticalSize(10),
                                        padding: Metrix.VerticalSize(5),
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: Fonts['Poppins-Regular'],
                                          fontSize: Metrix.customFontSize(12),
                                          color: Colors.TextLight,
                                        }}>
                                        {`${item.option_vote_count} Votes`}
                                      </Text>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <View
                                          style={{
                                            width: Metrix.HorizontalSize(88),
                                            height: Metrix.VerticalSize(5),
                                            backgroundColor:
                                              Colors.AppBackgroud,
                                            borderRadius: Metrix.Radius,
                                          }}>
                                          <View
                                            style={{
                                              width: `${item.option_vote_percentage
                                                }%`,
                                              height: Metrix.VerticalSize(5),
                                              backgroundColor: item.optionColor,
                                              borderRadius: Metrix.Radius,
                                            }}
                                          />
                                        </View>
                                        <Text
                                          style={{
                                            fontFamily: Fonts['Lora-Bold'],
                                            fontSize: Metrix.customFontSize(13),
                                            color: Colors.TextDark,
                                            marginLeft: Metrix.HorizontalSize(
                                              13,
                                            ),
                                          }}>
                                          {`${item.option_vote_percentage}%`}
                                        </Text>
                                      </View>
                                    </View>
                                  ) : (
                                    <TouchableOpacity
                                      disabled={
                                        props.isLoadingPoll1 || selectedId == item.poll_option_id || props?.pollDetail?.status == 'expired'
                                      }
                                      onPress={() =>
                                        selectedOption(item.poll_option_id)
                                      }
                                      style={[
                                        {
                                          width: Metrix.VerticalSize(52),
                                          height: Metrix.VerticalSize(52),
                                          borderRadius: Metrix.VerticalSize(
                                            52 / 2,
                                          ),
                                          marginTop: Metrix.VerticalSize(274),
                                          marginLeft: Metrix.HorizontalSize(10),
                                          borderWidth: 1,
                                          borderColor: Colors.Primary,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        },
                                        (selectedId == item.poll_option_id)
                                          ? { backgroundColor: Colors.Primary }
                                          : {},
                                      ]}>
                                      <View
                                        style={{
                                          width: Metrix.VerticalSize(24),
                                          height: Metrix.VerticalSize(24),
                                        }}>
                                        {props.isLoadingPoll1 ?
                                          <View
                                            style={{
                                              width: Metrix.VerticalSize(24),
                                              height: Metrix.VerticalSize(24),
                                            }}>
                                            <ActivityIndicator color={selectedId == item.poll_option_id ? Colors.White : Colors.Primary} size='small' />
                                          </View>
                                          :
                                          <Image
                                            source={Images.VotedIcon}
                                            style={{
                                              width: '100%',
                                              height: '100%',
                                            }}
                                          />
                                        }
                                      </View>
                                    </TouchableOpacity>
                                  )}
                                </ImageBackground>
                              }
                            </View>
                          }
                        </>
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
                {props?.pollDetail?.who_is == 'You' ? (
                  <View>
                    <Text
                      style={{
                        marginTop: Metrix.VerticalSize(35),
                        fontFamily: Fonts['Lora-Bold'],
                        fontSize: Metrix.customFontSize(18),
                        color: Colors.TextDark,
                        //marginLeft: Metrix.HorizontalSize(13),
                      }}>
                      People who voted
                    </Text>
                    <ScrollView
                      style={
                        {
                          //width: Metrix.VerticalSize(42),
                          //height: Metrix.VerticalSize(42),
                          //flexDirection: 'row',
                        }
                      }>
                      <FlatList
                        contentContainerStyle={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          marginTop: Metrix.VerticalSize(25),
                          // marginBottom: Metrix.VerticalSize(20),
                          // borderColor: 'red',
                          // borderWidth: 1,
                        }}
                        data={
                          props?.pollDetail?.people_who_voted?.length > 12
                            ? props?.pollDetail?.people_who_voted?.slice(0, 12)
                            : props?.pollDetail?.people_who_voted
                        }
                        ListEmptyComponent={({ item, index }) => {
                          return (
                            <View
                              style={{
                                flex: 1,
                                backgroundColor: Colors.AppBackgroud,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  width: Metrix.VerticalSize(62),
                                  height: Metrix.VerticalSize(62),
                                  marginBottom: Metrix.VerticalSize(15),
                                }}>
                                <Image source={Images.EmptyVotesIcon} />
                              </View>
                              <Text
                                style={{
                                  fontFamily: Fonts['Poppins-Regular'],
                                  fontSize: Metrix.customFontSize(13),
                                  color: Colors.TextLight,
                                }}>
                                No one has voted yet!
                              </Text>
                            </View>
                          );
                        }}
                        renderItem={({ item, index }) => {
                          return (
                            <View>
                              <TouchableOpacity
                                //disabled={index != 11 && true}
                                onPress={() =>
                                  NavigationService.navigate('PeopleWhoVoted', {
                                    id: props?.route?.params?.pollId,
                                  })
                                }
                                style={{
                                  width: Metrix.VerticalSize(42),
                                  height: Metrix.VerticalSize(42),
                                  marginRight: Metrix.HorizontalSize(15),
                                  marginBottom: Metrix.VerticalSize(23),
                                  backgroundColor:
                                    index == 11
                                      ? Colors.Primary
                                      : Colors.Transparent,
                                  borderRadius: Metrix.Radius,
                                  //flexDirection: 'row',
                                }}>
                                <ImageBackground
                                  resizeMode="cover"
                                  imageStyle={{
                                    borderRadius: Metrix.Radius,
                                  }}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                  }}
                                  source={
                                    index == 11
                                      ? null
                                      : { uri: item.profile_image }
                                  }>
                                  {index != 11 ? (
                                    <View
                                      style={{
                                        height: Metrix.VerticalSize(8),
                                        width: Metrix.VerticalSize(8),
                                        backgroundColor: item.optionColor,
                                        borderRadius: Metrix.Radius,
                                        alignSelf: 'flex-end',
                                      }}
                                    />
                                  ) : (
                                    <View
                                      style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: Fonts['Poppins-Medium'],
                                          fontSize: Metrix.customFontSize(12),
                                          color: Colors.White,
                                          //marginLeft: Metrix.HorizontalSize(13),
                                        }}>
                                        {`+${props?.pollDetail?.people_who_voted
                                          ?.length - 11}`}
                                      </Text>
                                    </View>
                                  )}
                                </ImageBackground>
                              </TouchableOpacity>
                            </View>
                          );
                        }}
                      />
                      <Text
                        style={{
                          marginTop: Metrix.VerticalSize(35),
                          marginBottom: Metrix.VerticalSize(100),
                          fontFamily: Fonts['Poppins-Regular'],
                          fontSize: Metrix.customFontSize(13),
                          color: Colors.TextDark,
                          // borderWidth: 1,
                          // borderColor: 'blue',
                        }}>
                        {props?.pollDetail?.status == 'active'
                          ? `This poll will end in ${moment(t).fromNow(true)}`
                          : `This poll has been ended`}
                      </Text>
                    </ScrollView>
                  </View>
                ) : (
                  <View>
                    <ScrollView
                      style={{
                        height: Metrix.VerticalSize(150),
                      }}>
                      <FlatList
                        data={props?.pollDetail?.poll_interests}
                        contentContainerStyle={{
                          flex: 1,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          marginTop: Metrix.VerticalSize(35),
                          paddingBottom: Metrix.VerticalSize(15),
                          //marginBottom: Metrix.VerticalSize(200),
                        }}
                        renderItem={({ item, index }) => (
                          <View
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
                              {item.name}
                            </Text>
                          </View>
                        )}
                      />
                    </ScrollView>
                    <Text
                      style={{
                        marginTop: Metrix.VerticalSize(35),
                        marginBottom: Metrix.VerticalSize(40),
                        fontFamily: Fonts['Poppins-Regular'],
                        fontSize: Metrix.customFontSize(13),
                        color: Colors.TextDark,
                      }}>
                      {props?.pollDetail?.status == 'active'
                        ? `This poll will end in ${moment(t).fromNow(true)}`
                        : `This poll has been ended`}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={() => RBSheets.open()}
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
                  color: Colors.TextLight,
                  fontFamily: Fonts['Poppins-Medium'],
                  fontSize: Metrix.customFontSize(14),
                }}>
                Tap here for comments
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <RBSheet
        ref={ref => (RBSheets = ref)}
        height={Metrix.VerticalSize(406)}
        duration={0}
        customStyles={{
          container: {
            borderTopLeftRadius: Metrix.Radius,
            borderTopRightRadius: Metrix.Radius,
          },
        }}>
        {props.isLoading ? (
          <View
            style={{
              width: Metrix.HorizontalSize(),
              height: Metrix.VerticalSize(406),
              //paddingBottom: Metrix.VerticalSize(100),
              backgroundColor: Colors.AppBackgroud,
              //paddingTop: Metrix.VerticalSize(100),
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={Colors.Secondary} size="large" />
          </View>
        ) : (
          props.pollDetailLoader ?
            <View
              style={{
                width: Metrix.HorizontalSize(),
                height: Metrix.VerticalSize(406),
                //paddingBottom: Metrix.VerticalSize(100),
                backgroundColor: Colors.AppBackgroud,
                //paddingTop: Metrix.VerticalSize(100),
                justifyContent: 'center',
              }}>
              <ActivityIndicator color={Colors.Primary} size="large" />
            </View>
            :
            <View
              style={{
                //width: Metrix.HorizontalSize(375),
                height: Metrix.VerticalSize(406),
                //paddingHorizontal: Metrix.HorizontalSize(17),
                paddingTop: Metrix.VerticalSize(40),
              }}>
              <ScrollView
                contentContainerStyle={{
                  width: Metrix.HorizontalSize(375),
                  alignSelf: 'center',
                }}
                style={{ marginBottom: Metrix.VerticalSize(70) }}>
                {props?.pollDetail?.comments?.length > 0 ? (
                  props?.pollDetail?.comments?.map((item, index) => {
                    // alert(item.who_is)
                    return (
                      <CommentCard
                        name={item.full_name}
                        comment={item.comments}
                        userImage={item.profile_image}
                        // handlePress={() => deleteComment(item)}
                        handlePress={() => toggleModal('commentDelete', item)}

                        myComment={
                          // props?.pollDetail?.who_is == 'You' ? true : false
                          (props?.pollDetail?.who_is == 'You' || item?.who_is == 'You') ? true : false
                        }
                      // handleNavigate={
                      //   item?.user_id == props?.user?.user_id
                      //     ? () => alert('myProfile')
                      //     : () => alert('Other Profile')
                      // }
                      />
                    )
                  })
                ) : (
                  <View
                    style={{
                      marginTop: Metrix.VerticalSize(80),
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: Metrix.VerticalSize(62),
                        width: Metrix.VerticalSize(62),
                      }}>
                      <Image
                        style={{ height: '100%', width: '100%' }}
                        source={Images.EmptyComment}
                      />
                    </View>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: Fonts['Poppins-Regular'],
                        fontSize: Metrix.customFontSize(13),
                        color: Colors.TextLight,
                        marginTop: Metrix.VerticalSize(25),
                      }}>{`No comments!\n Be the first one to add.`}</Text>
                  </View>
                )}
              </ScrollView>
              <View
                style={{
                  width: Metrix.HorizontalSize(331),
                  height: Metrix.VerticalSize(50),
                  backgroundColor: Colors.AppBackgroud,
                  borderRadius: Metrix.Radius,
                  justifyContent: 'space-evenly',
                  alignSelf: 'center',
                  position: 'absolute',
                  bottom: Metrix.VerticalSize(20),
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: Metrix.HorizontalSize(10),
                  //borderWidth: 1,
                  //borderColor: 'black'
                }}>
                <View
                  style={{
                    //backgroundColor: Colors.AppBackgroud,
                    width: Metrix.HorizontalSize(22),
                    height: Metrix.HorizontalSize(22),
                    // borderWidth: 1,
                    // borderColor: 'red',
                  }}>
                  <Image
                    resizeMode="contain"
                    source={Images.Message}
                    style={{
                      //backgroundColor: Colors.AppBackgroud,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </View>
                <TextInput
                  onChangeText={handleAddComment}
                  value={commentText}
                  placeholder="Add a comment"
                  placeholderTextColor={Colors.TextLight}
                  style={{
                    width: Metrix.HorizontalSize(240),
                    height: Metrix.VerticalSize(50),
                    //marginLeft: Metrix.HorizontalSize(13),
                    //backgroundColor: Colors.AppBackgroud,
                    borderRadius: Metrix.Radius,
                    // borderWidth: 1,
                    // borderColor: 'red',
                  }}
                />
                {props.isLoadingComment ? (
                  <View
                    style={{
                      width: Metrix.HorizontalSize(24),
                      height: Metrix.HorizontalSize(24),

                    }}>
                    <ActivityIndicator color={Colors.Primary} size="small" />
                  </View>
                ) :
                  <TouchableOpacity
                    onPress={addComment}
                    style={{
                      //marginRight: Metrix.HorizontalSize(18),
                      // borderWidth: 1,
                      // borderColor: 'red',
                      width: Metrix.HorizontalSize(24),
                      height: Metrix.HorizontalSize(24),
                    }}>

                    <Icon
                      name="send"
                      style={{
                        color: Colors.Primary,
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </TouchableOpacity>}
              </View>
            </View>
        )}
      </RBSheet>

      <RBSheet
        ref={ref => (RBSheet1 = ref)}
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
                RBSheet1.close();
                NavigationService.navigate('CreatePollScreen2', {
                  from: 'EditPoll',
                  pollId: props?.pollDetail?.poll_id,
                  privacyType: props?.pollDetail?.privacy_type,
                  selectedMembers: props?.pollDetail?.members,
                  selectedInterests: props?.pollDetail?.selected_poll_interests,
                  created_at: props?.pollDetail?.created_at,
                  expiration_time: props?.pollDetail?.expiration_time,
                  status: props?.pollDetail?.status,
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
                RBSheet1.close();
                setTimeout(() => { toggleModal('end') }, Platform.OS == "ios" ? 400 : 0);
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
                RBSheet1.close();
                setTimeout(() => { toggleModal('remove') }, Platform.OS == "ios" ? 400 : 0);
                // NavigationService.navigate('ResetPasswordScreen');
              }}
            />
          </View>
        </View>
      </RBSheet>
      <WarningModal
        loader={whichModal == 'remove' ? props.isLoadingPoll1 : props.isLoadingComment}
        text={warningText}
        showWarningModal={showModal}
        toggleWarningModal={toggleModal}
        handleOkPress={
          whichModal == 'end'
            ? () => setShowModalExperience(true)
            : whichModal == 'commentDelete'
              ? () => deleteComment(commentItem)
              : removePoll
        }
        whichModal={whichModal}
      />

      <Modal
        transparent={true}
        visible={showModalExperience}
        onRequestClose={() => setShowModalExperience(false)}>
        <TouchableOpacity
          activeOpacity={1}
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
                    setShowModal(false);
                    setExperience('')
                    endPoll();
                  }}
                  isLoading={props.isLoadingPoll1}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowModalExperience(false);
                  setShowModal(false);
                  setExperience('')
                  endPoll();
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
  console.log(
    state.Home.pollDetail,
    //state.Auth.user,
    'From poll detail screen map state to props poll Detsil',
    state.Home.errorMessage,
    'error Message',
  );
  return {
    pollDetail: state.Home.pollDetail,
    user: state.Auth.user,
    isLoading: state.Home.isLoading,
    isLoadingPoll: state.Home.isLoading,
    isLoadingPoll1: state.Home.isLoadingPoll,
    isLoadingComment: state.Home.isLoadingComment,
    pollDetailLoader: state.Home.pollDetailLoader,
    errorMessage: state.Home.errorMessage,
    user: state.Auth.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPollDetail: payload => dispatch(HomeActions.getPollDetail(payload)),
    endPoll: payload => dispatch(HomeActions.endPoll(payload)),
    deleteComment: payload => dispatch(HomeActions.deleteComment(payload)),
    addComment: payload => dispatch(HomeActions.addComment(payload)),
    votePoll: payload => dispatch(HomeActions.votePoll(payload)),
    removePoll: payload => dispatch(HomeActions.removePoll(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PollDetailScreen);

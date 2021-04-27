import React from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import {Metrix, Images, NavigationService, Fonts, Colors} from '../../config';
import moment from 'moment';

export const PollCard = ({
  pollData,
  onPress,
  profileMeasurements,
  onPressMoreHorizontal,
  isSettingEnable,
}) => {
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

  const differenceTime = expiry_time => {
    let local_time = moment.utc(expiry_time).toDate();
    let expiry_times = moment(local_time).format('YYYY-MM-DD HH:mm:ss');
    let created_time_convert = moment().format('x');
    let expiry_time_convert = moment(expiry_times).format('x');
    let diff = expiry_time_convert - created_time_convert;
    var final_time = Math.floor(diff / 1000 / 60);
    if (final_time < 60) {
      if (final_time > 1) {
        return `This poll will end in ${final_time} minutes`;
      } else if (final_time == 1) {
        return `This poll will end in ${final_time} minute`;
      } else if (final_time > 0 && final_time < 1) {
        return `This poll will end soon`;
      } else {
        return 'This poll has been ended';
      }
    } else if (final_time > 60 && final_time < 1440) {
      let new_hour = Math.floor(final_time / 60);
      if (new_hour <= 1) {
        return `This poll will end in ${new_hour} hour`;
      } else {
        return `This poll will end in ${new_hour} hours`;
      }
    } else {
      return moment(expiry_times).calendar(null, {
        nextDay: `[This poll will end on tommorow ${moment(expiry_times).format(
          'HH:mm',
        )}]`,
        nextWeek: `[This poll will end on ${moment(expiry_times).format(
          'DD, MMM YYYY  HH:mm',
        )}]`,
        sameElse: `[This poll will end on ${moment(expiry_times).format(
          'DD, MMM YYYY  HH:mm',
        )}]`,
      });
    }
  };
  //console.log('inside poll card', pollData)
  var local_date = moment
    .utc(pollData.expiration_time)
    .local()
    .format('YYYY-MM-DD HH:mm:ss');
  // console.log(
  //   local_date,
  //   'this is local time',
  //   pollData.expiration_time,
  //   'this is utc',
  // );
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: Metrix.HorizontalSize(341),
        height: Metrix.VerticalSize(420),
        borderRadius: Metrix.Radius,
        backgroundColor: Colors.White,
        ...Metrix.createShadow(),
        marginLeft: profileMeasurements ? 0 : Metrix.HorizontalSize(17),
        marginTop: Metrix.VerticalSize(15),
        paddingHorizontal: Metrix.HorizontalSize(10),
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: Metrix.VerticalSize(18),
        }}>
        <View
          style={{
            height: Metrix.VerticalSize(32),
            width: Metrix.HorizontalSize(32),
            borderRadius: Metrix.VerticalSize(5),
            marginLeft: Metrix.HorizontalSize(5),
          }}>
          <Image
            style={{height: '100%', width: '100%', borderRadius: 3}}
            source={{
              uri: `${pollData.profile_image}`,
            }}
          />
        </View>
        <View
          style={{
            marginLeft: Metrix.HorizontalSize(10),
            width: Metrix.HorizontalSize(250),
          }}>
          <Text
            style={{
              fontFamily: Fonts['Poppins-Medium'],
              fontSize: Metrix.FontSmall,
              marginTop: Metrix.VerticalSize(-3),
              color: Colors.Primary,
            }}>
            {pollData.who_is == 'You' ? 'You' : pollData.full_name}
            <Text
              style={{
                color: Colors.TextDark,
              }}>
              {' '}
              created a poll
            </Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: Metrix.VerticalSize(-5),
            }}>
            <Text
              style={{
                fontFamily: Fonts['Poppins-Regular'],
                fontSize: Metrix.FontExtraSmall,
                color: Colors.TagFontColor,
              }}>
              {timeConverter(pollData.created_at)}
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
                style={{height: '100%', width: '100%'}}
                source={
                  pollData.privacy_type == 'Public'
                    ? Images.EarthIcon
                    : Images.LockIcon2
                }
              />
            </View>
          </View>
        </View>
        {isSettingEnable && (
          <TouchableOpacity
            onPress={onPressMoreHorizontal}
            style={{
              width: Metrix.HorizontalSize(22),
              height: Metrix.VerticalSize(22),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: Metrix.VerticalSize(2),
            }}>
            <Image
              resizeMode="contain"
              style={{
                height: '100%',
                width: '100%',
              }}
              source={Images.ThreeDotIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <FlatList
          data={pollData.options}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <View>
                {pollData.options.length == 2 ? (
                  <View
                    style={[
                      {
                        height: Metrix.VerticalSize(260),
                        width: Metrix.HorizontalSize(158),
                        marginLeft: Metrix.HorizontalSize(5),
                        borderRadius: Metrix.VerticalSize(5),
                        marginTop: Metrix.VerticalSize(25),
                      },
                      index == 0
                        ? {marginLeft: 0}
                        : {marginLeft: Metrix.HorizontalSize(5)},
                    ]}>
                    <Image
                      style={{
                        height: '100%',
                        borderRadius: Metrix.VerticalSize(5),
                      }}
                      source={{uri: item.image_url}}
                    />
                  </View>
                ) : pollData.options.length == 3 ? (
                  <View
                    style={[
                      index == 0 || index == 2
                        ? {
                            height: Metrix.VerticalSize(127),
                          }
                        : {
                            height: Metrix.VerticalSize(260),
                          },
                      {
                        width: Metrix.HorizontalSize(158),
                        marginLeft: Metrix.HorizontalSize(5),
                        borderRadius: Metrix.VerticalSize(5),
                        marginTop: Metrix.VerticalSize(25),
                      },
                      index == 0
                        ? {marginLeft: 0}
                        : index == 2
                        ? {
                            marginTop: Metrix.VerticalSize(-126),
                            marginLeft: Metrix.HorizontalSize(0),
                          }
                        : {marginLeft: Metrix.HorizontalSize(5)},
                    ]}>
                    <Image
                      style={{
                        height: '100%',
                        borderRadius: Metrix.VerticalSize(5),
                      }}
                      source={{uri: item.image_url}}
                    />
                  </View>
                ) : pollData.options.length == 4 ? (
                  <View
                    style={[
                      {
                        height: Metrix.VerticalSize(128),
                        width: Metrix.HorizontalSize(158),
                        marginLeft: Metrix.HorizontalSize(5),
                        borderRadius: Metrix.VerticalSize(5),
                      },
                      index == 0
                        ? {marginLeft: 0, marginTop: Metrix.VerticalSize(25)}
                        : index == 1
                        ? {
                            marginTop: Metrix.VerticalSize(25),
                            marginLeft: Metrix.HorizontalSize(5),
                          }
                        : index == 2
                        ? {
                            marginLeft: Metrix.HorizontalSize(0),
                            marginTop: Metrix.VerticalSize(7),
                          }
                        : {
                            marginLeft: Metrix.HorizontalSize(5),
                            marginTop: Metrix.VerticalSize(7),
                          },
                    ]}>
                    <Image
                      style={{
                        height: '100%',
                        borderRadius: Metrix.VerticalSize(5),
                      }}
                      source={{uri: item.image_url}}
                    />
                  </View>
                ) : (
                  <View
                    style={[
                      index == 0 || index == 2 || index == 4
                        ? {
                            height: Metrix.VerticalSize(83),
                          }
                        : {
                            height: Metrix.VerticalSize(128),
                          },
                      {
                        width: Metrix.HorizontalSize(158),
                        marginLeft: Metrix.HorizontalSize(5),
                        borderRadius: Metrix.VerticalSize(5),
                      },
                      index == 0
                        ? {
                            marginLeft: 0,
                            marginTop: Metrix.VerticalSize(25),
                          }
                        : index == 1
                        ? {
                            marginTop: Metrix.VerticalSize(25),
                            marginLeft: Metrix.HorizontalSize(5),
                          }
                        : index == 2
                        ? {
                            marginLeft: Metrix.HorizontalSize(0),
                            marginTop: Metrix.VerticalSize(-38),
                          }
                        : index == 3
                        ? {
                            marginLeft: Metrix.HorizontalSize(5),
                            marginTop: Metrix.VerticalSize(7),
                          }
                        : {
                            marginLeft: Metrix.HorizontalSize(0),
                            marginTop: Metrix.VerticalSize(-82),
                          },
                    ]}>
                    <Image
                      style={{
                        height: '100%',
                        borderRadius: Metrix.VerticalSize(5),
                      }}
                      source={{uri: item.image_url}}
                    />
                  </View>
                )}
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop: Metrix.VerticalSize(10)}}>
        <View
          style={{
            width: '70%',
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontFamily: Fonts['Lora-Bold'],
              fontSize: Metrix.FontMedium,
              color: Colors.TextDark,
            }}>
            {pollData.title}
          </Text>
          <Text
            style={{
              fontFamily: Fonts['Poppins-Regular'],
              fontSize: Metrix.customFontSize(13),
              color: Colors.TextLight,
            }}>
            {pollData.status == 'expired'
              ? 'This poll has been ended'
              : //: differenceTime(pollData.expiration_time)}
                `This poll will end in ${moment(local_date).fromNow(true)}`}
          </Text>
        </View>
        <View
          style={{
            width: '30%',
            flexDirection: 'row',
            alignItems: 'center',

            justifyContent: 'center',
          }}>
          <View
            style={{
              //width: Metrix.HorizontalSize(40),
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: Metrix.VerticalSize(18),
                width: Metrix.HorizontalSize(18),
              }}>
              <Image
                resizeMode="contain"
                style={{height: '100%'}}
                source={Images.MessageIcon}
              />
            </View>
            <Text
              style={{
                fontFamily: Fonts['Poppins-Regular'],
                fontSize: Metrix.FontExtraSmall,
                color: Colors.TextLight,
                marginLeft: Metrix.HorizontalSize(8),
              }}>
              {pollData.poll_comments > 100 ? '100+' : pollData.poll_comments}
            </Text>
          </View>
          <View
            style={{
              //width: Metrix.HorizontalSize(40),
              flexDirection: 'row',
              justifyContent: 'center',
              marginLeft: Metrix.HorizontalSize(18),
            }}>
            <View
              style={{
                height: Metrix.VerticalSize(18),
                width: Metrix.HorizontalSize(18),
              }}>
              <Image
                resizeMode="contain"
                style={{height: '100%'}}
                source={Images.PeopleIcon}
              />
            </View>
            <Text
              style={{
                fontFamily: Fonts['Poppins-Regular'],
                fontSize: Metrix.FontExtraSmall,
                color: Colors.TextLight,
                marginHorizontal: Metrix.HorizontalSize(8),
              }}>
              {pollData.poll_options_votes > 100
                ? '100+'
                : pollData.poll_options_votes}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

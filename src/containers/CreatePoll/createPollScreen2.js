import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { Metrix, Colors, Images, Fonts, NavigationService } from '../../config';
import { TTButton, BackHeader } from '../../components/';
import { AuthActions, HomeActions } from '../../store/actions';
import { connect } from 'react-redux';
import SwitchToggle from 'react-native-switch-toggle';
// import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { showToast } from '../../config/utills';
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet';

const CreatePollScreen2 = props => {
  var RBSheets;
  let min_date = new Date();
  const [selected, setSelected] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [expiryTime, setExpiryTime] = useState(new Date());
  const [finalTime, setFinalTime] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [isoDateTIme, setIosDateTime] = useState(new Date());
  const [created_at, setCreateAt] = useState('')
  const [expiration_time, setExpirationTime] = useState('')

  let timeAlert = "New expiry time should be greater than previous expiry time";

  useEffect(() => {
    props.getInterests();
    if (props?.route?.params?.from == 'EditPoll') {
      let myOldInterests = props?.route?.params?.selectedInterests?.map(
        p => p?.name,
      );
      setSelectedInterests(myOldInterests);
      let myOldInterestsIds = props?.route?.params?.selectedInterests?.map(
        p => p?.id,
      );

      setSelected(myOldInterestsIds);
      setCreateAt(props?.route?.params?.created_at)
      setExpirationTime(props?.route?.params?.expiration_time)

    }
  }, []);
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const select = params => {
    //console.log('inside select func', params);
    console.log(
      selectedInterests,
      ' selectedinterests inside select func',
      selected,
      'selected',
    );
    //return;
    let selectedState = [...selected];
    let intrestNames = [...selectedInterests];
    if (!intrestNames.includes(params.name)) {
      selectedState.push(params.id);
      intrestNames.push(params.name);
    } else {
      selectedState.splice(selectedState.indexOf(params.id), 1);
      intrestNames.splice(intrestNames.indexOf(params.name), 1);
    }
    setSelected(selectedState);
    setSelectedInterests(intrestNames);
  };

  const getPreviousTime = () => {
    let expire_date = expiration_time.split(" ")[0].split("-")
    let expire_time = expiration_time.split(" ")[1].split(":")
    let expiration_at = new Date(new Date().setFullYear(expire_date[0], expire_date[1] - 1, expire_date[2])).setHours(expire_time[0], expire_time[1], expire_time[2])
    let expiry_time = new Date(expiration_at).getTime()

    return {
      expiry_time
    }
  }

  const validateHoursUpdate = (hours) => {
    let expiry_time = getPreviousTime().expiry_time
    let set_hours = new Date().setHours(new Date().getHours() + hours)
    let new_hours = new Date(set_hours).getTime()
    console.log("hours", new_hours, expiry_time)

    if (new Date(new_hours) >= new Date(expiry_time)){
      return true
    }
  }

  const validateMinUpdate = (Mins) => {
    let expiry_time = getPreviousTime().expiry_time
    let set_mins = new Date().setMinutes(new Date().getMinutes() + Mins)
    let new_mins = new Date(set_mins).getTime()
    console.log("mins", new_mins, expiry_time)

    if (new Date(new_mins) >= new Date(expiry_time)){
      return true
    }

  }

  const editPoll = () => {
    let status = props?.route?.params?.status

    var now = moment();
    var future = now.clone();

    var new_final_time;
    if (finalTime == '30 min') {
      if (status != "expired" && !validateMinUpdate(30)) {
        Alert.alert("", timeAlert)
        return;
      }
      new_final_time = future.add(30, 'm').format('YYYY-MM-DD HH:mm:ss');
      console.log(
        new_final_time,
        'this is new final time',
        moment().format('YYYY-MM-DD HH:mm:ss'),
        'this is original time\n',
      );
    }
    else if (finalTime == '01 hour') {
      if (status != "expired" && !validateHoursUpdate(1)) {
        Alert.alert("", timeAlert)
        return;
      }
      new_final_time = moment()
        .add(1, 'h')
        .format('YYYY-MM-DD HH:mm:ss');
    }
    else if (finalTime == '24 hour') {
      if (status != "expired" && !validateHoursUpdate(24)) {
        Alert.alert("", timeAlert)
        return;
      }
      new_final_time = moment()
        .add(24, 'h')
        .format('YYYY-MM-DD HH:mm:ss');
    }
    else {
      new_final_time = finalTime;
    }

    let new_utc_time = moment
      .utc(moment(new_final_time))
      .format('YYYY-MM-DD HH:mm:ss');
    props.editPoll({
      expiration_time: new_utc_time,
      //interests_ids: JSON.stringify(props.route.params.interest_ids),
      interest_ids: selected,
      id: props?.route?.params?.pollId,
      //members: JSON.stringify([...new Set(selected.map(m => +m))]),
      members: [],
    });
  };
  const createPoll = () => {
    let status = props?.route?.params?.status;

    var new_final_time;
    if (finalTime) {
      if (selected.length > 0) {
        if (finalTime == '30 min') {
          new_final_time = moment()
            .add(30, 'minutes')
            .format('YYYY-MM-DD HH:mm:ss');
          console.log(
            new_final_time,
            'this is new final time',
            moment(),
            'this is original time\n',
          );
        } else if (finalTime == '01 hour') {
          new_final_time = moment()
            .add(1, 'hour')
            .format('YYYY-MM-DD HH:mm:ss');
        } else if (finalTime == '24 hour') {
          new_final_time = moment()
            .add(24, 'hours')
            .format('YYYY-MM-DD HH:mm:ss');
        } else {
          new_final_time = finalTime;
        }
        if (toggle) {
          let utc_time = moment
            .utc(moment(new_final_time))
            .format('YYYY-MM-DD HH:mm:ss');

          props.createPoll({
            //...props.route.params,
            title: props?.route?.params?.title,
            'options[]': props?.route?.params?.options?.map(img => img.url),
            expiration_time: utc_time,
            privacy_type: toggle ? 'Public' : 'Friends',
            interest_ids: JSON.stringify(selected),
            members: JSON.stringify([]),
          });
        }
        else {
          if (props?.route?.params?.from != 'CreatePoll') {
            if (finalTime == '30 min') {
              if (status != "expired" && !validateMinUpdate(30)) {
                Alert.alert("", timeAlert)
                return;
              }
            }
            else if (finalTime == '01 hour') {
              if (status != "expired" && !validateHoursUpdate(1)) {
                Alert.alert("", timeAlert)
                return;
              }
            }
            else if (finalTime == '24 hour') {
              if (status != "expired" && !validateHoursUpdate(24)) {
                Alert.alert("", timeAlert)
                return;
              }
            }
          }

          let new_utc_time = moment
            .utc(moment(new_final_time))
            .format('YYYY-MM-DD HH:mm:ss');
          NavigationService.navigate('InviteFriendScreen', {
            ...props?.route?.params,
            new_utc_time,
            interest_ids: selected,
            toggle,
            from: props?.route?.params?.from,
            members: props?.route?.params?.selectedMembers,
          });
        }
      } else {
        showToast('Please select atleast one interest');
      }
    } else {
      showToast('Please select expiry date');
    }
  };

  const dateChange = (event, date) => {
    if (event.type == 'set') {
      setShowDate(false);
      setExpiryDate(date);
      openTimePicker();
    } else {
      setShowDate(false);
    }
  };

  const timeChange = (event, time) => {
    if (event.type == 'set') {
      setShowTime(false);
      let now_time = moment().format('x');
      let newDate = moment(expiryDate).format('YYYY-MM-DD');
      let newTime = moment(time).format('HH:mm:ss');
      let final_time = `${newDate} ${newTime}`;
      let select_time = moment(final_time).format('x');
      if (select_time > now_time) {
        setExpiryTime(time);
        setFinalTime(final_time);
      } else {
        Alert.alert(
          '',
          `Expiration time should be greater than current time or previous expiry time`,
          [{ text: `Ok`, onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
      }
    } else {
      setShowTime(false);
    }
  };

  const openDatePicker = () => {
    setShowDate(true);
  };

  const openTimePicker = () => {
    setShowTime(true);
  };
  console.log(
    'from create poll screen 2',
    props?.route?.params,
    'intrests names ',
    selectedInterests,
    'int id',
    selected,
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.AppBackgroud,
      }}>
      <BackHeader
        text={
          props?.route?.params?.from == 'CreatePoll'
            ? 'Create new poll'
            : 'Edit your poll'
        }
      />
      <View
        style={{
          backgroundColor: Colors.AppBackgroud,
          width: Metrix.HorizontalSize(),
          paddingHorizontal: Metrix.HorizontalSize(17),
        }}>
        <Text
          style={{
            fontFamily: Fonts['Lora-Bold'],
            fontSize: Metrix.FontMedium,
            color: Colors.TextDark,
            marginTop: Metrix.VerticalSize(30),
          }}>
          Expiry Time
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: Metrix.VerticalSize(25),
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            onPress={() => setFinalTime('30 min')}
            style={[
              {
                height: Metrix.VerticalSize(40),
                borderRadius: Metrix.VerticalSize(30),
                marginLeft: Metrix.HorizontalSize(5),
                paddingHorizontal: Metrix.HorizontalSize(25),
                alignItems: 'center',
                justifyContent: 'center',
                ...Metrix.createShadow(),
              },
              finalTime == '30 min'
                ? {
                  backgroundColor: Colors.AlertRed,
                }
                : {
                  backgroundColor: Colors.White,
                },
            ]}>
            <Text
              style={[
                {
                  fontFamily: Fonts['Poppins-Medium'],
                  fontSize: Metrix.FontExtraSmall,
                },
                finalTime == '30 min'
                  ? {
                    color: Colors.White,
                  }
                  : {
                    color: Colors.TextDark,
                  },
              ]}>
              30 Min
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFinalTime('01 hour')}
            style={[
              {
                height: Metrix.VerticalSize(40),
                borderRadius: Metrix.VerticalSize(30),
                marginLeft: Metrix.HorizontalSize(5),
                paddingHorizontal: Metrix.HorizontalSize(25),
                alignItems: 'center',
                justifyContent: 'center',
                ...Metrix.createShadow(),
              },
              finalTime == '01 hour'
                ? {
                  backgroundColor: Colors.AlertRed,
                }
                : {
                  backgroundColor: Colors.White,
                },
            ]}>
            <Text
              style={[
                {
                  fontFamily: Fonts['Poppins-Medium'],
                  fontSize: Metrix.FontExtraSmall,
                },
                finalTime == '01 hour'
                  ? {
                    color: Colors.White,
                  }
                  : {
                    color: Colors.TextDark,
                  },
              ]}>
              01 Hour
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFinalTime('24 hour')}
            style={[
              {
                height: Metrix.VerticalSize(40),
                borderRadius: Metrix.VerticalSize(30),
                marginLeft: Metrix.HorizontalSize(5),
                paddingHorizontal: Metrix.HorizontalSize(25),
                alignItems: 'center',
                justifyContent: 'center',
                ...Metrix.createShadow(),
              },
              finalTime == '24 hour'
                ? {
                  backgroundColor: Colors.AlertRed,
                }
                : {
                  backgroundColor: Colors.White,
                },
            ]}>
            <Text
              style={[
                {
                  fontFamily: Fonts['Poppins-Medium'],
                  fontSize: Metrix.FontExtraSmall,
                },
                finalTime == '24 hour'
                  ? {
                    color: Colors.White,
                  }
                  : {
                    color: Colors.TextDark,
                  },
              ]}>
              24 Hours
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'ios') {
                // toggleModal()
                RBSheets.open();
              } else {
                openDatePicker();
              }
            }}
            style={{
              height: Metrix.VerticalSize(40),
              width: Metrix.VerticalSize(40),
              borderRadius: Metrix.VerticalSize(100),
              marginLeft: Metrix.HorizontalSize(5),
              backgroundColor: Colors.Primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: Metrix.HorizontalSize(18),
                height: Metrix.VerticalSize(18),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={Images.Calendar}
              />
            </View>
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={expiryDate}
              mode={'date'}
              // is24Hour={true}
              minimumDate={min_date}
              // maximumDate={new Data()}
              display="default"
              onChange={dateChange}
            />
          )}

          {showTime && (
            <DateTimePicker
              testID="dateTimePicker"
              value={expiryTime}
              mode={'time'}
              minimumDate={min_date}
              is24Hour={true}
              display="default"
              onChange={timeChange}
            />
          )}
        </View>
        <View
          style={{
            marginTop: Metrix.VerticalSize(35),
          }}>
          <Text
            style={{
              fontFamily: Fonts['Lora-Bold'],
              fontSize: Metrix.FontMedium,
              color: Colors.TextDark,
            }}>
            Add Interests
          </Text>
          <Text
            style={{
              fontFamily: Fonts['Poppins-Regular'],
              fontSize: Metrix.FontSmall,
              color: Colors.TextLight,
            }}>
            Choose as many as you want but keep them relevant
          </Text>
        </View>

        <ScrollView
          style={{
            height:
              props?.route?.params?.from == 'CreatePoll'
                ? Metrix.VerticalSize(300)
                : Metrix.VerticalSize(400),
          }}>
          <FlatList
            data={props.interests}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: Metrix.VerticalSize(25),
              marginBottom: Metrix.VerticalSize(25),
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              justifyContent: props.isLoading ? 'center' : 'flex-start',
              alignItems: props.isLoading ? 'center' : 'flex-start',
            }}
            //numColumns={3}
            ListEmptyComponent={() => {
              return (
                <View>
                  {props.isLoading ? (
                    <View
                      style={{
                        marginTop: Metrix.VerticalSize(150),
                      }}>
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
                      <Text>therer is no data</Text>
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
                    onPress={() => select({ id: item.id, name: item.name })}
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
                      selectedInterests?.includes(item.name)
                        ? { backgroundColor: item.color_code }
                        : { backgroundColor: Colors.DisabledGrey },
                    ]}>
                    <Text
                      style={[
                        {
                          fontFamily: Fonts['Poppins-Medium'],
                          fontSize: Metrix.FontExtraSmall,
                        },
                        selectedInterests?.includes(item.name)
                          ? { color: Colors.White }
                          : { color: Colors.TextDark },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={item => item.id}
          //numColumns={3}
          />
        </ScrollView>
        {props?.route?.params?.from == 'CreatePoll' ? (
          <View>
            <View>
              <Text
                style={{
                  fontFamily: Fonts['Lora-Bold'],
                  fontSize: Metrix.FontMedium,
                  color: Colors.TextDark,
                  marginTop: Metrix.VerticalSize(25),
                }}>
                Poll Privacy
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: Metrix.VerticalSize(25),
              }}>
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Medium'],
                  fontSize: Metrix.FontSmall,
                  color: Colors.TextDark,
                  marginTop: Metrix.VerticalSize(4),
                }}>
                Public poll
              </Text>
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
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: Metrix.VerticalSize(30),
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: Metrix.VerticalSize(100),
              }}>
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.FontSmall,
                  color: Colors.TextLight,
                }}>
                {toggle ? 'Step 02 of 02' : 'Step 02 of 03'}
              </Text>
              <TTButton
                isLoading={props.buttonLoading}
                text={toggle ? 'Create Poll' : 'Next Step'}
                onPress={() => {
                  createPoll();
                }}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              marginTop: Metrix.VerticalSize(69),
              marginBottom: Metrix.VerticalSize(20),
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}>
            <TTButton
              isLoading={props.buttonLoading}
              text={
                props?.route?.params?.privacyType == 'Friends'
                  ? 'Continue'
                  : 'Update'
              }
              onPress={() => {
                props?.route?.params?.privacyType == 'Friends'
                  ? createPoll()
                  : editPoll();
              }}
            />
          </View>
        )}
      </View>
      <RBSheet
        ref={ref => (RBSheets = ref)}
        height={Metrix.VerticalSize(320)}
        onClose={() => setIosDateTime(new Date())}
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
            height: Metrix.VerticalSize(320),
            paddingHorizontal: Metrix.HorizontalSize(17),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                RBSheets.close();
              }}>
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(15),
                  color: Colors.TextLight,
                  marginTop: Metrix.VerticalSize(15),
                  marginBottom: Metrix.VerticalSize(15),
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let now_time =
                  props?.route?.params?.from == 'CreatePoll' || props?.route?.params?.status == "expired" ?
                    moment().format('x')
                    :
                    moment(getPreviousTime().expiry_time).format('x')
                let that_time = moment(isoDateTIme).format('x');
                if (that_time >= now_time) {
                  let convert = moment(isoDateTIme).format(
                    'YYYY-MM-DD HH:mm:ss',
                  );
                  setFinalTime(convert);
                  RBSheets.close();
                } else {
                  RBSheets.close();
                  setTimeout(() => {
                    Alert.alert(
                      '',
                      'Expiration time should be greater than current time or previous expiry time',
                      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                      { cancelable: false },
                    );
                  }, Platform.OS == "ios" ? 400 : 0);
                }
              }}>
              <Text
                style={{
                  fontFamily: Fonts['Poppins-Regular'],
                  fontSize: Metrix.customFontSize(15),
                  color: Colors.Primary,
                  marginTop: Metrix.VerticalSize(15),
                  marginBottom: Metrix.VerticalSize(15),
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <DateTimePicker
              testID="dateTimePicker"
              value={isoDateTIme}
              mode={'datetime'}
              isoDateTIme={true}
              is24Hour={true}
              minimumDate={min_date}
              onChange={async (e, value) => {
                setIosDateTime(value);
              }}
            />
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.Auth.isLoading,
    interests: state.Auth.interests,
    buttonLoading: state.Home.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getInterests: payload => dispatch(AuthActions.getInterests(payload)),
    createPoll: payload => dispatch(HomeActions.createPoll(payload)),
    editPoll: payload => dispatch(HomeActions.editPoll(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePollScreen2);

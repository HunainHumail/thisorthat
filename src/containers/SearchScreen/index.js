import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  RefreshControl,
} from 'react-native';
import {Metrix, Colors, Images, NavigationService, Fonts} from '../../config';
import {
  Search,
  BSList,
  PeopleCard,
  PollCard,
  InterestModal,
  TTButton,
} from '../../components';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import SwitchToggle from 'react-native-switch-toggle';
import {AppActions, SearchActions, AuthActions} from '../../store/actions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CommonHeader from '../CommonHeader';
import moment from 'moment';

const SearchScreen = props => {
  let {interests} = props;
  interests = [{id: 0, name: 'All'}, ...interests];

  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefresh] = useState(false);
  const [searchText, searchHandler] = useState('');
  //alert(toggle)

  const handleSearch = e => {
    searchHandler(e);
    props.searchPolls({
      interest: selected,
      type: toggle ? 'people' : 'polls',
      search: e,
      //voted_poll: voted == null ? toggle : voted,
    });
  };
  //alert(toggle ? 'people' : 'polls')
  const toggleHandler = flag => {
    //alert(flag)
    setToggle(flag);
    props.searchPolls({
      interest: selected,
      type: flag ? 'people' : 'polls',
      search: searchText,
      //voted_poll: voted == null ? toggle : voted,
    });
    //getPolls(null, !toggle);
  };

  const pollDetail = id => {
    NavigationService.navigate('PollDetailScreen', {
      pollId: id,
    });
  };

  const logOut = () => {
    AsyncStorage.removeItem('user').then(user => {
      NavigationService.reset_0('IntroScreen');
    });
  };

  const getPolls = (id, type) => {
    //console.log(id, type, toggle, type ? 'people' : 'polls', searchText);
    props.searchPolls({
      interest: id == null ? selected : id,
      type: toggle ? 'people' : 'polls',
      search: searchText,
      //voted_poll: voted == null ? toggle : voted,
    });
  };
  useEffect(() => {
    props.searchPolls({
      interest: selected,
      type: toggle ? 'people' : 'polls',
      search: searchText,
      //voted_poll: toggle,
    }),
      props.getInterests();
    props.navigation.addListener('focus', () => {
      searchHandler('');
      setToggle(false);
      setSelected(0);
      setShowModal(false);
      props.searchPolls({
        interest: selected,
        type: toggle ? 'people' : 'polls',
        search: searchText,
        //voted_poll: toggle,
      });
    });
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const itemPress = id => {
    setSelected(id);
    props.searchPolls({
      interest: id,
      type: toggle ? 'people' : 'polls',
      search: searchText,
      //voted_poll: toggle,
    });
  };

  const _onRefresh = () => {
    setRefresh(true);
    props.searchPolls({
      interest: selected,
      type: toggle ? 'people' : 'polls',
      search: searchText,
      //voted_poll: toggle,
    });
    setRefresh(false);
  };
  //console.log('From search screen', props.navigation);
  return (
    <View style={{backgroundColor: Colors.AppBackgroud}}>
      <CommonHeader />
      <Search onChange={handleSearch} searchText={searchText} />
      <View
        style={{
          flexDirection: 'row',
          height: Metrix.VerticalSize(50),
          width: Metrix.HorizontalSize(227.67),
          borderRadius: Metrix.Radius,
          alignSelf: 'center',
          justifyContent: 'space-between',
          borderRadius: Metrix.VerticalSize(50 / 2),
          ...Metrix.createShadow(),
          marginTop: Metrix.VerticalSize(25),
          marginBottom: Metrix.VerticalSize(15),
        }}>
        <TouchableOpacity
          onPress={() => {
            toggleHandler(false);
          }}
          style={{
            height: Metrix.VerticalSize(50),
            width: !toggle
              ? Metrix.HorizontalSize(122)
              : Metrix.HorizontalSize(100),
            borderRadius: !toggle ? Metrix.VerticalSize(50 / 2) : 0,
            borderBottomLeftRadius: Metrix.VerticalSize(50 / 2),
            borderTopLeftRadius: Metrix.VerticalSize(50 / 2),
            backgroundColor: !toggle ? Colors.Primary : Colors.White,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: !toggle ? 0 : Metrix.HorizontalSize(15),
            //borderColor: Colors.AlertRed,
            //borderWidth: 1,
          }}>
          <Text
            style={{
              fontFamily: Fonts['Poppins-Medium'],
              color: !toggle ? Colors.White : Colors.TextDark,
              fontSize: Metrix.customFontSize(12),
            }}>
            Polls
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toggleHandler(true);
          }}
          style={{
            height: Metrix.VerticalSize(50),
            width: toggle
              ? Metrix.HorizontalSize(122)
              : Metrix.HorizontalSize(100),
            borderRadius: toggle ? Metrix.VerticalSize(50 / 2) : 0,
            borderBottomRightRadius: Metrix.VerticalSize(50 / 2),
            borderTopRightRadius: Metrix.VerticalSize(50 / 2),
            backgroundColor: toggle ? Colors.Primary : Colors.White,
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: toggle ? 0 : Metrix.HorizontalSize(15),
            // borderColor: Colors.AlertRed,
            // borderWidth: 1
          }}>
          <Text
            style={{
              fontFamily: Fonts['Poppins-Medium'],
              color: toggle ? Colors.White : Colors.TextDark,
              fontSize: Metrix.customFontSize(12),
            }}>
            People
          </Text>
        </TouchableOpacity>
      </View>
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
            marginBottom: Metrix.VerticalSize(400),
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
              renderItem={({item, index}) => {
                return (
                  <>
                    {index < 6 ? (
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
                            marginLeft: Metrix.HorizontalSize(5),
                          },
                        ]}>
                        <Text
                          style={[
                            {
                              fontFamily: Fonts['Poppins-Medium'],
                              fontSize: Metrix.FontExtraSmall,
                            },
                            item.id == selected
                              ? {color: Colors.White}
                              : {color: Colors.TextDark},
                          ]}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
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
          <View style={{marginTop: Metrix.VerticalSize(20)}}>
            {toggle ? (
              <FlatList
                data={props.polls}
                //data={[]}
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
                        backgroundColor: Colors.AppBackgroud,
                      }}>
                      <Image
                        style={{
                          height: Metrix.VerticalSize(72),
                          width: Metrix.HorizontalSize(72),
                          marginTop: Metrix.VerticalSize(140),
                        }}
                        resizeMode="contain"
                        source={Images.EmptySearch}
                      />
                      <Text
                        style={{
                          fontFamily: Fonts['Poppins-Regular'],
                          fontSize: Metrix.customFontSize(13),
                          color: Colors.TextLight,
                          marginTop: Metrix.VerticalSize(25),
                          textAlign: 'center',
                        }}>
                        No results found!{'\n'} Try different keywords or
                        categories.
                      </Text>
                    </View>
                  );
                }}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={
                        index == props.polls.length - 1
                          ? {marginBottom: Metrix.VerticalSize(400)}
                          : {marginBottom: Metrix.VerticalSize(0)}
                      }>
                      <PeopleCard
                        isFriendRequest={false}
                        name={item.full_name}
                        count={item.polls}
                        userImage={item.profile_image}
                        onPress={() =>
                          NavigationService.navigate('OtherUserProfile', {
                            id: item.user_id,
                          })
                        }
                      />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <FlatList
                //data={[]}
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
                        backgroundColor: Colors.AppBackgroud,
                      }}>
                      <Image
                        style={{
                          height: Metrix.VerticalSize(72),
                          width: Metrix.HorizontalSize(72),
                          marginTop: Metrix.VerticalSize(140),
                        }}
                        resizeMode="contain"
                        source={Images.EmptySearch}
                      />
                      <Text
                        style={{
                          fontFamily: Fonts['Poppins-Regular'],
                          fontSize: Metrix.customFontSize(13),
                          color: Colors.TextLight,
                          marginTop: Metrix.VerticalSize(25),
                          textAlign: 'center',
                        }}>
                        No results found!{'\n'} Try different keywords or
                        categories.
                      </Text>
                    </View>
                  );
                }}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={
                        index == props.polls.length - 1
                          ? {marginBottom: Metrix.VerticalSize(400)}
                          : {marginBottom: Metrix.VerticalSize(0)}
                      }>
                      <PollCard
                        pollData={item}
                        onPress={() => pollDetail(item.poll_id)}
                      />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => {
  console.log(state.Search.polls, 'from map state of search screen');

  return {
    user: state.Auth.user,
    interests: state.Auth.interests,
    isLoading: state.Search.isLoading,
    interestLoading: state.Auth.isLoading,
    polls: state.Search.polls,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateTabStack: payload => dispatch(AppActions.updateTabStack(payload)),
    searchPolls: payload => dispatch(SearchActions.searchPolls(payload)),
    getInterests: payload => dispatch(AuthActions.getInterests(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchScreen);

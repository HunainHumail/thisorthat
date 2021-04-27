import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Metrix, Colors, Fonts} from '../../config';
import {showToast} from '../../config/utills';
import {TTButton, BackHeader} from '../../components/';
import {AuthActions} from '../../store/actions';
import {connect} from 'react-redux';

const SignupScreen2 = props => {
  const {isLoading, buttonLoading, interests} = props;
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    props.getInterests();
  }, []);

  const select = params => {
    // console.log('params', params);
    let selectedState = [...selected];
    if (selectedState.indexOf(params.name) == -1) {
      selectedState.push(params.name);
    } else {
      selectedState.splice(selectedState.indexOf(params.name), 1);
    }
    setSelected(selectedState);
  };

  const updateInterests = () => {
    //console.log('propsss', props);
    const {user_data} = props.route.params;
    //console.log('user datata', user_data);
    if (selected.length >= 4) {
      props.updateInterests({
        user_id: user_data.user_id,
        interests: selected,
        user_data: {...user_data, user_interests: selected},
      });
    } else {
      showToast('Please select atleast 4 categories');
    }
  };

  return (
    <>
      <BackHeader text={'Create new account'} />
      <View
        style={{
          backgroundColor: Colors.AppBackgroud,
          width: Metrix.HorizontalSize(),
        }}>
        <View
          style={{
            paddingHorizontal: Metrix.HorizontalSize(17),
          }}>
          <View
            style={{
              marginTop: Metrix.VerticalSize(45),
              paddingLeft: Metrix.HorizontalSize(5),
            }}>
            <Text
              style={{
                fontFamily: Fonts['Lora-Bold'],
                fontSize: Metrix.FontMedium,
                color: Colors.TextDark,
              }}>
              Almost there,{'\n'}Which polls would you like to{'\n'}vote on?
              (Choose at least 4)
            </Text>
          </View>
          <ScrollView
            style={{
              height: Metrix.VerticalSize(530),
            }}>
            <FlatList
              data={interests}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: Metrix.VerticalSize(25),
                marginBottom: Metrix.VerticalSize(25),
                flexDirection: 'row',
                flex: 1,
                flexWrap: 'wrap',
              }}
              ListEmptyComponent={() => {
                return (
                  <View>
                    {isLoading ? (
                      <View style={{marginTop: Metrix.VerticalSize(200)}}>
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
              renderItem={({item, index}) => {
                return (
                  <View>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => select({id: item.id, name: item.name})}
                      style={[
                        {
                          height: Metrix.VerticalSize(40),
                          borderRadius: Metrix.VerticalSize(25),
                          marginLeft: Metrix.HorizontalSize(5),
                          marginTop: Metrix.VerticalSize(20),
                          paddingHorizontal: Metrix.HorizontalSize(25),
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                        selected.indexOf(item.name) != -1
                          ? {backgroundColor: item.color_code}
                          : {backgroundColor: Colors.DisabledGrey},
                      ]}>
                      <Text
                        style={[
                          {
                            fontFamily: Fonts['Poppins-Medium'],
                            fontSize: Metrix.FontExtraSmall,
                          },
                          selected.indexOf(item.name) != -1
                            ? {color: Colors.White}
                            : {color: Colors.TagFontColor},
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
          <View
            style={{
              alignItems: 'center',
              marginTop: Metrix.VerticalSize(25),
              marginBottom: Metrix.VerticalSize(45),
            }}>
            <TTButton
              isLoading={buttonLoading}
              text={'Continue'}
              onPress={() => updateInterests()}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.Auth.isLoading,
    interests: state.Auth.interests,
    buttonLoading: state.Auth.buttonLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getInterests: payload => dispatch(AuthActions.getInterests(payload)),
    updateInterests: payload => dispatch(AuthActions.updateInterests(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupScreen2);

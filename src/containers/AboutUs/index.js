import React from 'react';
import {View, Text, Share, Button} from 'react-native';
import {Metrix, Colors, Fonts} from '../../config';
import {BackHeader} from '../../components';
import {connect} from 'react-redux';
const AboutUs = props => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.AppBackgroud,
      }}>
      <BackHeader text="About the Developers" />
      <Text
        style={{
          width: Metrix.HorizontalSize(341),
          alignSelf: 'center',
          marginTop: Metrix.VerticalSize(47),
          textAlign: 'left',
          fontFamily: Fonts['Poppins-Regular'],
          fontSize: Metrix.customFontSize(13),
          color: Colors.TextLight,
        }}>
        Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh
        mollis. Nulla porta risus id neque tempor, in efficitur justo imperdiet.
        Etiam a ex at ante tincidunt imperdiet. Nunc congue ex vel nisl viverra,
        sit amet aliquet lectus ullamcorper. Praesent luctus lacus non lorem
        elementum, eu tristique sapien suscipit. Sed bibendum, ipsum nec viverra
        malesuada, erat nisi sodales purus, eget hendrerit dui ligula eu enim.
        Ut non est nisi. Pellentesque tristique pretium dolor eu commodo. Proin
        iaculis nibh vitae lectus mollis bibendum. Quisque varius eget urna sit
        amet luctus. Suspendisse potenti. Curabitur ac placerat est, sit amet
        sodales risus. Pellentesque viverra dui auctor, ullamcorper turpis
        pharetra, facilisis quam.
      </Text>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutUs);

import React from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { Metrix, Colors } from '../../config';


export const ImagePickerModal = ({ visible, onRequestClose, onPressCamera, onPressGallery }) => {
  return (

    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={true}>
      <TouchableOpacity
        activeOpacity={0.1}
        onPress={onRequestClose}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}>
        <View style={{ backgroundColor: Colors.White, paddingHorizontal: Metrix.HorizontalSize(20), ...Metrix.createShadow(), }}>
          <TouchableOpacity
            onPress={() => {
              onRequestClose()
              setTimeout(() => { onPressCamera() }, Platform.OS == "ios" ? 400 : 0)
            }}
            style={{
              paddingVertical: Metrix.VerticalSize(20),
              paddingHorizontal: Metrix.HorizontalSize(10),
              borderBottomColor: Colors.DisabledGrey,
              borderBottomWidth: 1
            }}
          >
            <Text style={{ textAlign: "center", fontSize: Metrix.FontRegular }}>Take Photo from your camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onRequestClose()
              setTimeout(() => { onPressGallery() }, Platform.OS == "ios" ? 400 : 0)
            }}
            style={{ paddingVertical: Metrix.VerticalSize(20), paddingHorizontal: Metrix.HorizontalSize(10) }}
          >
            <Text style={{ textAlign: "center", fontSize: Metrix.FontRegular }}>Choose Photo from Library</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}
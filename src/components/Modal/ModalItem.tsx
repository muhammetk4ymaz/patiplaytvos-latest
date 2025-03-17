import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scaledPixels} from '../../helpers/scaledPixels';

type Props = {
  isFocused: boolean;
  children: React.ReactNode;
  height?: number;
};

const {width} = Dimensions.get('window');

const ModalItem = (props: Props) => {
  return (
    <View
      style={{
        height: props.height,
        width: width * 0.35 - scaledPixels(40),
        backgroundColor: props.isFocused ? 'white' : '#212121',
        borderRadius: scaledPixels(16),
        padding: scaledPixels(24),
        justifyContent: 'space-between',
      }}>
      {props.children}
    </View>
  );
};

export default ModalItem;

const styles = StyleSheet.create({});

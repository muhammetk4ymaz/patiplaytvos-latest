import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scaledPixels} from '../helpers/scaledPixels';

const CircleAvatar = ({source, size}: {source?: string; size: number}) => {
  return (
    <View
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
      }}>
      <Image
        source={{
          uri:
            source && source !== ''
              ? source
              : 'https://www.w3schools.com/w3images/avatar2.png',
        }}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: scaledPixels(35),
        }}
      />
    </View>
  );
};

export default CircleAvatar;

const styles = StyleSheet.create({});

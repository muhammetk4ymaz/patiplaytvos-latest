import React from 'react';
import {
  Image,
  ImageSourcePropType,
  RegisteredStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  width: number;
  style?: ViewStyle | RegisteredStyle<StyleSheet.AbsoluteFillStyle>;
  url?: string;
  children?: React.ReactNode;
  source?: ImageSourcePropType;
};

const VerticalPoster = (props: Props) => {
  const height = (props.width * 3000) / 2000;

  const borderRadius =
    Math.sqrt(props.width * props.width + height * height) / 12;

  return (
    <View
      style={[
        props.style,
        {
          width: props.width,
          aspectRatio: 2 / 3,
          borderRadius: borderRadius,
          overflow: 'hidden',
        },
      ]}>
      <Image
        source={{
          uri: props.url,
        }}
        style={[StyleSheet.absoluteFillObject]}
      />
      {props.children}
    </View>
  );
};

export default React.memo(VerticalPoster);

const styles = StyleSheet.create({});

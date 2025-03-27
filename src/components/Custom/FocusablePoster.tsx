import React from 'react';
import {
  Animated,
  Image,
  RegisteredStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {scaledPixels} from '../../helpers/scaledPixels';
import {useFocusAnimation} from '../../helpers/useFocusAnimation';

type Props = {
  width: number;
  style?: ViewStyle | RegisteredStyle<StyleSheet.AbsoluteFillStyle>;
  url?: string;
  children?: React.ReactNode;
  isFocused: boolean;
  aspectRatio: number;
};

const FocusablePoster = (props: Props) => {
  const height = props.width / props.aspectRatio;

  const borderRadius =
    Math.sqrt(props.width * props.width + height * height) / 12;

  const scaleAnimation = useFocusAnimation(props.isFocused);

  return (
    <Animated.View
      style={[
        scaleAnimation,
        {
          width: props.width,
          aspectRatio: props.aspectRatio,
          borderRadius: borderRadius,
          overflow: 'hidden',
          borderWidth: props.isFocused ? scaledPixels(3) : scaledPixels(3),
          borderColor: props.isFocused ? 'white' : 'white',
        },
      ]}>
      <Image
        source={{
          uri: props.url,
        }}
        style={[StyleSheet.absoluteFillObject]}
      />
      {props.children}
    </Animated.View>
  );
};

export default React.memo(FocusablePoster);

const styles = StyleSheet.create({});

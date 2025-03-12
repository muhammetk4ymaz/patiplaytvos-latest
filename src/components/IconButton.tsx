import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {forwardRef, ReactNode} from 'react';
import {useFocusAnimation} from '../helpers/useFocusAnimation';
import {SpatialNavigationFocusableView} from 'react-tv-space-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../theme/theme';
import {scaledPixels} from '../helpers/scaledPixels';

type Props = {
  onSelect?: () => void;
  icon: string;
  additionalOffset?: number;
  iconSize: number;
};

const ButtonContent = forwardRef<
  View,
  {icon: string; isFocused: boolean; iconSize: number}
>((props, ref) => {
  const {isFocused, icon} = props;
  const anim = useFocusAnimation(isFocused);
  return (
    <Animated.View style={anim}>
      <MaterialCommunityIcons
        name={icon}
        size={props.iconSize}
        color={
          isFocused
            ? theme.colors.button.focused
            : theme.colors.button.unfocused
        }
      />
    </Animated.View>
  );
});

const IconButton = (props: Props) => {
  return (
    <SpatialNavigationFocusableView
      onSelect={props.onSelect}
      additionalOffset={props.additionalOffset}>
      {({isFocused, isRootActive}) => (
        <ButtonContent
          icon={props.icon}
          isFocused={isFocused && isRootActive}
          iconSize={props.iconSize}
        />
      )}
    </SpatialNavigationFocusableView>
  );
};

export default IconButton;

const styles = StyleSheet.create({});

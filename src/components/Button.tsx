import {forwardRef} from 'react';
import {Animated, Pressable, Text, View} from 'react-native';
import {SpatialNavigationFocusableView} from 'react-tv-space-navigation';

import {useFocusAnimation} from '../helpers/useFocusAnimation';
import {theme} from '../theme/theme';
import {scaledPixels} from '../helpers/scaledPixels';
import CustomText from './CustomText';

type ButtonProps = {
  label: string;
  onSelect?: () => void;
  onFocus?: () => void;
  additionalOffset?: number;
};

const ButtonContent = forwardRef<View, {label: string; isFocused: boolean}>(
  (props, ref) => {
    const {isFocused, label} = props;
    const anim = useFocusAnimation(isFocused);
    return (
      <Animated.View
        style={[
          anim,
          {
            alignSelf: 'baseline',
            backgroundColor: isFocused
              ? theme.colors.button.focused
              : theme.colors.button.unfocused,
            padding: scaledPixels(16),
            borderRadius: scaledPixels(12),
            cursor: 'pointer',
          },
        ]}>
        <CustomText
          text={label}
          style={{
            fontSize: scaledPixels(18),
            color: isFocused
              ? theme.colors.button.focusedText
              : theme.colors.button.unfocusedText,
          }}
        />
      </Animated.View>
    );
  },
);

ButtonContent.displayName = 'ButtonContent';

export const Button = ({
  label,
  onSelect,
  additionalOffset,
  onFocus,
}: ButtonProps) => {
  return (
    <Pressable onPress={onSelect}>
      <SpatialNavigationFocusableView
        onFocus={onFocus}
        onSelect={onSelect}
        additionalOffset={additionalOffset}>
        {({isFocused, isRootActive}) => (
          <ButtonContent label={label} isFocused={isFocused && isRootActive} />
        )}
      </SpatialNavigationFocusableView>
    </Pressable>
  );
};

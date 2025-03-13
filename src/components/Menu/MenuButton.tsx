import {forwardRef} from 'react';
import {Animated, View} from 'react-native';
import {SpatialNavigationFocusableView} from 'react-tv-space-navigation';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusAnimation} from '../../helpers/useFocusAnimation';
import {scaledPixels} from '../../helpers/scaledPixels';

type ButtonProps = {
  icon: string;
  isMenuOpen: boolean;
  onSelect?: () => void;
};

const ButtonContent = forwardRef<
  View,
  {icon: string; isFocused: boolean; isMenuOpen: boolean}
>((props, ref) => {
  const {isFocused, icon, isMenuOpen} = props;
  const anim = useFocusAnimation(isFocused && isMenuOpen);
  return (
    <Animated.View
      style={[
        anim,
        {
          cursor: 'pointer',
          alignSelf: 'baseline',
          padding: scaledPixels(8),
          backgroundColor: isFocused && isMenuOpen ? '#FFFFFF' : '#111111',
          borderRadius: scaledPixels(12),
        },
      ]}>
      <MaterialCommunityIcons
        name="home"
        size={scaledPixels(24)}
        color={isFocused && isMenuOpen ? '#111111' : '#FFFFFF'}
      />
    </Animated.View>
  );
});

ButtonContent.displayName = 'ButtonContent';

export const MenuButton = ({icon, isMenuOpen, onSelect}: ButtonProps) => {
  return (
    <SpatialNavigationFocusableView
      onSelect={onSelect}
      viewProps={{isTVSelectable: true}}>
      {({isFocused}) => (
        <ButtonContent
          icon={icon}
          isFocused={isFocused}
          isMenuOpen={isMenuOpen}
        />
      )}
    </SpatialNavigationFocusableView>
  );
};

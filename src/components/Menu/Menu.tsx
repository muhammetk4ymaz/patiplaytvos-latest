import {Direction} from '@bam.tech/lrud';
import React, {Fragment, useCallback, useEffect} from 'react';
import {Animated, Dimensions, Text, useAnimatedValue, View} from 'react-native';
import {
  DefaultFocus,
  SpatialNavigationRoot,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {useMenuContext} from './MenuContext';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {MenuButton} from './MenuButton';
import {theme} from '../../theme/theme';
import {scaledPixels} from '../../helpers/scaledPixels';
import CustomText from '../CustomText';

const windowDimensions = Dimensions.get('window');
const MenuItem = ({
  label,
  icon,
  isMenuOpen,
  isActive,
  onSelect,
}: {
  label: string;
  icon: string;
  isMenuOpen: boolean;
  isActive: boolean;
  onSelect: () => void;
}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          marginRight: scaledPixels(6),
          width: scaledPixels(4),
          height: '80%',
          backgroundColor: isActive
            ? theme.colors.patiplay.primary
            : 'transparent',
          borderRadius: scaledPixels(4),
        }}></View>
      <MenuButton
        icon={icon}
        onSelect={() => onSelect()}
        isMenuOpen={isMenuOpen}
      />
      {isMenuOpen && (
        <CustomText
          text={label}
          weight="bold"
          style={{
            color: 'white',
            marginLeft: scaledPixels(16),
            fontSize: scaledPixels(24),
          }}
        />
      )}
    </View>
  );
};

const menuItems = [{label: 'Home', icon: 'home'}];

export const Menu = ({state, navigation}: BottomTabBarProps) => {
  const {isOpen: isMenuOpen, toggleMenu} = useMenuContext();

  const animatedWidth = useAnimatedValue(
    isMenuOpen ? theme.sizes.menu.open : theme.sizes.menu.closed,
  );

  const onDirectionHandledWithoutMovement = useCallback(
    (movement: Direction) => {
      if (movement === 'right') {
        toggleMenu(false);
      }
    },
    [toggleMenu],
  );

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: isMenuOpen ? theme.sizes.menu.open : theme.sizes.menu.closed,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedWidth, isMenuOpen]);

  return (
    <SpatialNavigationRoot
      isActive={isMenuOpen}
      onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}>
      <SpatialNavigationView direction="vertical">
        <Animated.View
          style={[
            {
              width: animatedWidth,
              position: 'absolute',
              left: 0,
              backgroundColor: theme.colors.tab.background,
              height: windowDimensions.height,
            },
          ]}></Animated.View>
        <View
          style={{
            position: 'absolute',
            left: 0,
            backgroundColor: 'transparent',
            width: isMenuOpen ? theme.sizes.menu.open : theme.sizes.menu.closed,
            height: windowDimensions.height,
            paddingLeft: scaledPixels(16),
            justifyContent: 'center',
          }}>
          <DefaultFocus>
            <View>
              {state.routes.map((route, index) => {
                return (
                  <Fragment key={route.key}>
                    <MenuItem
                      label={menuItems[index].label}
                      icon={menuItems[index].icon}
                      isMenuOpen={isMenuOpen}
                      isActive={state.index === index}
                      onSelect={() =>
                        navigation.navigate(route.name, route.params)
                      }
                    />
                  </Fragment>
                );
              })}
            </View>
          </DefaultFocus>
        </View>
      </SpatialNavigationView>
    </SpatialNavigationRoot>
  );
};

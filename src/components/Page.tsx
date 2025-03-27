import {Direction} from '@bam.tech/lrud';
import {useIsFocused} from '@react-navigation/native';
import {ReactNode, useCallback, useEffect, useRef} from 'react';
import {
  SpatialNavigationRoot,
  useLockSpatialNavigation,
} from 'react-tv-space-navigation';
import {useMenuContext} from './Menu/MenuContext';
import {Animated, Keyboard, View} from 'react-native';
import {GoBackConfiguration} from './GoBackConfiguration';
import {AnimatedView} from 'react-native-reanimated/lib/typescript/component/View';
import {useSharedValue} from 'react-native-reanimated';
import {theme} from '../theme/theme';

type Props = {children: ReactNode};

/**
 * Locks/unlocks the navigator when the native keyboard is shown/hidden.
 * Allows for the native focus to take over when the keyboard is open,
 * and to go back to our own system when the keyboard is closed.
 */
const SpatialNavigationKeyboardLocker = () => {
  const lockActions = useLockSpatialNavigation();
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      lockActions.lock();
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      lockActions.unlock();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [lockActions]);

  return null;
};

export const Page = ({children}: Props) => {
  const isFocused = useIsFocused();
  const {isOpen: isMenuOpen, toggleMenu} = useMenuContext();
  const paddingLeft = useRef(new Animated.Value(0)).current;

  const isActive = isFocused && !isMenuOpen;

  const onDirectionHandledWithoutMovement = useCallback(
    (movement: Direction) => {
      if (movement === 'left') {
        toggleMenu(true);
      }
    },
    [toggleMenu],
  );

  useEffect(() => {
    if (isMenuOpen) {
      Animated.timing(paddingLeft, {
        toValue: theme.sizes.menu.open,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(paddingLeft, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isMenuOpen]);

  return (
    <SpatialNavigationRoot
      isActive={isActive}
      onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}>
      <GoBackConfiguration />
      <SpatialNavigationKeyboardLocker />
      <Animated.View
        style={{width: '100%', height: '100%', paddingLeft: paddingLeft}}>
        {children}
      </Animated.View>
    </SpatialNavigationRoot>
  );
};

import React, {useEffect, useCallback} from 'react';
import RemoteControlManager from './RemoteControlManager';
import {SupportedKeys} from './SupportedKeys';
import {useNavigation} from '@react-navigation/native';
import {useMenuContext} from '../Menu/MenuContext';

export const GoBackConfiguration: React.FC = () => {
  const navigation = useNavigation();
  const {isOpen: isMenuOpen} = useMenuContext();

  const handleBackPress = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      if (isMenuOpen) {
        console.log('Menu is open during back navigation');
      }
    }
  }, [navigation, isMenuOpen]);

  useEffect(() => {
    const remoteControlListener = (pressedKey: SupportedKeys) => {
      if (pressedKey === SupportedKeys.Back) {
        console.log('Back key pressed');
        handleBackPress();
      }
    };

    RemoteControlManager.addKeydownListener(remoteControlListener);
    return () =>
      RemoteControlManager.removeKeydownListener(remoteControlListener);
  }, [handleBackPress]);

  return null;
};

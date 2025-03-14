import {useNavigation} from '@react-navigation/native';
import {SupportedKeys} from './remote-control/SupportedKeys';
import {useKey} from '../hooks/useKey';
import {useCallback, useEffect} from 'react';
import {BackHandler, useTVEventHandler} from 'react-native';

export const GoBackConfiguration = () => {
  const navigation = useNavigation();

  const goBackOnBackPress = useCallback(
    (pressedKey: SupportedKeys) => {
      if (!navigation.isFocused) {
        return false;
      }
      if (pressedKey !== SupportedKeys.Back) return false;
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    },
    [navigation],
  );

  useTVEventHandler(evt => {
    // if (evt.eventType === 'backPress') {
    //   if (navigation.canGoBack()) {
    //     navigation.goBack();
    //   }
    // }
    console.log('evt bb', evt);
  });

  return <></>;
};

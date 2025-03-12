import {useEffect} from 'react';
import {BackHandler, TVEventControl, TVEventHandler} from 'react-native';

const useDisableBackButton = () => {
  useEffect(() => {
    const backAction = () => {
      console.log('hardwareBackPress');
      return true; // Geri tuşunu engellemek için true döndür
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    TVEventControl.disableTVMenuKey();

    return () => {
      backHandler.remove();
    };
  }, []);
};

export default useDisableBackButton;

import {useEffect} from 'react';
import {BackHandler} from 'react-native';

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

    return () => backHandler.remove();
  }, []);
};

export default useDisableBackButton;

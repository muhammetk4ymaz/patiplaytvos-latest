import {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';

import {
  DefaultFocus,
  SpatialNavigationNode,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {scaledPixels} from '../../helpers/scaledPixels';
import {theme} from '../../theme/theme';
import CustomText from '../CustomText';
import {textStyles} from '../../constants/TextStyle';

type Props = {
  children: React.ReactNode;
  title?: string;
};

const CustomDrawerModal = (props: Props) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: 35,
      duration: 1, // 1 saniye
      useNativeDriver: false,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1, // 1 saniye
      useNativeDriver: false,
    }).start();
  }, [widthAnim]);

  return (
    <SpatialNavigationNode>
      <Animated.View
        style={{
          opacity: opacityAnim,
          width: widthAnim.interpolate({
            inputRange: [0, 35],
            outputRange: ['0%', '35%'],
          }),
          height: '100%',
          backgroundColor: 'black',
        }}>
        <View
          style={{
            flex: 1,
            padding: scaledPixels(20),
            backgroundColor: 'black',
            gap: theme.sizes.view.rowGap,
          }}>
          {props.title && (
            <CustomText text={props.title} style={textStyles().modalTitle} />
          )}
          {props.children}
        </View>
      </Animated.View>
    </SpatialNavigationNode>
  );
};

export default CustomDrawerModal;

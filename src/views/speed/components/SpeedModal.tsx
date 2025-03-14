import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import {Animated, Dimensions, View} from 'react-native';

import {
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationScrollView,
  SpatialNavigationVirtualizedList,
} from 'react-tv-space-navigation';

import {scaledPixels} from '../../../helpers/scaledPixels';
import {theme} from '../../../theme/theme';
import CustomDrawerModal from '../../../components/CustomDrawerModal';

const SpeedModal = () => {
  return (
    <CustomDrawerModal>
      <></>
    </CustomDrawerModal>
  );
};

export default SpeedModal;

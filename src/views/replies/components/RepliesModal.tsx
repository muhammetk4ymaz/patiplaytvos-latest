import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import {Animated, Dimensions, View} from 'react-native';

import {
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationScrollView,
  SpatialNavigationVirtualizedList,
} from 'react-tv-space-navigation';
import {RootStackParamList} from '../../../../App';
import CustomText from '../../../components/CustomText';
import {textStyles} from '../../../constants/TextStyle';
import {scaledPixels} from '../../../helpers/scaledPixels';
import {theme} from '../../../theme/theme';
import CommentSection from '../../comments/components/CommentSection';
import CommentWithStats from '../../comments/components/CommentWithStats';
import CustomDrawerModal from '../../../components/CustomDrawerModal';

const RepliesModal = () => {
  return (
    <CustomDrawerModal>
      <Heading />
      <Replies />
    </CustomDrawerModal>
  );
};

export default RepliesModal;

const Heading = () => {
  return <CustomText text="Replies" style={textStyles().sectionTitle} />;
};

const Replies = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const arr = new Array(20).fill(1).map((_, i) => i * 2);

  return (
    <SpatialNavigationScrollView
      contentContainerStyle={{
        gap: theme.sizes.list.columnGap,
      }}>
      <CommentSection />

      <SpatialNavigationVirtualizedList
        style={{backgroundColor: 'black'}}
        orientation="vertical"
        data={arr}
        itemSize={
          Dimensions.get('window').height * 0.25 + theme.sizes.list.columnGap
        }
        renderItem={({item, index}) => (
          <SpatialNavigationFocusableView
            viewProps={{
              isTVSelectable: true,
            }}
            onSelect={() => {
              navigation.navigate('Comment');
            }}
            children={({isFocused}) => (
              <CommentWithStats isFocused={isFocused} index={index} />
            )}></SpatialNavigationFocusableView>
        )}
        onEndReached={() => {}}
      />
    </SpatialNavigationScrollView>
  );
};

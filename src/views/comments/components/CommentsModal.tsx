import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import {Animated, Dimensions, FlatList, View} from 'react-native';
import {
  DefaultFocus,
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationScrollView,
  SpatialNavigationView,
  SpatialNavigationVirtualizedList,
} from 'react-tv-space-navigation';
import {RootStackParamList} from '../../../../App';
import CustomText from '../../../components/CustomText';
import {textStyles} from '../../../constants/TextStyle';
import {scaledPixels} from '../../../helpers/scaledPixels';
import {theme} from '../../../theme/theme';
import Comment from './Comment';
import {Platform} from 'react-native';
import CommentWithStats from './CommentWithStats';
import CustomDrawerModal from '../../../components/CustomDrawerModal';

const CommentsModal = () => {
  return (
    <CustomDrawerModal>
      <Heading />
      <Comments />
    </CustomDrawerModal>
  );
};

export default CommentsModal;

const Heading = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        gap: Platform.select({ios: 12, android: 8}),
      }}>
      <CustomText text="Comments" style={textStyles().sectionTitle} />
      <CustomText
        text="42"
        style={[textStyles().sectionTitle, {fontWeight: '400'}]}
      />
    </View>
  );
};

const Comments = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const arr = new Array(20).fill(1).map((_, i) => i * 2);

  return (
    <SpatialNavigationScrollView>
      <SpatialNavigationVirtualizedList
        style={{backgroundColor: 'black'}}
        orientation="vertical"
        data={arr}
        itemSize={
          Dimensions.get('window').height * 0.25 + theme.sizes.list.columnGap
        }
        renderItem={({item, index}) => (
          <DefaultFocus>
            <SpatialNavigationFocusableView
              viewProps={{
                isTVSelectable: true,
              }}
              onSelect={() => {
                navigation.navigate('Replies');
              }}
              children={({isFocused}) => (
                <CommentWithStats isFocused={isFocused} index={index} />
              )}></SpatialNavigationFocusableView>
          </DefaultFocus>
        )}
        onEndReached={() => {}}
      />
    </SpatialNavigationScrollView>
  );
};

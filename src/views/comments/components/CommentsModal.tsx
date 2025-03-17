import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Dimensions, Platform, View} from 'react-native';
import {
  DefaultFocus,
  SpatialNavigationFocusableView,
  SpatialNavigationScrollView,
  SpatialNavigationVirtualizedList,
} from 'react-tv-space-navigation';
import {RootStackParamList} from '../../../../App';
import CustomText from '../../../components/CustomText';
import CustomDrawerModal from '../../../components/Modal/CustomDrawerModal';
import {textStyles} from '../../../constants/TextStyle';
import {theme} from '../../../theme/theme';
import CommentWithStats from './CommentWithStats';

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
      <CustomText text="Comments" style={textStyles().modalTitle} />
      <CustomText
        text="42"
        style={[textStyles().modalTitle, {fontWeight: '400'}]}
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
          Dimensions.get('window').height * 0.25 + theme.sizes.list.rowGap
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

import {useCallback, useEffect, useRef} from 'react';
import {useMovieContext} from '../MovieContext';
import {
  Animated,
  BackHandler,
  Dimensions,
  Platform,
  TVEventControl,
  View,
} from 'react-native';
import {
  DefaultFocus,
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationScrollView,
  SpatialNavigationView,
  SpatialNavigationVirtualizedList,
  SpatialNavigationVirtualizedListRef,
} from 'react-tv-space-navigation';
import {scaledPixels} from '../../../helpers/scaledPixels';
import {theme} from '../../../theme/theme';
import CustomText from '../../../components/CustomText';
import {Button} from '../../../components/Button';
import {useIsFocused} from '@react-navigation/native';
import {SupportedKeys} from '../../../components/remote-control/SupportedKeys';
import {useKey} from '../../../hooks/useKey';

const {width, height} = Dimensions.get('window');

const MovieCommentsSection = () => {
  const movieContext = useMovieContext();

  const widthAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const arr = new Array(20).fill(1).map((_, i) => i * 2);

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: 30,
      duration: 500, // 1 saniye
      useNativeDriver: false,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500, // 1 saniye
      useNativeDriver: false,
    }).start();
  }, [widthAnim]);

  const listRef = useRef<SpatialNavigationVirtualizedListRef | null>(null);

  const isScreenFocused = useIsFocused();

  const goToFirstItem = useCallback(
    (pressedKey: SupportedKeys) => {
      const isBackKey =
        pressedKey === SupportedKeys.Back || pressedKey === SupportedKeys.Menu;
      const isRowActive = isScreenFocused;
      const isFirstElementFocused =
        listRef.current?.currentlyFocusedItemIndex === 0;

      if (!isBackKey || !isRowActive || isFirstElementFocused) {
        return false;
      }

      listRef.current?.focus(0);
      return true;
    },
    [isScreenFocused, listRef],
  );

  useKey(
    Platform.select({
      ios: SupportedKeys.Menu,
      android: SupportedKeys.Back,
      default: SupportedKeys.Back,
    }),
    goToFirstItem,
  );

  return (
    <SpatialNavigationNode>
      <Animated.View
        style={{
          position: 'absolute',
          right: 0,
          opacity: opacityAnim,
          width: widthAnim.interpolate({
            inputRange: [0, 30],
            outputRange: ['0%', '30%'],
          }),
          height: '100%',
          backgroundColor: 'black',
        }}>
        <View
          style={{
            flex: 1,
            padding: scaledPixels(20),
            backgroundColor: 'black',
            gap: theme.sizes.view.gap,
          }}>
          <SpatialNavigationView
            direction="horizontal"
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'green',
            }}>
            <CustomText
              text="Comments"
              style={{
                color: 'black',
                fontSize: scaledPixels(20),
              }}
            />

            <Button
              label="Close"
              onSelect={() => {
                movieContext.setIsCommentVisible(false);
              }}
            />
          </SpatialNavigationView>

          <SpatialNavigationScrollView>
            <SpatialNavigationVirtualizedList
              // Do not forget to memoize data
              data={arr}
              itemSize={height / 4 + theme.sizes.list.rowGap}
              style={{
                width: '100%',
              }}
              renderItem={({item, index}) => (
                <SpatialNavigationFocusableView
                  onSelect={() => {
                    console.log('Comment index', index);
                  }}
                  style={{
                    flex: 1,
                  }}
                  children={({isFocused}) => (
                    <View
                      style={{
                        width: '100%',
                        height: height / 4,
                        backgroundColor: isFocused ? 'black' : 'gray',
                      }}>
                      <CustomText
                        text={'Comment ' + index.toString()}
                        style={{color: 'white', fontSize: scaledPixels(24)}}
                      />
                    </View>
                  )}></SpatialNavigationFocusableView>
              )}
              // Do not forget to memoize this if you provide it as a function
              onEndReached={() => {
                // Handle reaching the end of the list
                // you might trigger your backend pagination for example
              }}
              orientation="vertical"
            />
          </SpatialNavigationScrollView>
        </View>
      </Animated.View>
    </SpatialNavigationNode>
  );
};

export default MovieCommentsSection;

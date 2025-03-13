import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import {Animated, Dimensions, View} from 'react-native';
import {
  DefaultFocus,
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationScrollView,
  SpatialNavigationView,
  SpatialNavigationVirtualizedList,
} from 'react-tv-space-navigation';
import {Button} from '../../../components/Button';
import CustomText from '../../../components/CustomText';
import {scaledPixels} from '../../../helpers/scaledPixels';
import {theme} from '../../../theme/theme';

const {width, height} = Dimensions.get('window');

const MovieCommentsSection = () => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const arr = new Array(20).fill(1).map((_, i) => i * 2);

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: 30,
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
            }}>
            <CustomText
              text="Comments"
              style={{
                color: 'white',
                fontSize: scaledPixels(20),
              }}
            />

            <Button
              label="Close"
              onSelect={() => {
                navigation.goBack();
              }}
            />
          </SpatialNavigationView>

          <DefaultFocus>
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
          </DefaultFocus>
        </View>
      </Animated.View>
    </SpatialNavigationNode>
  );
};

export default MovieCommentsSection;

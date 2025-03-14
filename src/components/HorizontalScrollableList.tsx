import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useRef} from 'react';
import {Animated, Image, Platform, Pressable, View} from 'react-native';
import {
  DefaultFocus,
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationVirtualizedList,
  SpatialNavigationVirtualizedListRef,
} from 'react-tv-space-navigation';
import {RootStackParamList} from '../../App';
import {scaledPixels} from '../helpers/scaledPixels';
import {useFocusAnimation} from '../helpers/useFocusAnimation';
import {useKey} from '../hooks/useKey';
import {theme} from '../theme/theme';
import {calculateGridItemWidth} from '../utils/calculateGridItemWidth';
import CustomText from './CustomText';
import {SupportedKeys} from './remote-control/SupportedKeys';
import {textStyles} from '../constants/TextStyle';

type Props = {
  listTitle: string;
  imagePaths: string[];
  aspectRatio: number;
  viewableItems: number;
  isActive?: boolean;
  parentRef?: React.MutableRefObject<SpatialNavigationVirtualizedListRef | null>;
};

const HorizontalScrollableList = (props: Props) => {
  return (
    <SpatialNavigationNode>
      {({isActive}) => (
        <CustomList
          {...props}
          isActive={isActive}
          parentRef={props.parentRef}
        />
      )}
    </SpatialNavigationNode>
  );
};

export default HorizontalScrollableList;

const CustomList = React.forwardRef<View, Props>(
  (
    {listTitle, imagePaths, aspectRatio, parentRef, viewableItems, isActive},
    ref,
  ) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const listRef = useRef<SpatialNavigationVirtualizedListRef | null>(null);
    const isScreenFocused = useIsFocused();

    const goToFirstItem = useCallback(
      (pressedKey: SupportedKeys) => {
        const isBackKey =
          pressedKey === SupportedKeys.Back ||
          pressedKey === SupportedKeys.Menu;
        const isRowActive = isActive && isScreenFocused;
        const isFirstElementFocused =
          listRef.current?.currentlyFocusedItemIndex === 0;

        if (!isBackKey || !isRowActive || isFirstElementFocused) {
          return false;
        }

        listRef.current?.focus(0);
        return true;
      },
      [isActive, isScreenFocused, listRef],
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
      <View
        ref={ref}
        style={{
          height:
            ((calculateGridItemWidth(viewableItems) + scaledPixels(6)) * 1) /
              aspectRatio +
            scaledPixels(71),
        }}>
        <CustomText
          text={listTitle}
          style={[
            textStyles().listTitle,
            {
              marginVertical: theme.sizes.view.gap,
              marginLeft: theme.sizes.view.horizontalPadding,
            },
          ]}
        />

        <DefaultFocus>
          <SpatialNavigationVirtualizedList
            ref={elementRef => {
              if (parentRef) parentRef.current = elementRef;
              listRef.current = elementRef;
            }}
            orientation="horizontal"
            style={{
              paddingHorizontal: theme.sizes.view.horizontalPadding,
            }}
            data={imagePaths}
            itemSize={
              calculateGridItemWidth(viewableItems) + theme.sizes.list.columnGap
            }
            renderItem={({index}) => {
              return (
                <SpatialNavigationFocusableView
                  viewProps={{
                    isTVSelectable: true,
                  }}
                  onSelect={() => {
                    navigation.navigate('Movie');
                  }}
                  children={({isFocused}) => {
                    const scaleAnimation = useFocusAnimation(isFocused);
                    return (
                      <View style={{flexDirection: 'row'}}>
                        <Animated.View
                          style={[
                            scaleAnimation,
                            {
                              width: calculateGridItemWidth(viewableItems),
                              aspectRatio: aspectRatio,
                            },
                          ]}>
                          <Image
                            source={{uri: imagePaths[index]}}
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: scaledPixels(16),
                              borderWidth: scaledPixels(3),
                              borderColor: isFocused ? 'white' : 'transparent',
                            }}
                          />
                        </Animated.View>
                        <View style={{width: theme.sizes.view.gap}} />
                      </View>
                    );
                  }}
                />
              );
            }}
          />
        </DefaultFocus>
      </View>
    );
  },
);

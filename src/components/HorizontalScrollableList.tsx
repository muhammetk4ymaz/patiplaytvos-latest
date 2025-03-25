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
import FocusablePoster from './Custom/FocusablePoster';

type Props = {
  listTitle?: string;
  listTitleComponent?: React.ReactNode;
  listTitleHeight?: number;
  imagePaths: string[];
  aspectRatio: number;
  viewableItems: number;
  isActive?: boolean;
  additionalOffset?: number;
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
    {
      listTitle,
      imagePaths,
      aspectRatio,
      parentRef,
      viewableItems,
      isActive,
      listTitleComponent,
      listTitleHeight,
      additionalOffset,
    },
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
            (listTitle ? scaledPixels(73) : 0) +
            (listTitleComponent ? listTitleHeight! : 0),
        }}>
        {listTitle ? (
          <CustomText
            text={listTitle}
            style={[
              textStyles().listTitle,
              {
                marginVertical: theme.sizes.view.rowGap,
                marginLeft: theme.sizes.view.horizontalPadding,
              },
            ]}
          />
        ) : (
          listTitleComponent
        )}

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
                  additionalOffset={additionalOffset}
                  onSelect={() => {
                    navigation.navigate('Title');
                  }}
                  children={({isFocused}) => {
                    return (
                      <View style={{flexDirection: 'row'}}>
                        <FocusablePoster
                          url={imagePaths[index]}
                          width={calculateGridItemWidth(viewableItems)}
                          aspectRatio={aspectRatio}
                          isFocused={isFocused}
                        />
                        <View style={{width: theme.sizes.view.rowGap}} />
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

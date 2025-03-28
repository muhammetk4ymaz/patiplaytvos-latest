import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useRef} from 'react';
import {Platform, View} from 'react-native';
import {
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationVirtualizedList,
  SpatialNavigationVirtualizedListRef,
} from 'react-tv-space-navigation';
import {RootStackParamList} from '../../App';
import {textStyles} from '../constants/TextStyle';
import {useKey} from '../hooks/useKey';
import {theme} from '../theme/theme';
import {calculateGridItemWidth} from '../utils/calculateGridItemWidth';
import FocusablePoster from './Custom/FocusablePoster';
import CustomText from './CustomText';
import {SupportedKeys} from './remote-control/SupportedKeys';

type Props = {
  listTitle?: string;
  listTitleComponent?: React.ReactNode;
  imagePaths: string[];
  aspectRatio: number;
  viewableItems: number;
  isActive?: boolean;
  additionalOffset?: number;
  parentRef?: React.MutableRefObject<SpatialNavigationVirtualizedListRef | null>;
  posterChildren?: React.ReactElement | ((props: any) => React.ReactElement);
  children?:
    | React.ReactElement
    | ((isFocused: boolean, index: number) => React.ReactElement);
  childrenHeight?: number;
};

const HorizontalScrollableList = (props: Props) => {
  return (
    <SpatialNavigationNode>
      {({isActive}) => (
        <CustomList
          {...props}
          isActive={isActive}
          childrenHeight={props.childrenHeight || 0}
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
      additionalOffset,
      posterChildren,
      children,
      childrenHeight,
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
        style={{
          rowGap: theme.sizes.list.rowGap,
        }}>
        {listTitle && (
          <CustomText
            text={listTitle}
            style={[
              textStyles(isActive).listTitle,
              {
                marginLeft: theme.sizes.view.horizontalPadding,
              },
            ]}
          />
        )}
        {listTitleComponent && listTitleComponent}

        <View
          style={{
            height:
              calculateGridItemWidth(viewableItems) / aspectRatio +
              childrenHeight!,
          }}>
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
                      <View
                        style={{
                          width: calculateGridItemWidth(viewableItems),
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <FocusablePoster
                            url={imagePaths[index]}
                            width={calculateGridItemWidth(viewableItems)}
                            aspectRatio={aspectRatio}
                            isFocused={isFocused}
                            children={
                              typeof posterChildren === 'function'
                                ? posterChildren({index, isFocused})
                                : posterChildren
                            }
                          />
                          <View style={{width: theme.sizes.list.columnGap}} />
                        </View>
                        {typeof children === 'function'
                          ? children(isFocused, index)
                          : children}
                      </View>
                    );
                  }}
                />
              );
            }}
          />
        </View>
      </View>
    );
  },
);

import {Animated, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {useFocusAnimation} from '../helpers/useFocusAnimation';
import {scaledPixels} from '../helpers/scaledPixels';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';

type Props = {
  children: React.ReactNode;
};

const MovieScreenModal = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SpatialNavigationView
      direction="horizontal"
      style={{width: '100%', height: '100%'}}>
      <SpatialNavigationNode>
        <SpatialNavigationFocusableView
          viewProps={{isTVSelectable: true}}
          onSelect={() => {
            navigation.goBack();
          }}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}
          children={({isFocused}) => {
            const scaleAnimation = useFocusAnimation(isFocused);
            return (
              <Animated.View
                style={[
                  {
                    width: '100%',
                    height: '100%',
                    borderRadius: scaledPixels(16),
                    borderWidth: 2,
                    borderColor: isFocused ? 'white' : 'transparent',
                  },
                ]}></Animated.View>
            );
          }}></SpatialNavigationFocusableView>
      </SpatialNavigationNode>

      {props.children}
    </SpatialNavigationView>
  );
};

export default MovieScreenModal;

const styles = StyleSheet.create({});

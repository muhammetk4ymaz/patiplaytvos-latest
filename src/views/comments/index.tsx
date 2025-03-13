import {Animated, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  DefaultFocus,
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {Page} from '../../components/Page';
import MovieCommentsSection from '../movie/components/MovieCommentsSection';
import {useFocusAnimation} from '../../helpers/useFocusAnimation';
import {scaledPixels} from '../../helpers/scaledPixels';
import {useNavigation} from '@react-navigation/native';

const CommentsView = () => {
  const navigation = useNavigation();
  return (
    <Page>
      <SpatialNavigationView
        direction="horizontal"
        style={{width: '100%', height: '100%'}}>
        <SpatialNavigationNode>
          <SpatialNavigationFocusableView
            onSelect={() => {
              navigation.goBack();
            }}
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              padding: scaledPixels(100),
            }}
            children={({isFocused}) => {
              const scaleAnimation = useFocusAnimation(isFocused);
              return (
                <Animated.View
                  style={[
                    scaleAnimation,
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
        <MovieCommentsSection />
      </SpatialNavigationView>
    </Page>
  );
};

export default CommentsView;

const styles = StyleSheet.create({});

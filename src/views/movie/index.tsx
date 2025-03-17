import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {VideoRef} from 'react-native-video';
import {
  SpatialNavigationRoot,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {setIsModalVisible} from '../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import MovieControls from './components/MovieControls';
import MoviePlayer from './components/MoviePlayer';
import PlayerIcon from './components/PlayerIcon';

type Props = {};

const MovieView = (props: Props) => {
  const dispatch = useAppDispatch();
  const videoRef = React.useRef<VideoRef>(null);
  const widthAnim = useRef(new Animated.Value(100)).current;
  const focused = useIsFocused();

  useFocusEffect(() => {
    Animated.timing(widthAnim, {
      toValue: 100,
      duration: 100,
      useNativeDriver: false,
    }).start();

    dispatch(setIsModalVisible(false));

    return () => {
      Animated.timing(widthAnim, {
        toValue: 65,
        duration: 100,
        useNativeDriver: false,
      }).start();
      dispatch(setIsModalVisible(true));
    };
  });

  return (
    <SpatialNavigationRoot isActive={focused}>
      <SpatialNavigationView direction={'vertical'} style={{flex: 1}}>
        <Animated.View
          style={{
            position: 'absolute',
            width: widthAnim.interpolate({
              inputRange: [65, 100],
              outputRange: ['65%', '100%'],
            }),
            height: '100%',
          }}>
          <MoviePlayer videoRef={videoRef} />

          <PlayerIcon />

          <MovieControls videoRef={videoRef} />
        </Animated.View>
      </SpatialNavigationView>
    </SpatialNavigationRoot>
  );
};

export default MovieView;

const styles = StyleSheet.create({});

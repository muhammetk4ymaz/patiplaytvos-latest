import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {
  SpatialNavigationRoot,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {MovieProvider, useMovieContext} from './MovieContext';
import MovieCommentsSection from './components/MovieCommentsSection';
import MovieControls from './components/MovieControls';
import PlayerIcon from './components/PlayerIcon';

const {height, width} = Dimensions.get('window');

type Props = {};

const MovieViewWithProvider = () => {
  // usePreventRemove(true, ({data}) => {
  //   if (Platform.OS === 'web') {
  //     // Alert is not supported on web, so we can use confirm
  //   } else {
  //     // Prompt the user before leaving the screen
  //   }
  // });
  return (
    <MovieProvider>
      <MovieView />
    </MovieProvider>
  );
};

const MovieView = (props: Props) => {
  const movieContext = useMovieContext();
  const videoRef = React.useRef<VideoRef>(null);

  const widthAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: movieContext.isCommentVisible ? 70 : 100,
      duration: 500, // 1 saniye
      useNativeDriver: false,
    }).start();
  }, [movieContext.isCommentVisible]);

  return (
    <SpatialNavigationRoot>
      <SpatialNavigationView direction={'vertical'} style={{flex: 1}}>
        <Animated.View
          style={{
            position: movieContext.isCommentVisible ? 'relative' : 'absolute',
            width: widthAnim.interpolate({
              inputRange: [70, 100],
              outputRange: ['70%', '100%'],
            }),
            height: '100%',
          }}>
          <Video
            ref={videoRef}
            source={require('../../../assets/CivilWar.mp4')}
            // source={{
            //   uri: 'https://cdn.media.ccc.de/congress/2019/h264-sd/36c3-10496-deu-eng-spa-Das_Mauern_muss_weg_sd.mp4',
            // }}
            style={StyleSheet.absoluteFill}
            onProgress={movieContext.setProgress}
            paused={movieContext.isPaused}
            volume={0}
            repeat={true}
            onLoad={() => {
              console.log('video loaded');
              videoRef.current?.seek(0);
            }}
            onBuffer={e => {
              console.log('buffering', e);
              movieContext.setBuffering(e.isBuffering);
            }}
          />
          <PlayerIcon />
        </Animated.View>

        {movieContext.isCommentVisible && <MovieCommentsSection />}

        {!movieContext.isCommentVisible && (
          <MovieControls videoRef={videoRef} />
        )}
      </SpatialNavigationView>
    </SpatialNavigationRoot>
  );
};

export default MovieViewWithProvider;

const styles = StyleSheet.create({});

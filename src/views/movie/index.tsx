import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Animated, BackHandler, Dimensions, StyleSheet} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {
  SpatialNavigationRoot,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {scaledPixels} from '../../helpers/scaledPixels';
import {MovieProvider, useMovieContext} from './MovieContext';
import MovieControls from './components/MovieControls';
import PlayerIcon from './components/PlayerIcon';
import {GoBackConfiguration} from '../../components/GoBackConfiguration';

const {height, width} = Dimensions.get('window');

type Props = {};

const MovieViewWithProvider = () => {
  // useEffect(() => {
  //   const event = BackHandler.addEventListener('hardwareBackPress', () => {
  //     return true;
  //   });

  //   return () => {
  //     event.remove();
  //   };
  // }, []);

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

  const focused = useIsFocused();

  useFocusEffect(() => {
    Animated.timing(widthAnim, {
      toValue: 100,
      duration: 1, // 1 saniye
      useNativeDriver: false,
    }).start();

    movieContext.setIsCommentVisible(false);

    return () => {
      Animated.timing(widthAnim, {
        toValue: 70,
        duration: 1, // 1 saniye
        useNativeDriver: false,
      }).start();
      movieContext.setIsCommentVisible(true);
    };
  });

  return (
    <SpatialNavigationRoot isActive={focused}>
      <SpatialNavigationView direction={'vertical'} style={{flex: 1}}>
        <Animated.View
          style={{
            position: 'absolute',
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
            style={[
              StyleSheet.absoluteFill,
              {
                margin: movieContext.isCommentVisible ? scaledPixels(100) : 0,
              },
            ]}
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
          {!movieContext.isCommentVisible && (
            <MovieControls videoRef={videoRef} />
          )}
        </Animated.View>

        {/* {movieContext.isCommentVisible && <MovieCommentsSection />} */}
      </SpatialNavigationView>
    </SpatialNavigationRoot>
  );
};

export default MovieViewWithProvider;

const styles = StyleSheet.create({});

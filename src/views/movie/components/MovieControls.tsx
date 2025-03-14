import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Animated,
  Dimensions,
  HWEvent,
  StyleSheet,
  Text,
  TVEventHandler,
  View,
} from 'react-native';
import {Slider} from 'react-native-awesome-slider';
import {Easing, useSharedValue, withTiming} from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {VideoRef} from 'react-native-video';
import {
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {RootStackParamList} from '../../../../App';
import {Button} from '../../../components/Button';
import CustomText from '../../../components/CustomText';
import RemoteControlManager from '../../../components/remote-control/RemoteControlManager';
import {SupportedKeys} from '../../../components/remote-control/SupportedKeys';
import {scaledPixels} from '../../../helpers/scaledPixels';
import {theme} from '../../../theme/theme';
import {useMovieContext} from '../MovieContext';

type Props = {
  videoRef: React.RefObject<VideoRef>;
};

const MovieControls = (props: Props) => {
  const movieContext = useMovieContext();
  const controlsVisible = movieContext.controlsVisible;
  return (
    <SpatialNavigationView
      direction="vertical"
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: controlsVisible ? 'rgba(0,0,0,0.5)' : 'transparent',
      }}>
      <Animated.View
        style={{
          display: controlsVisible ? 'flex' : 'none',
          paddingHorizontal: theme.sizes.view.horizontalPadding,
          paddingBottom: scaledPixels(48),
        }}>
        <SpatialNavigationView
          direction="vertical"
          style={{
            gap: scaledPixels(24),
            alignItems: 'center',
          }}>
          <ProgressSlider videoRef={props.videoRef} />
          <MovieTimeInfo />
          <MovieButtons />
        </SpatialNavigationView>
      </Animated.View>
    </SpatialNavigationView>
  );
};

export default MovieControls;

const styles = StyleSheet.create({});

const formatTime = (durationSeconds: number) => {
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);
  const seconds = Math.floor(durationSeconds % 60);

  const formattedHours = hours > 0 ? `${hours}:` : '';
  const formattedMinutes = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
};

const MovieTimeInfo = () => {
  const movieContext = useMovieContext();
  return (
    !movieContext.isOnlyProgressVisible && (
      <SpatialNavigationNode>
        <SpatialNavigationView
          direction="horizontal"
          style={{
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <CustomText
            text={formatTime(movieContext.progress.currentTime)}
            style={{
              color: 'darkgray',
              fontSize: RFValue(6),
            }}
          />
          <CustomText
            text={formatTime(movieContext.progress.seekableDuration)}
            style={{
              color: 'darkgray',
              fontSize: RFValue(6),
            }}
          />
        </SpatialNavigationView>
      </SpatialNavigationNode>
    )
  );
};

const MovieButtons = () => {
  const movieContext = useMovieContext();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    !movieContext.isOnlyProgressVisible && (
      <SpatialNavigationNode>
        <SpatialNavigationView direction="horizontal" style={{gap: 24}}>
          <Button
            label="Comments"
            onSelect={() => {
              console.log('Comment');
              navigation.navigate('Comments');
              movieContext.setIsModalVisible(true);
            }}
          />
          <Button
            label="Episodes"
            onSelect={() => {
              console.log('Episodes');
            }}
          />
          <Button
            label="Speed"
            onSelect={() => {
              navigation.navigate('Speed');
              movieContext.setIsModalVisible(true);
            }}
          />
          <Button label="Enjoy Now" onSelect={() => {}} />
        </SpatialNavigationView>
      </SpatialNavigationNode>
    )
  );
};

const ProgressSlider = (props: Props) => {
  const movieContext = useMovieContext();
  const forwardIntervalId = React.useRef<NodeJS.Timeout | null>(null);
  const backwardIntervalId = React.useRef<NodeJS.Timeout | null>(null);
  const sliderProgress = useSharedValue(movieContext.progress.currentTime);
  const min = useSharedValue(0);
  const max = useSharedValue(movieContext.progress.seekableDuration);
  const cache = useSharedValue(movieContext.progress.playableDuration);
  const currentProgress = movieContext.currentProgress;

  // Propstan gelen dataların değişimlerini takip eder
  React.useEffect(() => {
    sliderProgress.value = movieContext.progress.currentTime;
    cache.value = movieContext.progress.playableDuration;
    max.value = movieContext.progress.seekableDuration;
    movieContext.setCurrentProgress(movieContext.progress.currentTime);
  }, [
    movieContext.progress.currentTime,
    movieContext.progress.playableDuration,
    movieContext.progress.seekableDuration,
  ]);

  // İleri sarma işlemi
  const forwardProgress = (duration: number) => {
    movieContext.setIsPaused(true);
    movieContext.setIsOnlyProgressVisible(true);
    if (sliderProgress.value + duration > max.value) {
      sliderProgress.value = withTiming(max.value, {duration: 100});
      movieContext.setCurrentProgress(max.value);
      return;
    } else {
      movieContext.setCurrentProgress(sliderProgress.value + duration);
      sliderProgress.value = withTiming(
        sliderProgress.value + duration,
        {
          duration: 100,
          easing: Easing.out(Easing.ease),
        },
        finished => console.log(sliderProgress.value),
      );
    }
  };

  // Geri sarma işlemi
  const backwardProgress = (duration: number) => {
    movieContext.setIsPaused(true);
    movieContext.setIsOnlyProgressVisible(true);
    if (sliderProgress.value - duration < 0) {
      movieContext.setCurrentProgress(0);
      sliderProgress.value = withTiming(0, {duration: 100});
      return;
    } else {
      movieContext.setCurrentProgress(sliderProgress.value - duration);
      sliderProgress.value = withTiming(
        sliderProgress.value - duration,
        {duration: 100},
        finished => console.log(sliderProgress.value),
      );
    }
  };

  useEffect(() => {
    const remoteControlListener = (pressedKey: SupportedKeys) => {
      console.log('pressedKey', pressedKey);

      // İleri ve geri sarma işlemleri için kullanılacak süre
      const duration = 10;

      if (movieContext.controlsVisible && movieContext.progressFocused) {
        switch (pressedKey) {
          case SupportedKeys.Left:
            backwardProgress(duration);
            break;
          case SupportedKeys.Right:
            forwardProgress(duration);
            break;
          default:
            movieContext.setIsOnlyProgressVisible(false);
            break;
        }
      }

      if (!movieContext.controlsVisible) {
        movieContext.setControlsVisible(!movieContext.controlsVisible);
        console.log('Controls Visible', movieContext.controlsVisible);
      }
    };

    RemoteControlManager.addKeydownListener(remoteControlListener);

    return () => {
      RemoteControlManager.removeKeydownListener(remoteControlListener);
    };
  }, [movieContext.progressFocused, movieContext.controlsVisible]);

  const handleLongPressRight = () => {
    if (movieContext.controlsVisible) {
      movieContext.setIsPaused(true);
      movieContext.setIsOnlyProgressVisible(true);
      let counter = 0;
      forwardIntervalId.current = setInterval(() => {
        counter++;
        const newDurataion = counter * 1.5;
        console.log('newDurataion', newDurataion);
        forwardProgress(newDurataion);
      }, 100);
    }
  };

  const stopLongPressRight = () => {
    clearInterval(forwardIntervalId.current as NodeJS.Timeout);
  };

  const handleLongPressLeft = () => {
    if (movieContext.controlsVisible) {
      movieContext.setIsPaused(true);
      movieContext.setIsOnlyProgressVisible(true);
      let counter = 0;
      backwardIntervalId.current = setInterval(() => {
        counter++;
        const newDurataion = counter * 1.5;
        backwardProgress(newDurataion);
      }, 100);
    }
  };

  const stopLongPressLeft = () => {
    clearInterval(backwardIntervalId.current as NodeJS.Timeout);
  };

  React.useEffect(() => {
    TVEventHandler.addListener((keyPress: HWEvent) => {
      console.log('keyPress', keyPress);

      if (keyPress.eventType === 'longRight' && keyPress.eventKeyAction === 0) {
        handleLongPressRight();
      } else if (
        keyPress.eventType === 'longRight' &&
        keyPress.eventKeyAction === 1
      ) {
        stopLongPressRight();
      }
      if (keyPress.eventType === 'longLeft' && keyPress.eventKeyAction === 0) {
        handleLongPressLeft();
      } else if (
        keyPress.eventType === 'longLeft' &&
        keyPress.eventKeyAction === 1
      ) {
        stopLongPressLeft();
      }
    });
  }, [movieContext.controlsVisible]);

  const startProgressWidth =
    (currentProgress / movieContext.progress.seekableDuration) *
    (Dimensions.get('window').width - 48);

  const endProgressWidth =
    ((movieContext.progress.seekableDuration - currentProgress) /
      movieContext.progress.seekableDuration) *
    (Dimensions.get('window').width - 48);

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: scaledPixels(24),
      }}>
      <View
        style={{
          display:
            movieContext.isOnlyProgressVisible && startProgressWidth < 85
              ? 'flex'
              : 'none',
          position: 'absolute',
          width: 200,
          gap: 12,
          top: -170,
          left: 0,
        }}>
        <View
          style={{
            height: 100,
            width: 200,
            backgroundColor: 'red',
            borderRadius: 12,
          }}></View>
        <Text style={{color: 'white', textAlign: 'center'}}>
          {formatTime(currentProgress)}
        </Text>
      </View>
      <View
        style={{
          display:
            movieContext.isOnlyProgressVisible && endProgressWidth < 85
              ? 'flex'
              : 'none',
          position: 'absolute',
          width: 200,
          gap: 12,
          top: -170,
          right: 0,
        }}>
        <View
          style={{
            height: 100,
            width: 200,
            backgroundColor: 'red',
            borderRadius: 12,
          }}></View>
        <Text style={{color: 'white', textAlign: 'center'}}>
          {formatTime(currentProgress)}
        </Text>
      </View>
      <SpatialNavigationNode>
        <Slider
          progress={sliderProgress}
          minimumValue={min}
          maximumValue={max}
          cache={cache}
          sliderHeight={6}
          containerStyle={{
            borderRadius: 99,
          }}
          disableTrackFollow
          renderThumb={() => (
            <View>
              <Animated.View
                style={{
                  display: movieContext.isOnlyProgressVisible
                    ? startProgressWidth < 85 || endProgressWidth < 85
                      ? 'none'
                      : 'flex'
                    : 'none',
                  position: 'absolute',
                  width: 200,
                  gap: 12,
                  top: -160,
                  left: -85,
                }}>
                <View
                  style={{
                    height: 100,
                    width: 200,
                    backgroundColor: 'red',
                    borderRadius: 12,
                  }}></View>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  {formatTime(currentProgress)}
                </Text>
              </Animated.View>

              <SpatialNavigationFocusableView
                viewProps={{
                  isTVSelectable: true,
                }}
                style={{flex: 1}}
                onFocus={() => movieContext.setProgressFocused(true)}
                onBlur={() => movieContext.setProgressFocused(false)}
                onSelect={() => {
                  if (movieContext.isPaused) {
                    props.videoRef.current?.seek(sliderProgress.value);
                    movieContext.setIsOnlyProgressVisible(false);
                    movieContext.setIsPaused(false);
                  } else {
                    movieContext.setIsPaused(true);
                  }
                }}
                children={({isFocused}) => (
                  <MaterialCommunityIcons
                    name="circle"
                    size={24}
                    color={isFocused ? 'white' : 'transparent'}
                  />
                )}></SpatialNavigationFocusableView>
            </View>
          )}
          theme={{
            disableMinTrackTintColor: '#000',
            maximumTrackTintColor: '#fff',
            minimumTrackTintColor: theme.colors.patiplay.primary,
            cacheTrackTintColor: '#333',
            bubbleBackgroundColor: '#666',
            heartbeatColor: '#999',
          }}
        />
      </SpatialNavigationNode>
    </View>
  );
};

import React, {useEffect} from 'react';
import {
  Animated,
  Dimensions,
  HWEvent,
  Pressable,
  StyleSheet,
  Text,
  TVEventHandler,
  View,
} from 'react-native';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {VideoRef} from 'react-native-video';
import {
  DefaultFocus,
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {useMovieContext} from '../MovieContext';
import {SupportedKeys} from '../../../components/remote-control/SupportedKeys';
import RemoteControlManager from '../../../components/remote-control/RemoteControlManager';
import {useKey} from '../../../hooks/useKey';
import CustomText from '../../../components/CustomText';
import {scaledPixels} from '../../../helpers/scaledPixels';
import {Button} from '../../../components/Button';
import {theme} from '../../../theme/theme';

type Props = {
  videoRef: React.RefObject<VideoRef>;
};

const MovieControls = (props: Props) => {
  const movieContext = useMovieContext();
  const forwardIntervalId = React.useRef<NodeJS.Timeout | null>(null);
  const backwardIntervalId = React.useRef<NodeJS.Timeout | null>(null);
  const sliderProgress = useSharedValue(movieContext.progress.currentTime);
  const min = useSharedValue(0);
  const max = useSharedValue(movieContext.progress.seekableDuration);
  const cache = useSharedValue(movieContext.progress.playableDuration);
  const currentProgress = movieContext.currentProgress;

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

  const forwardProgress = (duration: number) => {
    if (!movieContext.isPaused) {
      movieContext.setIsPaused(true);
      movieContext.setIsOnlyProgressVisible(true);
    }

    if (sliderProgress.value + duration > max.value) {
      sliderProgress.value = withTiming(max.value, {duration: 100});
      movieContext.setCurrentProgress(max.value);
      return;
    }
    setTimeout(() => {
      movieContext.setCurrentProgress(sliderProgress.value + duration);
      sliderProgress.value = withTiming(
        sliderProgress.value + duration,
        {duration: 100},
        finished => console.log(sliderProgress.value),
      );
    }, 50);
  };

  const backwardProgress = (duration: number) => {
    if (!movieContext.isPaused) {
      movieContext.setIsPaused(true);
      movieContext.setIsOnlyProgressVisible(true);
    }
    if (sliderProgress.value - duration < 0) {
      movieContext.setCurrentProgress(0);
      sliderProgress.value = withTiming(0, {duration: 100});
      return;
    }
    setTimeout(() => {
      movieContext.setCurrentProgress(sliderProgress.value - duration);
      sliderProgress.value = withTiming(
        sliderProgress.value - duration,
        {duration: 100},
        finished => console.log(sliderProgress.value),
      );
    }, 50);
  };

  useEffect(() => {
    const remoteControlListener = (pressedKey: SupportedKeys) => {
      if (movieContext.controlsVisible && movieContext.progressFocused) {
        if (
          pressedKey !== SupportedKeys.Left &&
          pressedKey !== SupportedKeys.Right
        ) {
          movieContext.setIsOnlyProgressVisible(false);
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

  useKey(SupportedKeys.Left, () => {
    if (movieContext.progressFocused) {
      backwardProgress(10);
    }
    return true;
  });

  useKey(SupportedKeys.Right, () => {
    if (movieContext.progressFocused) {
      forwardProgress(10);
    }
    return true;
  });

  const handleLongPressRight = () => {
    movieContext.setIsPaused(true);
    movieContext.setIsOnlyProgressVisible(true);
    let counter = 0;
    forwardIntervalId.current = setInterval(() => {
      counter++;
      const newDurataion = counter * 1.5;
      forwardProgress(newDurataion);
    }, 100);
  };

  const stopLongPressRight = () => {
    clearInterval(forwardIntervalId.current as NodeJS.Timeout);
  };

  const handleLongPressLeft = () => {
    movieContext.setIsPaused(true);
    movieContext.setIsOnlyProgressVisible(true);
    let counter = 0;
    backwardIntervalId.current = setInterval(() => {
      counter++;
      const newDurataion = counter * 1.5;
      backwardProgress(newDurataion);
    }, 100);
  };

  const stopLongPressLeft = () => {
    clearInterval(backwardIntervalId.current as NodeJS.Timeout);
  };

  React.useEffect(() => {
    const handleKeyPress = (keyPress: HWEvent) => {
      // Uzun basmayı algılamak için keyPress.eventKeyAction kullanılır.
      // 0: Basıldı, 1: Bırakıldı
      if (movieContext.controlsVisible) {
        if (keyPress.eventKeyAction === 0) {
          switch (keyPress.eventType) {
            case 'longRight':
              handleLongPressRight();
              break;
            case 'longLeft':
              handleLongPressLeft();
              break;
            default:
              break;
          }
        } else if (keyPress.eventKeyAction === 1) {
          switch (keyPress.eventType) {
            case 'longRight':
              stopLongPressRight();
              break;
            case 'longLeft':
              stopLongPressLeft();
              break;
            default:
              break;
          }
        }
      }
    };

    TVEventHandler.addListener(handleKeyPress);
  }, [movieContext.controlsVisible]);

  return (
    <SpatialNavigationNode>
      <SpatialNavigationView
        direction="vertical"
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: movieContext.controlsVisible
            ? 'rgba(0,0,0,0.5)'
            : 'transparent',
        }}>
        <Animated.View
          style={{
            display: movieContext.controlsVisible ? 'flex' : 'none',
            paddingHorizontal: theme.sizes.view.horizontalPadding,
            paddingBottom: scaledPixels(48),
          }}>
          <SpatialNavigationView
            direction="vertical"
            style={{
              gap: scaledPixels(24),
              alignItems: 'center',
            }}>
            {/* {!isOnlyProgressVisible && <Button label="Enjoy Now" />} */}
            <SpatialNavigationView
              direction="horizontal"
              style={{
                gap: scaledPixels(24),
              }}>
              <View
                style={{
                  display:
                    movieContext.isOnlyProgressVisible &&
                    (currentProgress / movieContext.progress.seekableDuration) *
                      (Dimensions.get('window').width - 48) <
                      85
                      ? 'flex'
                      : 'none',
                  position: 'absolute',
                  width: 200,
                  gap: 12,
                  top: -172,
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
                    movieContext.isOnlyProgressVisible &&
                    ((movieContext.progress.seekableDuration -
                      currentProgress) /
                      movieContext.progress.seekableDuration) *
                      (Dimensions.get('window').width - 48) <
                      85
                      ? 'flex'
                      : 'none',
                  position: 'absolute',
                  width: 200,
                  gap: 12,
                  top: -172,
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
                <DefaultFocus>
                  <SpatialNavigationFocusableView
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
                    children={({isFocused}) => {
                      return (
                        <Slider
                          progress={sliderProgress}
                          minimumValue={min}
                          maximumValue={max}
                          cache={cache}
                          sliderHeight={isFocused ? 8 : 6}
                          containerStyle={{
                            borderRadius: 99,
                          }}
                          disableTrackFollow
                          renderThumb={() => (
                            <Pressable>
                              <View
                                style={{
                                  display:
                                    movieContext.isOnlyProgressVisible &&
                                    (currentProgress /
                                      movieContext.progress.seekableDuration) *
                                      (Dimensions.get('window').width - 48) >
                                      85 &&
                                    ((movieContext.progress.seekableDuration -
                                      currentProgress) /
                                      movieContext.progress.seekableDuration) *
                                      (Dimensions.get('window').width - 48) >
                                      85
                                      ? 'flex'
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
                              </View>

                              <MaterialCommunityIcons
                                name="circle"
                                size={24}
                                color={isFocused ? 'white' : 'transparent'}
                              />
                            </Pressable>
                          )}
                          theme={{
                            disableMinTrackTintColor: '#000',
                            maximumTrackTintColor: '#fff',
                            minimumTrackTintColor:
                              theme.colors.patiplay.primary,
                            cacheTrackTintColor: '#333',
                            bubbleBackgroundColor: '#666',
                            heartbeatColor: '#999',
                          }}
                        />
                      );
                    }}></SpatialNavigationFocusableView>
                </DefaultFocus>
              </SpatialNavigationNode>
            </SpatialNavigationView>
            <MovieTimeInfo />
            <MovieButtons />
          </SpatialNavigationView>
        </Animated.View>
      </SpatialNavigationView>
    </SpatialNavigationNode>
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
              fontSize: scaledPixels(18),
            }}
          />
          <CustomText
            text={formatTime(movieContext.progress.seekableDuration)}
            style={{
              color: 'darkgray',
              fontSize: scaledPixels(18),
            }}
          />
        </SpatialNavigationView>
      </SpatialNavigationNode>
    )
  );
};

const MovieButtons = () => {
  const movieContext = useMovieContext();
  return (
    !movieContext.isOnlyProgressVisible && (
      <SpatialNavigationNode>
        <SpatialNavigationView direction="horizontal" style={{gap: 24}}>
          <Button
            label="Comment"
            onSelect={() => {
              movieContext.setIsCommentVisible(true);
            }}
          />
          <Button label="Episodes" onSelect={() => {}} />
          <Button label="Subtitles" onSelect={() => {}} />
          <Button label="Enjoy Now" onSelect={() => {}} />
        </SpatialNavigationView>
      </SpatialNavigationNode>
    )
  );
};

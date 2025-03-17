import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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
import {
  setControlsVisible,
  setCurretProgress,
  setIsModalVisible,
  setOnlyProgressVisible,
  setPaused,
  setProgressFocused,
} from '../../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {theme} from '../../../theme/theme';

type Props = {
  videoRef: React.RefObject<VideoRef>;
};

const MovieControls = (props: Props) => {
  const controlsVisible = useAppSelector(
    state => state.videoplayer,
  ).controlsVisible;
  const isModalVisible = useAppSelector(
    state => state.videoplayer,
  ).isModalVisible;
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
          display: !isModalVisible
            ? controlsVisible
              ? 'flex'
              : 'none'
            : 'none',
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
  const isOnlyProgressVisible = useAppSelector(
    state => state.videoplayer,
  ).isOnlyProgressVisible;

  const progress = useAppSelector(state => state.videoplayer.progress);
  return (
    !isOnlyProgressVisible && (
      <SpatialNavigationNode>
        <SpatialNavigationView
          direction="horizontal"
          style={{
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <CustomText
            text={formatTime(progress.currentTime)}
            style={{
              color: 'darkgray',
              fontSize: RFValue(6),
            }}
          />
          <CustomText
            text={formatTime(progress.seekableDuration)}
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
  const isOnlyProgressVisible = useAppSelector(
    state => state.videoplayer,
  ).isOnlyProgressVisible;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const dispatch = useAppDispatch();

  return (
    !isOnlyProgressVisible && (
      <SpatialNavigationNode>
        <SpatialNavigationView
          direction="horizontal"
          style={{gap: theme.sizes.view.columnGap}}>
          <Button
            label="Speed"
            onSelect={() => {
              navigation.navigate('Speed');
              dispatch(setIsModalVisible(true));
            }}
          />
          <Button
            label="Subtitles & Voiceover"
            onSelect={() => {
              navigation.navigate('SubtitleAndAudio');
              dispatch(setPaused(true));
            }}
          />
          <Button
            label="Comments"
            onSelect={() => {
              console.log('Comment');
              navigation.navigate('Comments');
              dispatch(setIsModalVisible(true));
            }}
          />
          <Button
            label="Episodes"
            onSelect={() => {
              console.log('Episodes');
            }}
          />
        </SpatialNavigationView>
      </SpatialNavigationNode>
    )
  );
};

const ProgressSlider = (props: Props) => {
  const dispatch = useAppDispatch();
  const progress = useAppSelector(state => state.videoplayer.progress);
  const controlsVisible = useAppSelector(
    state => state.videoplayer.controlsVisible,
  );
  const progressFocused = useAppSelector(
    state => state.videoplayer.progressFocused,
  );
  const currentProgress = useAppSelector(
    state => state.videoplayer.currentProgress,
  );
  const isOnlyProgressVisible = useAppSelector(
    state => state.videoplayer.isOnlyProgressVisible,
  );
  const paused = useAppSelector(state => state.videoplayer.paused);

  const forwardIntervalId = React.useRef<NodeJS.Timeout | null>(null);
  const backwardIntervalId = React.useRef<NodeJS.Timeout | null>(null);
  const sliderProgress = useSharedValue(progress.currentTime);
  const min = useSharedValue(0);
  const max = useSharedValue(progress.seekableDuration);
  const cache = useSharedValue(progress.playableDuration);

  // Propstan gelen dataların değişimlerini takip eder
  React.useEffect(() => {
    sliderProgress.value = progress.currentTime;
    cache.value = progress.playableDuration;
    max.value = progress.seekableDuration;
    dispatch(setCurretProgress(progress.currentTime));
  }, [
    progress.currentTime,
    progress.playableDuration,
    progress.seekableDuration,
  ]);

  // İleri sarma işlemi
  const forwardProgress = (duration: number) => {
    dispatch(setPaused(true));
    dispatch(setOnlyProgressVisible(true));

    if (sliderProgress.value + duration > max.value) {
      sliderProgress.value = withTiming(max.value, {duration: 100});
      dispatch(setCurretProgress(max.value));
      return;
    } else {
      dispatch(setCurretProgress(sliderProgress.value + duration));
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
    dispatch(setPaused(true));
    dispatch(setOnlyProgressVisible(true));
    if (sliderProgress.value - duration < 0) {
      dispatch(setCurretProgress(0));
      sliderProgress.value = withTiming(0, {duration: 100});
      return;
    } else {
      dispatch(setCurretProgress(sliderProgress.value - duration));
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

      if (controlsVisible && progressFocused) {
        switch (pressedKey) {
          case SupportedKeys.Left:
            backwardProgress(duration);
            break;
          case SupportedKeys.Right:
            forwardProgress(duration);
            break;
          default:
            dispatch(setOnlyProgressVisible(false));
            break;
        }
      }

      if (!controlsVisible) {
        dispatch(setControlsVisible(!controlsVisible));
        console.log('Controls Visible', controlsVisible);
      }
    };

    RemoteControlManager.addKeydownListener(remoteControlListener);

    return () => {
      RemoteControlManager.removeKeydownListener(remoteControlListener);
    };
  }, [progressFocused, controlsVisible]);

  const handleLongPressRight = () => {
    if (controlsVisible) {
      dispatch(setPaused(true));
      dispatch(setOnlyProgressVisible(true));
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
    if (controlsVisible) {
      dispatch(setPaused(true));
      dispatch(setOnlyProgressVisible(true));
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
  }, [controlsVisible]);

  const startProgressWidth =
    (currentProgress / progress.seekableDuration) *
    (Dimensions.get('window').width - 48);

  const endProgressWidth =
    ((progress.seekableDuration - currentProgress) /
      progress.seekableDuration) *
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
            isOnlyProgressVisible && startProgressWidth < 85 ? 'flex' : 'none',
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
            isOnlyProgressVisible && endProgressWidth < 85 ? 'flex' : 'none',
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
                  display: isOnlyProgressVisible
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
                onFocus={() => dispatch(setProgressFocused(true))}
                onBlur={() => dispatch(setProgressFocused(false))}
                onSelect={() => {
                  if (paused) {
                    props.videoRef.current?.seek(sliderProgress.value);
                    dispatch(setOnlyProgressVisible(false));
                    dispatch(setPaused(false));
                  } else {
                    dispatch(setPaused(true));
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

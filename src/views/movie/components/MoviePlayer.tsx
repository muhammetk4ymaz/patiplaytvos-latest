import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Video, {VideoRef} from 'react-native-video';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  setBuffering,
  setProgress,
} from '../../../redux/features/videoplayer/videoplayerSlice';

type Props = {
  videoRef: React.RefObject<VideoRef>;
};

const MoviePlayer = (props: Props) => {
  const dispatch = useAppDispatch();
  const speed = useAppSelector(state => state.videoplayer).speed;
  const paused = useAppSelector(state => state.videoplayer).paused;
  return (
    <Video
      ref={props.videoRef}
      source={require('../../../../assets/CivilWar.mp4')}
      // source={{
      //   uri: 'https://cdn.media.ccc.de/congress/2019/h264-sd/36c3-10496-deu-eng-spa-Das_Mauern_muss_weg_sd.mp4',
      // }}
      style={[StyleSheet.absoluteFill]}
      onProgress={e => dispatch(setProgress(e))}
      paused={paused}
      volume={0}
      rate={speed}
      repeat={true}
      tvFocusable={true}
      onLoad={() => {
        console.log('video loaded');
        props.videoRef.current?.seek(0);
      }}
      onBuffer={e => {
        console.log('buffering', e);
        dispatch(setBuffering(e.isBuffering));
      }}
    />
  );
};

export default MoviePlayer;

const styles = StyleSheet.create({});

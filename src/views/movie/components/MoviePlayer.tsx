import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Video, {SelectedTrackType, VideoRef} from 'react-native-video';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  setAudioTrackList,
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
  const audioTrack = useAppSelector(state => state.videoplayer.audioTrack);
  return (
    <Video
      ref={props.videoRef}
      // source={require('../../../../assets/CivilWar.mp4')}
      source={{
        uri: 'https://cdn.media.ccc.de/congress/2019/h264-sd/36c3-10496-deu-eng-spa-Das_Mauern_muss_weg_sd.mp4',
      }}
      style={[StyleSheet.absoluteFill]}
      resizeMode="stretch"
      onProgress={e => dispatch(setProgress(e))}
      paused={paused}
      volume={1}
      rate={speed}
      repeat={true}
      tvFocusable={true}
      onLoad={data => {
        console.log('onLoad', data);

        if (data.audioTracks.length > 0) {
          dispatch(setAudioTrackList(data.audioTracks));
          // console.log('Audio tracks:', data.audioTracks);
        }

        // if (data.videoTracks.length > 0) {
        //   const heightsSet = new Set();
        //   const uniqueVideoTracks = data.videoTracks.filter(track => {
        //     if (!heightsSet.has(track.height)) {
        //       heightsSet.add(track.height);
        //       return true;
        //     }
        //     return false;
        //   });

        //   dispatch(setQualityList(uniqueVideoTracks));
        // }
        props.videoRef.current?.seek(0);
      }}
      onBuffer={e => {
        console.log('buffering', e);
        dispatch(setBuffering(e.isBuffering));
      }}
      selectedAudioTrack={{
        type: SelectedTrackType.INDEX,
        value: audioTrack,
      }}
    />
  );
};

export default MoviePlayer;

const styles = StyleSheet.create({});

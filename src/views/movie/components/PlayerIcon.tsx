import {ActivityIndicator, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppSelector} from '../../../redux/hooks';

const PlayerIcon = () => {
  const buffering = useAppSelector(state => state.videoplayer).buffering;
  const isModalVisible = useAppSelector(
    state => state.videoplayer,
  ).isModalVisible;
  const controlsVisible = useAppSelector(
    state => state.videoplayer,
  ).controlsVisible;
  const paused = useAppSelector(state => state.videoplayer).paused;

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {buffering ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        !isModalVisible &&
        controlsVisible &&
        (paused ? (
          <MaterialCommunityIcons
            name="play"
            size={RFValue(70)}
            color={'white'}
          />
        ) : (
          <MaterialCommunityIcons
            name="pause"
            size={RFValue(70)}
            color={'white'}
          />
        ))
      )}
    </View>
  );
};

export default PlayerIcon;

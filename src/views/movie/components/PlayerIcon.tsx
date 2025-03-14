import {ActivityIndicator, View} from 'react-native';
import {useMovieContext} from '../MovieContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scaledPixels} from '../../../helpers/scaledPixels';
import {RFValue} from 'react-native-responsive-fontsize';

const PlayerIcon = () => {
  const movieContext = useMovieContext();
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {movieContext.buffering ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        !movieContext.isModalVisible &&
        movieContext.controlsVisible &&
        (movieContext.isPaused ? (
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

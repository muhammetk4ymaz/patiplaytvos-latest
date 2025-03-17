import {useIsFocused, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SpatialNavigationRoot} from 'react-tv-space-navigation';
import MovieScreenModal from '../../components/MovieWithModal';
import SpeedModal from './components/SpeedModal';
import MovieWithModal from '../../components/MovieWithModal';

const SpeedView = () => {
  const isFocused = useIsFocused();
  return (
    <SpatialNavigationRoot isActive={isFocused}>
      <MovieWithModal children={<SpeedModal />} />
    </SpatialNavigationRoot>
  );
};

export default SpeedView;

const styles = StyleSheet.create({});

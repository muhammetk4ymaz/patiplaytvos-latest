import {useIsFocused, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SpatialNavigationRoot} from 'react-tv-space-navigation';
import MovieScreenModal from '../../components/MovieWithModal';
import RepliesModal from './components/RepliesModal';

const RepliesView = () => {
  const isFocused = useIsFocused();
  return (
    <SpatialNavigationRoot isActive={isFocused}>
      <MovieScreenModal children={<RepliesModal />} />
    </SpatialNavigationRoot>
  );
};

export default RepliesView;

const styles = StyleSheet.create({});

import {useIsFocused, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SpatialNavigationRoot} from 'react-tv-space-navigation';
import MovieScreenModal from '../../components/MovieWithModal';
import CommentsModal from './components/CommentsModal';

const CommentsView = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  return (
    <SpatialNavigationRoot isActive={isFocused}>
      <MovieScreenModal children={<CommentsModal />} />
    </SpatialNavigationRoot>
  );
};

export default CommentsView;

const styles = StyleSheet.create({});

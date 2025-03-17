import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {
  SpatialNavigationRoot,
  SpatialNavigationView,
} from 'react-tv-space-navigation';

import CustomDrawerModal from '../../components/Modal/CustomDrawerModal';
import MovieWithModal from '../../components/MovieWithModal';
import CommentSection from '../comments/components/CommentSection';

const CommentView = () => {
  const isFocused = useIsFocused();
  return (
    <SpatialNavigationRoot isActive={isFocused}>
      <SpatialNavigationView
        direction="horizontal"
        style={{width: '100%', height: '100%'}}>
        <MovieWithModal children={<CommentModal />} />
      </SpatialNavigationView>
    </SpatialNavigationRoot>
  );
};

export default CommentView;

const CommentModal = () => {
  return (
    <CustomDrawerModal title="Replies">
      <CommentSection />
    </CustomDrawerModal>
  );
};

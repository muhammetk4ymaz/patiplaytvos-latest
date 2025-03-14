import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {
  SpatialNavigationRoot,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import CustomDrawerModal from '../../components/CustomDrawerModal';
import CustomText from '../../components/CustomText';
import MovieScreenModal from '../../components/MovieWithModal';
import {textStyles} from '../../constants/TextStyle';
import CommentSection from '../comments/components/CommentSection';

const CommentView = () => {
  const isFocused = useIsFocused();
  return (
    <SpatialNavigationRoot isActive={isFocused}>
      <SpatialNavigationView
        direction="horizontal"
        style={{width: '100%', height: '100%'}}>
        <MovieScreenModal children={<CommentModal />} />
      </SpatialNavigationView>
    </SpatialNavigationRoot>
  );
};

export default CommentView;

const CommentModal = () => {
  return (
    <CustomDrawerModal>
      <Heading />
      <CommentSection />
    </CustomDrawerModal>
  );
};

const Heading = () => {
  return <CustomText text="Replies" style={textStyles().sectionTitle} />;
};
